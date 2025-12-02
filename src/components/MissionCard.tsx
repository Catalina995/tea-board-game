// src/components/MissionCard.tsx
import { PLACES } from "../data/misiones";
import type { ColorKey, Mission } from "../data/misiones";

export default function MissionCard({
  lugar,
  mision,
  onAceptar,
  onOtra,
}: {
  lugar: ColorKey;
  mision: Mission;
  onAceptar: () => void;
  onOtra: () => void;
}) {

  return (
    <div className="rounded-xl bg-white shadow p-4 w-full max-w-xl mx-auto">
      {/* Lugar (Banco, Feria, etc.) */}
      <div className="text-sm text-gray-500">{PLACES[lugar]}</div>

      {/* Título de la misión */}
      <div className="text-xl font-semibold mt-1">{mision.title}</div>

      {/* Descripción corta de la situación */}
      <div className="mt-1 text-sm text-gray-700">{mision.description}</div>

      {/* Objetivo de dinero (oculto para no dar la respuesta) */}
      <div className="mt-3">
        <div className="text-gray-600">Objetivo:</div>
        <div className="text-sm text-gray-500">
          Resuelve la misión construyendo el monto 🔢
        </div>
      </div>


      {/* Botones */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onAceptar}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Aceptar misión
        </button>
        <button
          onClick={onOtra}
          className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
        >
          Otra misión
        </button>
      </div>
    </div>
  );
}
