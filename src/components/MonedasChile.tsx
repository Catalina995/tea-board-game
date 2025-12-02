// src/components/MonedasChile.tsx
import { useMemo, useState } from "react";

type Den = {
  id: string; // ID único (100n vs 100a)
  label: string; // Texto visible
  value: number; // Valor monetario
  kind: "moneda" | "billete";
};

const IMG_SRC: Record<string, string> = {
  "10": "/img/monedas/10.png",
  "50": "/img/monedas/50.png",
  "100n": "/img/monedas/100.png", // 100 nueva
  "100a": "/img/monedas/101.png", // 100 antigua
  "500": "/img/monedas/500.png",
  "1000": "/img/billetes/1000.jpg",
  "2000": "/img/billetes/2000.jpg",
  "5000": "/img/billetes/5000.jpg",
  "10000": "/img/billetes/10000.jpg",
  "20000": "/img/billetes/20000.jpg",
};

const DENOMINACIONES: Den[] = [
  { id: "10", label: "$10", value: 10, kind: "moneda" },
  { id: "50", label: "$50", value: 50, kind: "moneda" },
  { id: "100n", label: "$100 (nueva)", value: 100, kind: "moneda" },
  { id: "100a", label: "$100 (antigua)", value: 100, kind: "moneda" },
  { id: "500", label: "$500", value: 500, kind: "moneda" },
  { id: "1000", label: "$1.000", value: 1000, kind: "billete" },
  { id: "2000", label: "$2.000", value: 2000, kind: "billete" },
  { id: "5000", label: "$5.000", value: 5000, kind: "billete" },
  { id: "10000", label: "$10.000", value: 10000, kind: "billete" },
  { id: "20000", label: "$20.000", value: 20000, kind: "billete" },
];

export default function MonedasChile({
  descripcion,
  onConfirm,
  onOpenCalc,
}: {
  descripcion: string;
  objetivo: number;
  onConfirm: (total: number) => void;
  onOpenCalc?: () => void;
}) {
  const [cant, setCant] = useState<Record<string, number>>({});

  const total = useMemo(
    () =>
      DENOMINACIONES.reduce(
        (acc, d) => acc + d.value * (cant[d.id] ?? 0),
        0
      ),
    [cant]
  );

  const nf = useMemo(
    () =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }),
    []
  );

  function add(id: string) {
    setCant((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function remove(id: string) {
    setCant((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) > 0) next[id] = next[id] - 1;
      return next;
    });
  }

  function clearAll() {
    setCant({});
  }

  return (
    <div className="rounded-xl bg-white shadow p-4 w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-2">
        Arma el monto con monedas/billetes:
      </h2>

      {/* Enunciado completo de la misión (sin mostrar el resultado) */}
      <p className="text-lg font-semibold mb-1">
        {descripcion}
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DENOMINACIONES.map((d) => (
          <div key={d.id} className="border rounded-lg p-3 overflow-hidden">
            {/* Cabecera centrada */}
            <div className="flex flex-col items-center text-center">
              <img
                src={IMG_SRC[d.id]}
                alt={`${d.kind} ${d.label}`}
                className={
                  d.kind === "billete"
                    ? "h-20 object-contain"
                    : "h-16 object-contain"
                }
                draggable={false}
              />
              <div className="mt-2 text-xs text-gray-500 capitalize">
                {d.kind}
              </div>
              <div className="mt-0.5 text-lg font-semibold">{d.label}</div>
            </div>

            {/* Controles */}
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => remove(d.id)}
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300"
              >
                −
              </button>
              <div className="min-w-6 text-center">{cant[d.id] ?? 0}</div>
              <button
                onClick={() => add(d.id)}
                className="px-2 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + botones */}
      <div className="mt-5 flex items-center justify-between">
        <div className="text-xl">
          Total: <span className="font-bold">{nf.format(total)}</span>
        </div>

        <div className="flex gap-2">
          {onOpenCalc && (
            <button
              onClick={onOpenCalc}
              className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 text-sm"
            >
              Abrir calculadora 🧮
            </button>
          )}
          <button
            onClick={clearAll}
            className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 text-sm"
          >
            Limpiar
          </button>
          <button
            onClick={() => onConfirm(total)}
            className="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 text-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
