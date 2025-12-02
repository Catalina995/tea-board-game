// src/components/Modal.tsx
type Props = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  actions?: React.ReactNode;
};

export default function Modal({ open, title, children, onClose, actions }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
        <div className="text-slate-700">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          {actions}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
