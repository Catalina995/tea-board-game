// src/data/pawnIcons.ts

export type PawnIcon = {
  id: string;
  label: string;
  src: string;
};

// Usa las mismas imágenes que ya tienes en MonedasChile
export const PAWN_ICONS: PawnIcon[] = [
  {
    id: "coin-500",
    label: "Moneda $500",
    src: "/img/monedas/500.png",
  },
  {
    id: "coin-100",
    label: "Moneda $100",
    src: "/img/monedas/100.png",
  },
  {
    id: "coin-50",
    label: "Moneda $50",
    src: "/img/monedas/50.png",
  },
  {
    id: "bill-1000",
    label: "Billete $1.000",
    src: "/img/billetes/1000.jpg",
  },
  {
    id: "bill-2000",
    label: "Billete $2.000",
    src: "/img/billetes/2000.jpg",
  },
  {
    id: "bill-5000",
    label: "Billete $5.000",
    src: "/img/billetes/5000.jpg",
  },
];
