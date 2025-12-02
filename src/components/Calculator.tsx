// src/components/Calculator.tsx
import { useEffect, useState } from "react";

type Mode = "modal" | "inline";

export default function Calculator({
  open,
  onClose,
  mode = "modal",
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  mode?: Mode;          // ← "modal" (pantalla completa) o "inline" (anclada)
  className?: string;   // ← para posicionarla cuando es "inline"
}) {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<null | "+" | "-" | "×" | "÷">(null);

  // 🔹 Normaliza un string tipo "1.200,5" → 1200.5
  const normalizeNumber = (s: string) => {
    const clean = s.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    const n = Number(clean);
    return isNaN(n) ? 0 : n;
  };

  const fmt = (n: number) =>
    !isFinite(n)
      ? "Error"
      : Number.isInteger(n)
      ? n.toLocaleString("es-CL")
      : n.toLocaleString("es-CL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        });

  useEffect(() => {
    if (!open) {
      setDisplay("0");
      setPrev(null);
      setOp(null);
    }
  }, [open]);

  function inputDigit(d: string) {
    setDisplay((cur) => (cur === "0" || cur === "Error" ? d : cur + d));
  }

  function inputDot() {
    setDisplay((cur) =>
      cur.includes(",") || cur.includes(".") ? cur : cur + ","
    );
  }

  function toggleSign() {
    setDisplay((cur) =>
      cur.startsWith("-") ? cur.slice(1) : cur === "0" ? "0" : "-" + cur
    );
  }

  function clearAll() {
    setDisplay("0");
    setPrev(null);
    setOp(null);
  }

  function percent() {
    const n = normalizeNumber(display);
    setDisplay(fmt(n / 100));
  }

  function chooseOp(next: "+" | "-" | "×" | "÷") {
    if (display === "Error") return;

    // Si ya había una operación pendiente, primero la resolvemos
    if (prev !== null && op) {
      const a = normalizeNumber(prev);
      const b = normalizeNumber(display);

      let res = 0;
      switch (op) {
        case "+":
          res = a + b;
          break;
        case "-":
          res = a - b;
          break;
        case "×":
          res = a * b;
          break;
        case "÷":
          res = b === 0 ? NaN : a / b;
          break;
      }

      const formatted = fmt(res);
      setPrev(formatted);
      setDisplay("0");
      setOp(next);
    } else {
      setOp(next);
      setPrev(display);
      setDisplay("0");
    }
  }

  function equal() {
    if (prev === null || !op) return;

    const a = normalizeNumber(prev);
    const b = normalizeNumber(display);
    let res = 0;

    switch (op) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "×":
        res = a * b;
        break;
      case "÷":
        res = b === 0 ? NaN : a / b;
        break;
    }

    setDisplay(fmt(res));
    setPrev(null);
    setOp(null);
  }

  if (!open) return null;

  // contenedor según modo
    const Wrapper: React.FC<{ children: React.ReactNode }> =
    mode === "modal"
      ? ({ children }) => (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Fondo oscuro que cierra al hacer clic */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={onClose}
              aria-hidden="true"
            />
            {/* Calculadora por encima del fondo */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        )
      : ({ children }) => (
          <div className={`absolute z-30 ${className}`}>{children}</div>
        );


  return (
    <Wrapper>
      <div className="w-[min(92vw,420px)] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header naranja */}
        <div className="flex items-center justify-between bg-orange-600 text-white px-4 py-3">
          <div className="font-semibold">Calculadora</div>
          <button
            onClick={onClose}
            className="rounded hover:bg-white/20 w-8 h-8 flex items-center justify-center"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Display */}
        <div className="bg-orange-50 px-4 py-5">
          <div className="text-right text-4xl font-semibold text-slate-900 select-all">
            {display}
          </div>
          {op && prev !== null && (
            <div className="text-right text-sm text-slate-500 mt-1">
              {prev} {op}
            </div>
          )}
        </div>

        {/* Teclado */}
        <div className="p-4 grid grid-cols-4 gap-3">
          <Key onClick={clearAll} variant="ghost">
            C
          </Key>
          <Key onClick={toggleSign} variant="ghost">
            ±
          </Key>
          <Key onClick={percent} variant="ghost">
            %
          </Key>
          <Key onClick={() => chooseOp("÷")} variant="op">
            ÷
          </Key>

          <Key onClick={() => inputDigit("7")}>7</Key>
          <Key onClick={() => inputDigit("8")}>8</Key>
          <Key onClick={() => inputDigit("9")}>9</Key>
          <Key onClick={() => chooseOp("×")} variant="op">
            ×
          </Key>

          <Key onClick={() => inputDigit("4")}>4</Key>
          <Key onClick={() => inputDigit("5")}>5</Key>
          <Key onClick={() => inputDigit("6")}>6</Key>
          <Key onClick={() => chooseOp("-")} variant="op">
            −
          </Key>

          <Key onClick={() => inputDigit("1")}>1</Key>
          <Key onClick={() => inputDigit("2")}>2</Key>
          <Key onClick={() => inputDigit("3")}>3</Key>
          <Key onClick={() => chooseOp("+")} variant="op">
            +
          </Key>

          <Key onClick={() => inputDigit("0")} className="col-span-2">
            0
          </Key>
          <Key onClick={inputDot}>,</Key>
          <Key onClick={equal} variant="eq">
            =
          </Key>
        </div>
      </div>
    </Wrapper>
  );
}

function Key({
  children,
  onClick,
  variant = "base",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "base" | "op" | "eq" | "ghost";
  className?: string;
}) {
  const common =
    "h-14 rounded-xl text-xl font-semibold flex items-center justify-center select-none";
  const styles =
    variant === "op"
      ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
      : variant === "eq"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : variant === "ghost"
      ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
      : "bg-white text-slate-900 hover:bg-slate-50 border";
  return (
    <button onClick={onClick} className={`${common} ${styles} ${className}`}>
      {children}
    </button>
  );
}
