// src/data/dinero.ts

// Claves con denominación. 101 = $100 antigua; 100 = $100 nueva.
export type DenKey =
  | "10" | "50" | "100" | "101" | "500"
  | "1000" | "2000" | "5000" | "10000" | "20000";

// Valor numérico de cada denominación (CLP)
export const DEN_VALUE: Record<DenKey, number> = {
  "10": 10,
  "50": 50,
  "100": 100,   // $100 nueva
  "101": 100,   // $100 antigua
  "500": 500,
  "1000": 1000,
  "2000": 2000,
  "5000": 5000,
  "10000": 10000,
  "20000": 20000,
};

// Orden útil para mostrar en UI (de mayor a menor)
export const DEN_ORDER: DenKey[] = [
  "20000", "10000", "5000", "2000", "1000",
  "500", "101", "100", "50", "10",
];

// Billetera = cuántas unidades hay de cada denominación
export type Wallet = Record<DenKey, number>;

// Billetera inicial por jugador (monto total: $73.050)
export const INITIAL_WALLET: Wallet = {
  "20000": 1,   // 1 × 20000
  "10000": 2,   // 2 × 10000
  "5000": 3,    // 3 × 5000
  "2000": 4,    // 4 × 2000
  "1000": 5,    // 5 × 1000
  "500": 6,     // 6 × 500
  "101": 7,     // 7 × $100 antigua
  "100": 8,     // 8 × $100 nueva
  "50": 9,      // 9 × 50
  "10": 10,     // 10 × 10
};

// Total de una billetera (suma CLP)
export function walletTotal(w: Wallet): number {
  return (Object.keys(w) as DenKey[]).reduce(
    (acc, k) => acc + DEN_VALUE[k] * (w[k] ?? 0),
    0
  );
}

// Ajustar en +1 / -1 (o cualquier delta) una denominación, sin caer bajo 0
export function adjustWallet(w: Wallet, den: DenKey, delta: number): Wallet {
  const next = { ...w };
  const current = next[den] ?? 0;
  const updated = current + delta;
  next[den] = updated < 0 ? 0 : updated;
  return next;
}
