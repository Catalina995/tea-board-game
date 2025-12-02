// src/components/BankCenter.tsx
export default function BankCenter() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg
        viewBox="0 0 200 200"
        className="w-24 h-24 md:w-28 md:h-28 drop-shadow-sm"
        aria-label="Banco"
      >
        {/* Suelo */}
        <rect x="15" y="150" width="170" height="12" rx="6" fill="#e5e7eb" />
        {/* Base */}
        <rect x="35" y="140" width="130" height="12" rx="4" fill="#d1d5db" />
        {/* Columnas */}
        <rect x="45" y="90" width="16" height="50" rx="4" fill="#cbd5e1" />
        <rect x="82" y="90" width="16" height="50" rx="4" fill="#cbd5e1" />
        <rect x="120" y="90" width="16" height="50" rx="4" fill="#cbd5e1" />
        <rect x="157" y="90" width="16" height="50" rx="4" fill="#cbd5e1" />
        {/* Escalinata */}
        <rect x="30" y="152" width="140" height="8" rx="3" fill="#e2e8f0" />
        {/* Techo */}
        <path
          d="M20 88 L100 40 L180 88 Z"
          fill="#fde68a"
          stroke="#f59e0b"
          strokeWidth="4"
        />
        {/* Friso */}
        <rect x="30" y="80" width="140" height="10" rx="3" fill="#fcd34d" />
        {/* Frontis con texto */}
        <rect
          x="72"
          y="64"
          width="56"
          height="14"
          rx="4"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text
          x="100"
          y="75"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="10"
          fill="#b45309"
          style={{ letterSpacing: 1 }}
        >
          BANCO
        </text>

        {/* Moneda giratoria (animación) */}
        <g>
          <circle cx="100" cy="40" r="10" fill="#fbbf24">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 40"
              to="360 100 40"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="10;12;10"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="40" r="6" fill="#fde68a" />
        </g>

        {/* Brillo “latido” del edificio */}
        <g opacity="0.6">
          <rect x="35" y="90" width="138" height="62" rx="6" fill="transparent">
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </svg>
    </div>
  );
}
