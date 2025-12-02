// src/data/misiones.ts

// 🎨 Colores de casillas del tablero
export type ColorKey = "rojo" | "amarillo" | "verde" | "azul" | "morado" | "naranjo";

// 🏪 Nombre de cada lugar según color
export const PLACES: Record<ColorKey, string> = {
  rojo: "Supermercado",
  amarillo: "Feria",
  verde: "Panadería",
  azul: "Banco",
  morado: "Almacén",
  naranjo: "Librería",
};

// 🔢 Dificultad de la misión
export type MissionDifficulty = "basico" | "intermedio" | "avanzado";

// ➕➖✖️ Tipo de cálculo principal
export type MissionKind = "suma" | "resta" | "multiplicacion" | "mixta";

// 📝 Misión del juego
export type Mission = {
  id: string;
  color: ColorKey;
  title: string;        // título corto
  description: string;  // enunciado que verá el estudiante
  price: number;        // monto que debe construir con billetes y monedas
  level: MissionDifficulty;
  kind: MissionKind;
};

// =====================================================
// LISTA DE MISIONES (puedes agregar más cuando quieras)
// =====================================================

export const MISSIONS: Mission[] = [
  // ======== NIVEL BÁSICO (sumas simples / multiplicaciones muy fáciles) ========

  // Supermercado (rojo)
  {
    id: "sup-basico-1",
    color: "rojo",
    title: "Colación en el supermercado",
    description:
      "En el supermercado compras un jugo de $800 y unas galletas de $700. ¿Cuánto debes pagar en total? Construye ese monto con billetes y monedas.",
    price: 1500,
    level: "basico",
    kind: "suma",
  },

  // Feria (amarillo)
  {
    id: "fer-basico-1",
    color: "amarillo",
    title: "Frutas en la feria",
    description:
      "Compras 3 manzanas que cuestan $200 cada una. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 600,
    level: "basico",
    kind: "multiplicacion",
  },

  // Panadería (verde)
  {
    id: "pan-basico-1",
    color: "verde",
    title: "Pan para el desayuno",
    description:
      "Compras 2 panes que cuestan $500 cada uno. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 1000,
    level: "basico",
    kind: "multiplicacion",
  },

  // Banco (azul)
  {
    id: "ban-basico-1",
    color: "azul",
    title: "Depósito simple",
    description:
      "Depositas $2.000 para ahorro y $1.500 para emergencias. ¿Cuánto dinero depositas en total?",
    price: 3500,
    level: "basico",
    kind: "suma",
  },

  // Almacén (morado)
  {
    id: "alm-basico-1",
    color: "morado",
    title: "Compra en el almacén",
    description:
      "En el almacén compras una bebida de $900 y unas papas fritas de $600. ¿Cuánto pagas en total?",
    price: 1500,
    level: "basico",
    kind: "suma",
  },

  // Librería (naranjo)
  {
    id: "lib-basico-1",
    color: "naranjo",
    title: "Útiles escolares",
    description:
      "Compras un cuaderno de $1.200 y un lápiz de $800. ¿Cuánto dinero gastas en total?",
    price: 2000,
    level: "basico",
    kind: "suma",
  },

  // ======== NIVEL INTERMEDIO (sumas + restas tipo “vuelto”) ========

  // Supermercado (rojo)
  {
    id: "sup-int-1",
    color: "rojo",
    title: "Compra grande en el súper",
    description:
      "En el supermercado gastas $3.800 y pagas con un billete de $10.000. ¿Cuánto vuelto debes recibir? Construye SOLO el vuelto con billetes y monedas.",
    price: 6200, // 10.000 - 3.800
    level: "intermedio",
    kind: "resta",
  },

  // Feria (amarillo)
  {
    id: "fer-int-1",
    color: "amarillo",
    title: "Verduras frescas",
    description:
      "En la feria gastas $1.200 en verduras y pagas con $2.000. ¿Cuánto es el vuelto que deben darte?",
    price: 800, // 2.000 - 1.200
    level: "intermedio",
    kind: "resta",
  },

  // Panadería (verde)
  {
    id: "pan-int-1",
    color: "verde",
    title: "Panes y queques",
    description:
      "En la panadería gastas $2.750 en pan y pasteles, y pagas con $5.000. ¿Cuánto es el vuelto?",
    price: 2250, // 5.000 - 2.750
    level: "intermedio",
    kind: "resta",
  },

  // Banco (azul)
  {
    id: "ban-int-1",
    color: "azul",
    title: "Retiro de efectivo",
    description:
      "Tienes $5.000 en tu cuenta y retiras $1.200 para gastos. ¿Cuánto queda en la cuenta? Construye el monto que queda.",
    price: 3800, // 5.000 - 1.200
    level: "intermedio",
    kind: "resta",
  },

  // Almacén (morado)
  {
    id: "alm-int-1",
    color: "morado",
    title: "Compras del barrio",
    description:
      "En el almacén gastas $2.750 y pagas con $5.000. ¿Cuánto vuelto debes recibir?",
    price: 2250, // 5.000 - 2.750
    level: "intermedio",
    kind: "resta",
  },

  // Librería (naranjo)
  {
    id: "lib-int-1",
    color: "naranjo",
    title: "Pack de útiles",
    description:
      "Compras materiales por $3.250 y pagas con $8.000. ¿Cuánto es el vuelto?",
    price: 4750, // 8.000 - 3.250
    level: "intermedio",
    kind: "resta",
  },

  // ======== NIVEL AVANZADO (combinan suma, resta y multiplicación) ========

  // Supermercado (rojo)
  {
    id: "sup-adv-1",
    color: "rojo",
    title: "Compra mensual",
    description:
      "En el supermercado compras 3 jugos de $1.200 cada uno y 2 cajas de cereal de $2.500 cada una. ¿Cuánto pagas en total?",
    price: 8600, // 3*1200 + 2*2500
    level: "avanzado",
    kind: "mixta",
  },

  // Feria (amarillo)
  {
    id: "fer-adv-1",
    color: "amarillo",
    title: "Carrito lleno",
    description:
      "Compras 2 sacos de papas de $1.500 cada uno y 3 kilos de tomate de $700 cada uno. ¿Cuánto gastas en total?",
    price: 5100, // 2*1500 + 3*700
    level: "avanzado",
    kind: "mixta",
  },

  // Panadería (verde)
  {
    id: "pan-adv-1",
    color: "verde",
    title: "Desayuno para todos",
    description:
      "Compras 2 baguettes de $800 cada una y 3 pasteles de $450 cada uno. ¿Cuánto gastas en total?",
    price: 2950, // 2*800 + 3*450
    level: "avanzado",
    kind: "mixta",
  },

  // Banco (azul)
  {
    id: "ban-adv-1",
    color: "azul",
    title: "Plan de ahorro",
    description:
      "Depositas dos veces $2.500 en tu cuenta y tres veces $1.200 en otra cuenta. Luego retiras $1.000. ¿Cuánto queda ahorrado en total?",
    price: 7600, // 2*2500 + 3*1200 - 1000
    level: "avanzado",
    kind: "mixta",
  },

  // Almacén (morado)
  {
    id: "alm-adv-1",
    color: "morado",
    title: "Stock para la semana",
    description:
      "Compras 3 paquetes de fideos de $800 cada uno y 2 frascos de salsa de $1.500 cada uno. ¿Cuánto gastas en total?",
    price: 5400, // 3*800 + 2*1500
    level: "avanzado",
    kind: "mixta",
  },

  // Librería (naranjo)
  {
    id: "lib-adv-1",
    color: "naranjo",
    title: "Lectura del mes",
    description:
      "Compras 2 libros de $4.500 cada uno y 3 cuadernos de $1.200 cada uno. ¿Cuánto gastas en total?",
    price: 12600, // 2*4500 + 3*1200
    level: "avanzado",
    kind: "mixta",
  },
];

// =====================================================
//   Seleccionar una misión al azar según color y nivel
// =====================================================
export function getRandomMission(
  color: ColorKey,
  level?: MissionDifficulty
): Mission {
  let candidates = MISSIONS.filter((m) => m.color === color);

  if (level) {
    const byLevel = candidates.filter((m) => m.level === level);
    if (byLevel.length > 0) {
      candidates = byLevel;
    }
  }

  // si por algún motivo no hay ninguna, vuelve a toda la lista de ese color
  if (candidates.length === 0) {
    candidates = MISSIONS.filter((m) => m.color === color);
  }

  const idx = Math.floor(Math.random() * candidates.length);
  return candidates[idx];
}
