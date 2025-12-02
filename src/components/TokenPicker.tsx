// src/components/TokenPicker.tsx
type TokenPickerProps = {
  value: string;                 // ruta de la imagen elegida (p.ej. "/img/monedas/100.png")
  onChange: (v: string) => void; // callback cuando el usuario elige otra
  options: { src: string; label: string }[];
};

export default function TokenPicker({ value, onChange, options }: TokenPickerProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
      {options.map((opt) => {
        const active = value === opt.src;
        return (
          <button
            key={opt.src}
            type="button"
            onClick={() => onChange(opt.src)}
            className={[
              "rounded-xl border p-2 bg-white shadow hover:shadow-md transition",
              active ? "border-blue-600 ring-2 ring-blue-200" : "border-slate-200",
            ].join(" ")}
            title={opt.label}
          >
            <img
              src={opt.src}
              alt={opt.label}
              className="w-16 h-16 mx-auto object-contain"
            />
            <div className="mt-1 text-xs text-center text-slate-700">{opt.label}</div>
          </button>
        );
      })}
    </div>
  );
}
