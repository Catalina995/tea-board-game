// src/components/Calculator.tsx
import React, { useEffect, useMemo, useState } from "react";

type Mode = "modal" | "inline";

type Props = {
  open: boolean;
  onClose: () => void;
  mode?: Mode;        // "modal" o "inline"
  className?: string; // para posicionar cuando es "inline"
};

// Evalúa una expresión SANITIZADA con paréntesis y %.
// Soporta coma decimal (,) y lo convierte a punto.
function evalExpression(expr: string): number {
  // coma -> punto
  let s = expr.replace(/,/g, ".");

  // permitir solo números, operadores, paréntesis, punto, %, espacios
  s = s.replace(/[^0-9+\-*/().% ]/g, "");

  // convertir 50% => (50/100)
  s = s.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  // evitar expresión vacía
  if (!s.trim()) s = "0";

  // eslint-disable-next-line no-new-func
  const fn = new Function(`"use strict"; return (${s});`);
  const r = fn();
  return typeof r === "number" && Number.isFinite(r) ? r : NaN;
}

export default function Calculator({
  open,
  onClose,
  mode = "modal",
  className = "",
}: Props) {
  const [expr, setExpr] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const nf = useMemo(
    () =>
      new Intl.NumberFormat("es-CL", {
        maximumFractionDigits: 6,
      }),
    []
  );

  useEffect(() => {
    if (!open) {
      setExpr("0");
      setJustEvaluated(false);
    }
  }, [open]);

  const fmt = (n: number) =>
    !Number.isFinite(n) ? "Error" : nf.format(n);

  function clearAll() {
    setExpr("0");
    setJustEvaluated(false);
  }

  function backspace() {
    setExpr((cur) => {
      if (cur === "Error") return "0";
      if (cur.length <= 1) return "0";
      const next = cur.slice(0, -1);
      return next.trim() === "" ? "0" : next;
    });
    setJustEvaluated(false);
  }

  function append(value: string) {
    setExpr((cur) => {
      let next = cur;

      // si recién evaluamos y viene un número o "(" => empezamos nuevo
      if (justEvaluated && /[0-9(]/.test(value)) {
        next = "0";
      }

      if (next === "Error") next = "0";

      // si está en 0 y entra un dígito o coma, reemplaza
      if (next === "0" && /[0-9,]/.test(value)) {
        if (value === ",") return "0,";
        return value;
      }

      return next + value;
    });
    setJustEvaluated(false);
  }

  function appendOperator(op: string) {
    setExpr((cur) => {
      if (cur === "Error") return "0";
      // si termina en operador, reemplaza (evita ++, **, etc.)
      if (/[+\-*/]$/.test(cur.trim())) {
        return cur.trim().slice(0, -1) + op;
      }
      return cur + op;
    });
    setJustEvaluated(false);
  }

  function toggleSign() {
    // Cambia el signo de toda la expresión (simple y útil)
    setExpr((cur) => {
      if (cur === "0" || cur === "Error") return "0";
      return cur.startsWith("-") ? cur.slice(1) : "-" + cur;
    });
    setJustEvaluated(false);
  }

  function percent() {
    // Agrega % al final (lo interpreta como /100 al evaluar)
    setExpr((cur) => (cur === "Error" ? "0" : cur + "%"));
    setJustEvaluated(false);
  }

  function equal() {
    try {
      const res = evalExpression(expr);
      if (isNaN(res)) {
        setExpr("Error");
      } else {
        setExpr(fmt(res));
      }
      setJustEvaluated(true);
    } catch {
      setExpr("Error");
      setJustEvaluated(true);
    }
  }

  if (!open) return null;

  // Wrapper según modo
  const Wrapper: React.FC<{ children: React.ReactNode }> =
    mode === "modal"
      ? ({ children }) => (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={onClose}
              aria-hidden="true"
            />
            <div className="relative z-10">{children}</div>
          </div>
        )
      : ({ children }) => (
          <div className={`absolute z-30 ${className}`}>{children}</div>
        );

  return (
    <Wrapper>
      <div className="w-[min(92vw,420px)] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
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
          <div className="text-right text-4xl font-semibold text-slate-900 select-all break-all">
            {expr}
          </div>
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
          <Key onClick={() => appendOperator("/")} variant="op">
            ÷
          </Key>

          <Key onClick={() => append("(")} variant="ghost">
            (
          </Key>
          <Key onClick={() => append(")")} variant="ghost">
            )
          </Key>
          <Key onClick={backspace} variant="ghost">
            ⌫
          </Key>
          <Key onClick={() => appendOperator("*")} variant="op">
            ×
          </Key>

          <Key onClick={() => append("7")}>7</Key>
          <Key onClick={() => append("8")}>8</Key>
          <Key onClick={() => append("9")}>9</Key>
          <Key onClick={() => appendOperator("-")} variant="op">
            −
          </Key>

          <Key onClick={() => append("4")}>4</Key>
          <Key onClick={() => append("5")}>5</Key>
          <Key onClick={() => append("6")}>6</Key>
          <Key onClick={() => appendOperator("+")} variant="op">
            +
          </Key>

          <Key onClick={() => append("1")}>1</Key>
          <Key onClick={() => append("2")}>2</Key>
          <Key onClick={() => append("3")}>3</Key>
          <Key onClick={equal} variant="eq">
            =
          </Key>

          <Key onClick={() => append("0")} className="col-span-2">
            0
          </Key>
          <Key onClick={() => append(",") }>,</Key>
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
