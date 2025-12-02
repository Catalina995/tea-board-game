// src/screens/SetupScreen.tsx
import { useEffect, useState } from "react";
import type { SetupPayload, PlayerSetup } from "../App"; // solo tipos para ayuda

// Colores de ficha/identificación por jugador (máx. 4)
const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24"]; // rojo, azul, verde, amarillo

// Opciones de fichas (monedas/billetes) usando tus carpetas /public/img/monedas y /public/img/billetes
const TOKEN_OPTIONS: { id: string; label: string; src: string }[] = [
  { id: "m10", label: "Moneda $10", src: "/img/monedas/10.png" },
  { id: "m50", label: "Moneda $50", src: "/img/monedas/50.png" },
  { id: "m100n", label: "Moneda $100 (nueva)", src: "/img/monedas/100.png" },
  { id: "m100a", label: "Moneda $100 (antigua)", src: "/img/monedas/101.png" },
  { id: "m500", label: "Moneda $500", src: "/img/monedas/500.png" },
  { id: "b1000", label: "Billete $1.000", src: "/img/billetes/1000.jpg" },
  { id: "b2000", label: "Billete $2.000", src: "/img/billetes/2000.jpg" },
  { id: "b5000", label: "Billete $5.000", src: "/img/billetes/5000.jpg" },
  { id: "b10000", label: "Billete $10.000", src: "/img/billetes/10000.jpg" },
  { id: "b20000", label: "Billete $20.000", src: "/img/billetes/20000.jpg" },
];

// Selector visual de ficha (token)
function TokenPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {TOKEN_OPTIONS.map((t) => {
        const selected = value === t.src;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.src)}
            className={`border rounded-lg p-2 bg-white hover:shadow ${
              selected ? "ring-2 ring-blue-500" : "ring-0"
            }`}
            title={t.label}
          >
            <img
              src={t.src}
              alt={t.label}
              className="w-16 h-10 object-contain mx-auto"
              draggable={false}
            />
            <div className="text-[11px] mt-1 text-gray-600 text-center">
              {t.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function SetupScreen({
  onStart,
}: {
  onStart: (payload: SetupPayload) => void;
}) {
  // cantidad de jugadores (ahora 1–4)
  const [count, setCount] = useState(1);

  // nombres y fichas elegidas (arrays sincronizados con `count`)
  const [names, setNames] = useState<string[]>([""]);
  const [tokens, setTokens] = useState<string[]>([TOKEN_OPTIONS[0].src]);

  // minutos (se mantiene; editable)
  const [minutes, setMinutes] = useState(45);

  // 🔹 Nivel de dificultad
  const [difficulty, setDifficulty] = useState<
    "basico" | "intermedio" | "avanzado"
  >("basico");

  // Cuando cambia la cantidad de jugadores, ajustamos longitudes
  useEffect(() => {
    setNames((prev) => {
      const next = [...prev];
      next.length = count;
      for (let i = 0; i < count; i++) if (next[i] == null) next[i] = "";
      return next;
    });
    setTokens((prev) => {
      const next = [...prev];
      next.length = count;
      for (let i = 0; i < count; i++)
        if (next[i] == null)
          next[i] = TOKEN_OPTIONS[i % TOKEN_OPTIONS.length].src;
      return next;
    });
  }, [count]);

  function handleNameChange(i: number, value: string) {
    const updated = [...names];
    updated[i] = value;
    setNames(updated);
  }

  function handleTokenChange(i: number, value: string) {
    const updated = [...tokens];
    updated[i] = value;
    setTokens(updated);
  }

  function handleStart() {
    const players: PlayerSetup[] = Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      name: (names[i] || "").trim() || `Jugador ${i + 1}`,
      color: COLORS[i],
      avatar: tokens[i] || TOKEN_OPTIONS[i % TOKEN_OPTIONS.length].src,
    }));

    onStart({
      players,
      durationMin: Math.min(60, Math.max(5, Number(minutes) || 45)),
      difficulty, // 👈 se envía el nivel elegido
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">🎲 Cuentas Claras — Configuración</h1>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-3xl space-y-6">
        {/* Cantidad de jugadores */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-center">
            ¿Cuántos jugadores participarán?
          </label>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className={`w-10 h-10 rounded-full ${
                  count === n
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Fila de jugadores: nombre + ficha */}
        <div className="space-y-6">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border rounded-lg p-3"
            >
              <div>
                <label className="text-sm text-gray-700">
                  Nombre del jugador {i + 1}
                </label>
                <input
                  value={names[i] || ""}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder={`Ej.: Sofía`}
                />
                <div
                  className="text-xs mt-1"
                  style={{ color: COLORS[i] }}
                >{`Color asignado`}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm text-gray-700 mb-1">Elige tu ficha</div>
                <TokenPicker
                  value={tokens[i]}
                  onChange={(val) => handleTokenChange(i, val)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tiempo de juego */}
        <div className="text-center">
          <label className="block text-lg font-semibold mb-2">
            Duración del juego (minutos)
          </label>
          <input
            type="number"
            min={5}
            max={60}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-32 border rounded-lg p-2 text-center"
          />
          <div className="text-xs text-gray-500 mt-1">(entre 5 y 60 minutos)</div>
        </div>

        {/* 🔹 Nivel de dificultad */}
        <div className="text-center">
          <label className="block text-lg font-semibold mb-2">
            Nivel de dificultad
          </label>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { id: "basico", label: "Básico" },
              { id: "intermedio", label: "Intermedio" },
              { id: "avanzado", label: "Avanzado" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setDifficulty(opt.id as "basico" | "intermedio" | "avanzado")
                }
                className={[
                  "px-4 py-2 rounded-full text-sm font-semibold border",
                  difficulty === opt.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            El nivel avanzado combina suma, resta y multiplicación.
          </div>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
        >
          Comenzar juego
        </button>
      </div>
    </div>
  );
}
