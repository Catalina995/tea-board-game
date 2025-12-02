// src/components/ColorDie3D.tsx
import { useState } from "react";
import type { ColorKey } from "../data/misiones";
import { PLACES } from "../data/misiones";
import { COLORS } from "./ColorDie";

const COLOR_KEYS: ColorKey[] = [
  "amarillo",  // Feria
  "verde",     // Panadería
  "morado",    // Almacén
  "naranjo",   // Librería
  "rojo",      // Supermercado
  "azul",      // Banco
];

const ICONS: Record<ColorKey, string> = {
  amarillo: "/img/icons/feria.png",
  verde: "/img/icons/panaderia.png",
  morado: "/img/icons/almacen.png",
  naranjo: "/img/icons/libreria.png",
  rojo: "/img/icons/supermercado.png",
  azul: "/img/banco-mini.png",
};

export default function ColorDie3D({
  onRoll,
}: {
  onRoll: (color: ColorKey) => void;
}) {
  const [currentColor, setCurrentColor] = useState<ColorKey>("amarillo");
  const [isRolling, setIsRolling] = useState(false);

  function handleClick() {
    if (isRolling) return;

    setIsRolling(true);

    const steps = 10;
    let count = 0;
    let finalColor: ColorKey = currentColor;

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * COLOR_KEYS.length);
      finalColor = COLOR_KEYS[idx];
      setCurrentColor(finalColor);
      count++;

      if (count >= steps) {
        clearInterval(interval);
        setIsRolling(false);
        onRoll(finalColor);
      }
    }, 90);
  }

  const meta = COLORS[currentColor];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isRolling}
      className={[
        "relative flex flex-col items-center justify-center",
        "w-24 h-24 sm:w-28 sm:h-28",
        "rounded-2xl shadow-lg text-white font-semibold",
        "transition-transform duration-150",
        meta.bg,
        // 👇 ahora el CUADRADO completo gira mientras está rodando
        isRolling ? "animate-spin" : "hover:scale-105 hover:shadow-xl",
      ].join(" ")}
    >
      {/* Icono del lugar (ya no gira, solo el dado completo) */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1 flex items-center justify-center">
        <img
          src={ICONS[currentColor]}
          alt={PLACES[currentColor]}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Nombre del lugar */}
      <span className="text-xs sm:text-sm">
        {PLACES[currentColor]}
      </span>

      {/* Texto pequeño abajo */}
      <span className="text-[10px] sm:text-xs mt-1 opacity-80">
        {isRolling ? "Lanzando..." : "Haz clic para lanzar"}
      </span>
    </button>
  );
}
