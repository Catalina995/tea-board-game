// src/components/AvatarPicker.tsx
import { PAWN_ICONS } from "../data/pawnIcons";

type AvatarPickerProps = {
  value: string;                          // ruta actual seleccionada
  onChange: (newSrc: string) => void;     // lo que hacemos al cambiar
};

export default function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-slate-600 font-medium">
        Elige tu ficha (moneda o billete)
      </div>
      <div className="grid grid-cols-3 gap-2">
        {PAWN_ICONS.map((icon) => {
          const isSelected = value === icon.src;
          return (
            <button
              key={icon.id}
              type="button"
              onClick={() => onChange(icon.src)}
              className={[
                "border rounded-xl p-1 bg-white flex flex-col items-center justify-center gap-1",
                "hover:border-blue-400 hover:shadow-sm",
                isSelected ? "border-blue-600 ring-2 ring-blue-300" : "border-slate-200",
              ].join(" ")}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="w-12 h-12 object-contain"
                draggable={false}
              />
              <span className="text-[10px] text-slate-700 text-center">
                {icon.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
