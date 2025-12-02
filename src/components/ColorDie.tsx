// src/components/ColorDie.tsx
import { useEffect, useRef, useState } from "react";
import type { ColorKey } from "../data/misiones";

// Colores + estilos (también lo usa Board)
export const COLORS: Record<
  ColorKey,
  { label: string; bg: string; ring: string; text: string }
> = {
  rojo:     { label: "Rojo",     bg: "bg-red-500",    ring: "ring-red-300",    text: "text-white" },
  amarillo: { label: "Amarillo", bg: "bg-yellow-400", ring: "ring-yellow-200", text: "text-black" },
  verde:    { label: "Verde",    bg: "bg-green-500",  ring: "ring-green-300",  text: "text-white" },
  azul:     { label: "Azul",     bg: "bg-blue-500",   ring: "ring-blue-300",   text: "text-white" },
  morado:   { label: "Morado",   bg: "bg-purple-500", ring: "ring-purple-300", text: "text-white" },
  naranjo:  { label: "Naranjo",  bg: "bg-orange-500", ring: "ring-orange-300", text: "text-white" },
};

const ORDER: ColorKey[] = ["rojo", "amarillo", "verde", "azul", "morado", "naranjo"];

export default function ColorDie({ onRoll }: { onRoll: (color: ColorKey) => void }) {
  const [rolling, setRolling] = useState(false);
  const [idx, setIdx] = useState(0);              // índice del color mostrado
  const idxRef = useRef(0);                       // ref para leer el último índice dentro de timeouts

  useEffect(() => { idxRef.current = idx; }, [idx]);

  function roll() {
    if (rolling) return;
    setRolling(true);

    // velocidad de “giro” y duración total
    const tickMs = 90;
    const durationMs = 1400;

    const it = setInterval(() => {
      setIdx((i) => (i + 1) % ORDER.length);
    }, tickMs);

    setTimeout(() => {
      clearInterval(it);
      setRolling(false);
      const result = ORDER[idxRef.current] as ColorKey;
      onRoll(result);
    }, durationMs);
  }

  const current = ORDER[idx];
  const style = COLORS[current];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* “Dado” circular que cambia de color mientras gira */}
      <div
        className={[
          "w-28 h-28 rounded-full ring-8 flex items-center justify-center font-bold shadow-lg select-none",
          style.bg,
          style.ring,
          style.text,
          rolling ? "animate-pulse" : ""
        ].join(" ")}
        aria-live="polite"
        title={`Color actual: ${style.label}`}
      >
        {style.label}
      </div>

      <button
        onClick={roll}
        disabled={rolling}
        className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {rolling ? "Rodando..." : "Lanzar dado de colores"}
      </button>
    </div>
  );
}
