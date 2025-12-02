// src/components/TimerHUD.tsx
type Props = {
  remainingSec: number;   // segundos restantes
  totalSec: number;       // segundos totales configurados
};

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function TimerHUD({ remainingSec, totalSec }: Props) {
  const pct = Math.max(0, Math.min(1, remainingSec / totalSec));
  const danger = remainingSec <= 60; // último minuto

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10 translate-y-[-50px] sm:translate-y-[-150px]">
      <div className="relative w-44 h-44 rounded-full bg-white/70 backdrop-blur-sm shadow-lg flex items-center justify-center">
        {/* aro de progreso */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${danger ? '#ef4444' : '#10b981'} ${pct * 360}deg, #e5e7eb 0deg)`,
            WebkitMask: "radial-gradient(circle 64px at center, transparent 60px, black 61px)",
            mask: "radial-gradient(circle 64px at center, transparent 60px, black 61px)",
            borderRadius: "9999px",
          }}
        />
        {/* tiempo */}
        <div className={`text-3xl font-bold ${danger ? "text-red-600" : "text-slate-800"}`}>
          {fmt(remainingSec)}
        </div>
        <div className="absolute bottom-2 text-xs text-slate-600">
          {Math.round(pct * 100)}%
        </div>
      </div>
    </div>
  );
}
