// src/components/EventModal.tsx
type EventModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonLabel?: string;
};

export default function EventModal({
  open,
  title,
  message,
  onClose,
  buttonLabel = "Aceptar",
}: EventModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Tarjeta del modal */}
      <div className="relative z-10 w-[min(90vw,420px)] rounded-2xl bg-white shadow-xl p-5">
        <h2 className="text-lg font-bold mb-2 text-slate-900">{title}</h2>
        <p className="text-sm text-slate-700 whitespace-pre-line">
          {message}
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
