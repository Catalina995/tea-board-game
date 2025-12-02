// src/components/WalletSummary.tsx
import { DEN_VALUE, type Wallet } from "../data/dinero";

export default function WalletSummary({ wallet }: { wallet: Wallet }) {
  const entries = Object.entries(wallet)
    .map(([k, v]) => ({ den: k, qty: v as number, val: DEN_VALUE[k as keyof typeof DEN_VALUE] }))
    .filter((e) => e.qty > 0)
    // ordenar de mayor a menor valor
    .sort((a, b) => b.val - a.val);

  return (
    <div className="w-full max-w-xl rounded-xl bg-white shadow p-3">
      <div className="text-sm font-semibold mb-2">Billetera del jugador</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
        {entries.map((e) => (
          <div
            key={e.den}
            className="border rounded-lg px-2 py-1 flex items-center justify-between"
            title={`$${e.val.toLocaleString("es-CL")}`}
          >
            <span className="text-gray-600">${e.val.toLocaleString("es-CL")}</span>
            <span className="font-semibold">× {e.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
