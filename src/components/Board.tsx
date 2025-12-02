// src/components/Board.tsx
import type { ColorKey } from "../data/misiones";
import { PLACES } from "../data/misiones";
import { COLORS } from "./ColorDie";

// 👤 Tipo de ficha que se muestra en el tablero
export type PawnOnBoard = {
  id: number;
  name: string;
  color: string;   // color del jugador (por si después lo quieres usar)
  avatar: string;  // imagen de la moneda/billete elegida
  position: number; // 0..19 (posición en el perímetro)
};

const SIZE = 6; // 6x6
const ORDER: ColorKey[] = [
  "rojo",
  "amarillo",
  "verde",
  "azul",
  "morado",
  "naranjo",
];

// 🔗 Mapeo de color → ícono del lugar
// (rutas según tus archivos en /public/img/icons)
const PLACE_ICONS: Partial<Record<ColorKey, string>> = {
  amarillo: "/img/icons/feria.png",        // Feria
  verde: "/img/icons/panaderia.png",      // Panadería
  rojo: "/img/icons/supermercado.png",    // Supermercado
  naranjo: "/img/icons/libreria.png",     // Librería
  morado: "/img/icons/almacen.png",       // Almacén
  // azul es banco y lo manejamos aparte con banco-mini
};

// Bloque central 4x4: filas 1..4 y columnas 1..4 (índices base 0)
const BANK_START_ROW = 1;
const BANK_START_COL = 1;
const BANK_ROWS = 4;
const BANK_COLS = 4;

function isBankCell(r: number, c: number) {
  return (
    r >= BANK_START_ROW &&
    r < BANK_START_ROW + BANK_ROWS &&
    c >= BANK_START_COL &&
    c < BANK_START_COL + BANK_COLS
  );
}

type CellKind =
  | { type: "color"; key: ColorKey }
  | { type: "bank" }
  | { type: "floor" };

// 👉 aquí guardamos el recorrido del perímetro (20 casillas)
const PERIMETER: Array<[number, number]> = [];

/** Genera layout 6x6:
 * - Perímetro: colores en secuencia ORDER.
 * - Centro 4x4: banco (imagen grande).
 * - Interior restante: piso.
 */
function buildLayout(): CellKind[][] {
  const grid: CellKind[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ type: "floor" } as CellKind))
  );

  // Marca banco 4x4 (centro)
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (isBankCell(r, c)) grid[r][c] = { type: "bank" };
    }
  }

  // Construimos el perímetro
  const perimeterCoords: Array<[number, number]> = [];
  // fila superior
  for (let c = 0; c < SIZE; c++) perimeterCoords.push([0, c]);
  // columna derecha (sin esquina superior)
  for (let r = 1; r < SIZE; r++) perimeterCoords.push([r, SIZE - 1]);
  // fila inferior (derecha → izquierda, sin esquina derecha)
  for (let c = SIZE - 2; c >= 0; c--) perimeterCoords.push([SIZE - 1, c]);
  // columna izquierda (abajo → arriba, sin esquinas)
  for (let r = SIZE - 2; r >= 1; r--) perimeterCoords.push([r, 0]);

  // guardamos el recorrido SOLO la primera vez
  if (PERIMETER.length === 0) {
    PERIMETER.push(...perimeterCoords);
  }

  // Asignamos color a cada casilla del perímetro (sin volvernos locos con el orden exacto)
  perimeterCoords.forEach(([r, c], i) => {
    const key = ORDER[i % ORDER.length];
    grid[r][c] = { type: "color", key };
  });

  return grid;
}

const LAYOUT = buildLayout();

// 🔍 función para saber en qué celda (fila, columna) va una posición 0..19
function cellFromPosition(position: number) {
  if (PERIMETER.length === 0) return null;
  const idx =
    ((position % PERIMETER.length) + PERIMETER.length) % PERIMETER.length;
  const [row, col] = PERIMETER[idx];
  return { row, col };
}

export default function Board({
  active,
  pawns = [],
}: {
  active?: ColorKey | null;
  pawns?: PawnOnBoard[];
}) {
  // Agrupar fichas por celda (row-col) para poder ordenarlas 2x2
  const pawnsByCell: Record<string, PawnOnBoard[]> = {};

  pawns.forEach((pawn) => {
    const cell = cellFromPosition(pawn.position ?? 0);
    if (!cell) return;
    const key = `${cell.row}-${cell.col}`;
    if (!pawnsByCell[key]) pawnsByCell[key] = [];
    pawnsByCell[key].push(pawn);
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-square">
      {/* 🧱 Capas de casillas (la grid original) */}
      <div className="grid grid-cols-6 grid-rows-6 gap-2 p-2 w-full h-full place-items-stretch">
        {LAYOUT.flatMap((row, r) =>
          row.map((cell, c) => {
            const key = `${r}-${c}`;

            // 🏦 Bloque central banco grande
            if (cell.type === "bank") {
              if (r === BANK_START_ROW && c === BANK_START_COL) {
                return (
                  <div
                    key={key}
                    className="rounded-xl overflow-hidden shadow-lg"
                    style={{
                      gridColumn: `${BANK_START_COL + 1} / span ${BANK_COLS}`,
                      gridRow: `${BANK_START_ROW + 1} / span ${BANK_ROWS}`,
                    }}
                  >
                    <img
                      src="/img/banco-central.jpg"
                      alt="Banco Central"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              }
              // Las demás celdas del bloque central no se dibujan
              return null;
            }

            // Casilla vacía interior
            if (cell.type === "floor") {
              return (
                <div
                  key={key}
                  className="h-full w-full rounded-xl bg-slate-100 border border-slate-200"
                />
              );
            }

            // 🎨 Casilla de color (lugar del tablero)
            const info = COLORS[cell.key];
            const isActive = active === cell.key;

            // Casilla especial de INICIO: arriba izquierda (0,0)
            const isStartCell = r === 0 && c === 0;
            const bgClass = isStartCell ? "bg-sky-400" : info.bg;
            const label = isStartCell ? "Inicio" : PLACES[cell.key];

            // ícono del lugar (solo para NO banco y NO inicio)
            const iconSrc =
              !isStartCell && cell.key !== "azul"
                ? PLACE_ICONS[cell.key]
                : undefined;

            return (
              <div
                key={key}
                className={[
                  "h-full w-full rounded-xl flex flex-col items-center justify-center text-center text-xs sm:text-sm md:text-base font-semibold p-2 shadow board-tile",
                  bgClass,
                  isActive ? "ring-4 ring-white scale-[1.03]" : "",
                ].join(" ")}
                title={label}
              >
                {/* Iconito del banco si es azul o si es la casilla de inicio */}
                {((cell.key === "azul" && !isStartCell) || isStartCell) && (
                  <img
                    src="/img/banco-mini.png"
                    alt="Banco"
                    className="w-20 h-20 object-contain mb-1"
                    draggable={false}
                  />
                )}

                {/* Iconos nuevos: feria, panadería, almacén, librería, super */}
                {iconSrc && (
                  <img
                    src={iconSrc}
                    alt={label}
                    className="w-20 h-20 object-contain mb-1"
                    draggable={false}
                  />
                )}

                {/* Texto del lugar (siempre, como querías) */}
                <span
                  className={`board-tile-label ${isStartCell ? "mt-0.5" : ""}`}
                >
                  {label}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* 🧍‍♀️🧍‍♂️ Fichas de los jugadores superpuestas */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-2">
        {Object.entries(pawnsByCell).map(([key, cellPawns]) => {
          const [rowStr, colStr] = key.split("-");
          const row = Number(rowStr);
          const col = Number(colStr);

          return (
            <div
              key={key}
              style={{
                gridColumn: col + 1,
                gridRow: row + 1,
              }}
              className="flex items-center justify-center z-20"
            >
              {/* mini-grilla 2x2 dentro de la casilla */}
              <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
                {cellPawns.map((pawn) => (
                  <img
                    key={pawn.id}
                    src={pawn.avatar}
                    alt={pawn.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
