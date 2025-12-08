// src/screens/GameScreen.tsx
import { useEffect, useMemo, useState } from "react";
import Board, { type PawnOnBoard } from "../components/Board";
import ColorDie3D from "../components/ColorDie3D";
import MissionCard from "../components/MissionCard";
import MonedasChile from "../components/MonedasChile";
import type {
  ColorKey,
  Mission,
  MissionDifficulty,
} from "../data/misiones";
import { getRandomMission } from "../data/misiones";
import TimerHUD from "../components/TimerHUD";
import Calculator from "../components/Calculator";
import EventModal from "../components/EventModal";

// === Tipos que ya manejas desde App/SetupScreen ===
export type PlayerSetup = {
  id: number;
  name: string;
  color: string;
  avatar: string;
};

// usamos el mismo tipo que en misiones.ts
type Difficulty = MissionDifficulty;

// El jugador en juego: conserva tus datos + progreso + dinero
type Player = PlayerSetup & {
  stars: number;
  // inventario simple por denominación (para el total basta con sumar)
  wallet: Record<number, number>;
  // si en algún momento restamos directamente, guardamos un total precalculado
  walletTotal?: number;
  // posición en el tablero (0..19, 20 casillas alrededor)
  position: number;
};

// Billetera inicial del enunciado (total $73.050)
const INITIAL_WALLET: Record<number, number> = {
  20000: 1,
  10000: 2,
  5000: 3,
  2000: 4,
  1000: 5,
  500: 6,
  100: 15, // 7 antiguas + 8 nuevas
  50: 9,
  10: 10,
};

// El recorrido del tablero (perímetro 6x6) tiene 20 casillas
const TRACK_LENGTH = 20;

// mismo orden de colores que usa el Board en el perímetro
const COLOR_ORDER: ColorKey[] = [
  "rojo",
  "amarillo",
  "verde",
  "azul",
  "morado",
  "naranjo",
];

// Colores del perímetro en orden de posición 0..19
const PERIMETER_COLORS: ColorKey[] = Array.from(
  { length: TRACK_LENGTH },
  (_, i) => COLOR_ORDER[i % COLOR_ORDER.length]
);

// cuántos pasos hay que avanzar desde `from` hasta la próxima casilla del color dado
function stepsToNextColor(from: number, color: ColorKey): number {
  for (let step = 1; step <= TRACK_LENGTH; step++) {
    const idx = (from + step) % TRACK_LENGTH;
    if (PERIMETER_COLORS[idx] === color) return step;
  }
  return 0;
}

function calcularTotal(wallet: Record<number, number>) {
  return Object.entries(wallet).reduce(
    (acc, [valor, cant]) => acc + Number(valor) * (cant as number),
    0
  );
}

function totalJugador(p: Player) {
  // si existe walletTotal, priorízalo (cuando descontamos directo)
  return p.walletTotal ?? calcularTotal(p.wallet);
}

// Evento especial cuando el jugador cae en una casilla Banco (color azul)
function aplicarEventoBanco(players: Player[], turn: number) {
  // clonamos el arreglo de jugadores
  const next = players.map((p) => ({ ...p }));

  const actual = next[turn];
  const saldoActual =
    actual.walletTotal !== undefined
      ? actual.walletTotal
      : calcularTotal(actual.wallet);

  // Elegimos un evento al azar (0, 1 o 2)
  const evento = Math.floor(Math.random() * 3);
  let mensaje = "";

  switch (evento) {
    case 0: {
      // Comisión del banco
      const monto = 1000;
      actual.walletTotal = Math.max(0, saldoActual - monto);
      mensaje = `${actual.name} paga una comisión bancaria de $${monto.toLocaleString(
        "es-CL"
      )}.`;
      break;
    }

    case 1: {
      // Error administrativo a favor del jugador
      const monto = 1500;
      actual.walletTotal = saldoActual + monto;
      mensaje = `Hubo un error administrativo y el banco abona $${monto.toLocaleString(
        "es-CL"
      )} a ${actual.name}.`;
      break;
    }

    case 2: {
      // Cargo por mantención
      const monto = 500;
      actual.walletTotal = Math.max(0, saldoActual - monto);
      mensaje = `${actual.name} paga un cargo por mantención de $${monto.toLocaleString(
        "es-CL"
      )}.`;
      break;
    }
  }

  return { updatedPlayers: next, message: mensaje };
}


// 👉 Helper: misión según color y dificultad
function getMissionFor(color: ColorKey, difficulty: Difficulty): Mission {
  // usamos la función de misiones que filtra por nivel
  return getRandomMission(color, difficulty);
}

export default function GameScreen({
  initialPlayers,
  durationMin,
  difficulty,
}: {
  initialPlayers: PlayerSetup[];
  durationMin: number;
  difficulty: Difficulty;
}) {
  // jugadores con progreso + billetera
  const [players, setPlayers] = useState<Player[]>(
    initialPlayers.map((p) => ({
      ...p,
      stars: 0,
      wallet: { ...INITIAL_WALLET },
      position: 0,
    }))
  );

  // turno
  const [turn, setTurn] = useState(0);

  // misión/estado de juego
  const [active, setActive] = useState<ColorKey | null>(null);
  const [mission, setMission] = useState<Mission | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);

  // fichas en movimiento
  const [isMoving, setIsMoving] = useState(false);

  // calculadora
  const [showCalc, setShowCalc] = useState(false);
  const handleOpenCalc = () => setShowCalc(true);

  // temporizador (minutos -> segundos)
  const [timeLeft, setTimeLeft] = useState(durationMin * 60);
  const timeOver = timeLeft <= 0;

  const [eventModal, setEventModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    setTimeLeft(durationMin * 60);
  }, [durationMin]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const mm = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const ss = (timeLeft % 60).toString().padStart(2, "0");

  // cuando la ficha termina de moverse y "cae" en el color
    // 🔹 cuando la ficha termina de moverse y "cae" en el color
  function handleLandedOn(color: ColorKey) {
    //CASILLA BANCO
    if (color === "azul") {
      const { updatedPlayers, message } = aplicarEventoBanco(players, turn);
      setPlayers(updatedPlayers);

      // Usamos el modal bonito en vez de alert()
      setEventModal({
        title: "Casilla Banco 🏦",
        message:
          message +
          "\n\nLuego de pasar por el banco, termina tu turno.",
      });

      // Limpiamos estado de misión y pasamos el turno
      setActive(null);
      setMission(null);
      setShowBuilder(false);
      setTurn((prev) => (prev + 1) % players.length);
      return;
    }

    // Para otros colores: generamos misión según dificultad
    setMission(getMissionFor(color, difficulty));
  }

  // animar movimiento casilla por casilla
  function animateMovement(steps: number, color: ColorKey) {
    if (steps <= 0) {
      handleLandedOn(color);
      return;
    }

    setIsMoving(true);
    let moved = 0;
    const currentTurn = turn;

    const interval = setInterval(() => {
      moved++;

      setPlayers((prev) =>
        prev.map((p, i) => {
          if (i !== currentTurn) return p;
          const newPos = (p.position + 1 + TRACK_LENGTH) % TRACK_LENGTH;
          return { ...p, position: newPos };
        })
      );

      if (moved >= steps) {
        clearInterval(interval);
        setIsMoving(false);
        handleLandedOn(color);
      }
    }, 220); // velocidad del movimiento (ms)
  }

  // dado
  function handleRoll(color: ColorKey) {
    if (timeOver || isMoving) return;

    setActive(color);
    setShowBuilder(false);

    const currentPos = players[turn].position ?? 0;
    const steps = stepsToNextColor(currentPos, color);

    if (steps === 0) {
      // ya está sobre una casilla de ese color
      handleLandedOn(color);
    } else {
      animateMovement(steps, color);
    }
  }

  // tarjeta misión
  function aceptarMision() {
    if (timeOver) return;
    setShowBuilder(true);
  }

  function otraMision() {
    if (timeOver) return;
    if (active) setMission(getMissionFor(active, difficulty));
    setShowBuilder(false);
  }

  // Confirmación desde MonedasChile
  function handleBuilderConfirm(totalEntregado: number) {
    if (!mission) return;

    const next = [...players];
    const pj = { ...next[turn] };

    if (totalEntregado === mission.price) {
      const saldoActual = totalJugador(pj);

      // 💡 Si la misión tiene definido un gasto real (spent), usamos eso.
      // Si no, usamos price como antes para no romper las otras misiones.
      const montoADescontar = mission.spent ?? mission.price;

      const nuevoSaldo = Math.max(0, saldoActual - montoADescontar);
      pj.walletTotal = nuevoSaldo;
      pj.stars += 1;

      // Modal bonito
      setEventModal({
        title: "¡Misión correcta!",
        message:
          `¡Bien hecho, ${pj.name}!\n\n` +
          `Entregaste $${totalEntregado.toLocaleString("es-CL")}` +
          ` y se descontaron $${montoADescontar.toLocaleString(
            "es-CL"
          )} de tu billetera.`,
      });
    } else {
      // Modal misión incorrecta
      setEventModal({
        title: "Misión incorrecta",
        message:
          `Entregaste $${totalEntregado.toLocaleString(
            "es-CL"
          )}, pero la misión pedía $${mission.price.toLocaleString(
            "es-CL"
          )}.\n\n` +
          `No se descuenta dinero y pierdes el turno.`,
      });
    }

    next[turn] = pj;
    setPlayers(next);

    // limpiar estado de la ronda y pasar turno
    setActive(null);
    setMission(null);
    setShowBuilder(false);
    setTurn((prev) => (prev + 1) % players.length);
  }

  // Saltar turno (sin gastar)
  function skipTurn() {
    if (isMoving) return;
    setActive(null);
    setMission(null);
    setShowBuilder(false);
    setTurn((prev) => (prev + 1) % players.length);
  }

  // ranking rápido (para cuando termine el tiempo)
  const ranking = useMemo(
    () =>
      [...players]
        .map((p) => ({ ...p, total: totalJugador(p) }))
        .sort((a, b) => a.total - b.total), // menos dinero => mejor
    [players]
  );

  // fichas que se dibujan en el Board
  const pawns: PawnOnBoard[] = players.map((p) => ({
    id: p.id,
    name: p.name,
    color: p.color,
    avatar: p.avatar,
    position: p.position,
  }));

  // === RETURN ===
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center gap-6 p-6">
      {/* header con timer */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">🎲 Cuentas Claras</h1>
        <div
          className={`px-3 py-1 rounded-lg text-white font-semibold ${
            timeOver ? "bg-red-600" : "bg-slate-900"
          }`}
          title="Tiempo restante"
        >
          ⏱ {mm}:{ss}
        </div>
      </div>

      {/* jugadores */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-3">
        {players.map((p, i) => (
          <div
            key={p.id}
            className={`border rounded-xl p-3 shadow-sm ${
              i === turn
                ? "border-blue-600 bg-white"
                : "bg-slate-100 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: p.color }}
                title={p.name}
              >
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="font-semibold">{p.name}</div>
              {i === turn && (
                <span className="text-xs text-blue-600 ml-auto">• turno</span>
              )}
            </div>
            <div className="text-sm text-gray-700 mt-1">
              ⭐ {p.stars} estrellas
            </div>
            <div className="text-sm text-gray-700">
              💰 ${totalJugador(p).toLocaleString("es-CL")}
            </div>
          </div>
        ))}
      </div>

      {/* Tablero */}
      <div className="relative w-full max-w-4xl aspect-square mx-auto board-wrapper">
        <Board active={active} pawns={pawns} />
        <TimerHUD remainingSec={timeLeft} totalSec={durationMin * 60} />
      </div>

      {/* Dado */}
      <div className="mt-2">
        <ColorDie3D onRoll={handleRoll} />
      </div>

      {/* Tarjeta misión */}
      {active && mission && !showBuilder && (
        <MissionCard
          lugar={active}
          mision={mission}
          onAceptar={aceptarMision}
          onOtra={otraMision}
        />
      )}

      {/* Constructor de monedas */}
      {active && mission && showBuilder && (
        <MonedasChile
          descripcion={mission.description}   // 👈 texto completo de la misión
          objetivo={mission.price}           // sigue usando el precio internamente
          onConfirm={handleBuilderConfirm}
          onOpenCalc={handleOpenCalc}
        />
      )}

      {/* Acciones turno */}
      <div className="flex gap-3">
        <button
          onClick={skipTurn}
          className="mt-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm"
          disabled={isMoving}
        >
          Pasar turno ⏭️
        </button>
      </div>

      {/* Fin de juego por tiempo */}
      {timeOver && (
        <div className="w-full max-w-3xl mt-4 p-4 bg-white rounded-xl shadow">
          <div className="text-lg font-semibold mb-2">
            ⏰ ¡Tiempo cumplido!
          </div>
          <div className="text-sm text-gray-700 mb-3">
            Gana quien invirtió más (quien tiene menos dinero).
          </div>
          <ol className="list-decimal ml-5 space-y-1">
            {ranking.map((p, idx) => (
              <li key={p.id}>
                <span className="font-semibold">{p.name}</span> — 💰 $
                {totalJugador(p).toLocaleString("es-CL")} — ⭐ {p.stars}
                {idx === 0 && <span className="ml-2">🏆</span>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Modal de eventos (misiones correctas/incorrectas, banco, etc.) */}
      {eventModal && (
        <EventModal
          open={true}
          title={eventModal.title}
          message={eventModal.message}
          onClose={() => setEventModal(null)}
        />
      )}

      {/* Calculadora modal */}
      <Calculator open={showCalc} onClose={() => setShowCalc(false)} />
    </div>
  );
}
