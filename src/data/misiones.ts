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
  spent?: number; //cuánto se descuenta de la billetera (GASTO REAL)
};

// =====================================================
// LISTA DE MISIONES (puedes agregar más cuando quieras)
// =====================================================

export const MISSIONS: Mission[] = [
  // ======== NIVEL BÁSICO (sumas y restas simples) ========

  // 🟥 Supermercado (rojo)
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
  {
    id: "sup-basico-2",
    color: "rojo",
    title: "Vuelto simple en el supermercado",
    description:
      "En el supermercado compras un snack que cuesta $500 y pagas con $1.000. Construye el vuelto con billetes y monedas.",
    price: 500, // 1000 - 500
    level: "basico",
    kind: "resta",
  },

  {
    id: "sup-basico-3",
    color: "rojo",
    title: "Compra de un yogurt",
    description:
      "En el supermercado compras un yogurt que cuesta $450. Construye el monto con billetes y monedas.",
    price: 450,
    level: "basico",
    kind: "suma",
  },
  {
    id: "sup-basico-4",
    color: "rojo",
    title: "Compra de una barra de cereal",
    description:
      "Compras una barra de cereal que cuesta $600. Construye ese monto usando billetes y monedas.",
    price: 600,
    level: "basico",
    kind: "suma",
  },

  {
    id: "sup-basico-5",
    color: "rojo",
    title: "Dos productos para la once",
    description:
      "Compras una bebida de $700 y un paquete de galletas de $600. ¿Cuánto debes pagar en total? Construye ese monto con billetes y monedas.",
    price: 1300, // 700 + 600
    level: "basico",
    kind: "suma",
  },

  // 🟨 Feria (amarillo)
  {
    id: "fer-basico-1",
    color: "amarillo",
    title: "Frutas en la feria",
    description:
      "Compras 3 manzanas que cuestan $200 cada una. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 600, // 200 + 200 + 200
    level: "basico",
    kind: "suma",
  },
  {
    id: "fer-basico-2",
    color: "amarillo",
    title: "Compra de una manzana",
    description:
      "En la feria compras una manzana que cuesta $300. Construye el monto con billetes y monedas.",
    price: 300,
    level: "basico",
    kind: "suma",
  },
  {
    id: "fer-basico-3",
    color: "amarillo",
    title: "Vuelto en la feria",
    description:
      "Compras verduras por $900 y pagas con $1.500. Construye el vuelto con billetes y monedas.",
    price: 600, // 1500 - 900
    level: "basico",
    kind: "resta",
  },

  {
    id: "fer-basico-4",
    color: "amarillo",
    title: "Compra de un plátano",
    description:
      "En la feria compras un plátano que cuesta $200. Construye el monto con billetes y monedas.",
    price: 200,
    level: "basico",
    kind: "suma",
  },
  {
    id: "fer-basico-5",
    color: "amarillo",
    title: "Compra de una pera",
    description:
      "En la feria compras una pera que cuesta $350. Construye el monto con billetes y monedas.",
    price: 350,
    level: "basico",
    kind: "suma",
  },


  // 🟩 Panadería (verde)
  {
    id: "pan-basico-1",
    color: "verde",
    title: "Pan para el desayuno",
    description:
      "Compras 2 panes que cuestan $500 cada uno. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 1000, // 500 + 500
    level: "basico",
    kind: "suma",
  },
  {
    id: "pan-basico-2",
    color: "verde",
    title: "Pan y queque",
    description:
      "Compras pan por $600 y un queque por $700. ¿Cuánto debes pagar en total? Construye ese monto con billetes y monedas.",
    price: 1300, // 600 + 700
    level: "basico",
    kind: "suma",
  },
  {
    id: "pan-basico-3",
    color: "verde",
    title: "Vuelto en la panadería",
    description:
      "Compras pan por $800 y pagas con $1.500. Construye el vuelto con billetes y monedas.",
    price: 700, // 1500 - 800
    level: "basico",
    kind: "resta",
  },


  {
    id: "pan-basico-4",
    color: "verde",
    title: "Compra de un pan dulce",
    description:
      "En la panadería compras un pan dulce que cuesta $700. Construye el monto con billetes y monedas.",
    price: 700,
    level: "basico",
    kind: "suma",
  },
  {
    id: "pan-basico-5",
    color: "verde",
    title: "Compra de un queque",
    description:
      "En la panadería compras un queque que cuesta $900. Construye ese monto con billetes y monedas.",
    price: 900,
    level: "basico",
    kind: "suma",
  },


  // 🟪 Almacén (morado)
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
  {
    id: "alm-basico-2",
    color: "morado",
    title: "Dulces del almacén",
    description:
      "Compras un chocolate de $400 y un caramelo de $100. ¿Cuánto debes pagar en total? Construye ese monto con billetes y monedas.",
    price: 500, // 400 + 100
    level: "basico",
    kind: "suma",
  },

  {
    id: "alm-basico-3",
    color: "morado",
    title: "Compra de un helado",
    description:
      "En el almacén compras un helado que cuesta $500. Construye el monto con billetes y monedas.",
    price: 500,
    level: "basico",
    kind: "suma",
  },
  {
    id: "alm-basico-4",
    color: "morado",
    title: "Compra de unas galletas",
    description:
      "Compras unas galletas que cuestan $300. Construye el monto con billetes y monedas.",
    price: 300,
    level: "basico",
    kind: "suma",
  },

  // 🟧 Librería (naranjo)
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
  {
    id: "lib-basico-2",
    color: "naranjo",
    title: "Sticker y lápiz",
    description:
      "En la librería compras un set de stickers de $600 y un lápiz de $300. ¿Cuánto debes pagar en total? Construye ese monto con billetes y monedas.",
    price: 900, // 600 + 300
    level: "basico",
    kind: "suma",
  },

  {
    id: "lib-basico-3",
    color: "naranjo",
    title: "Compra de una goma",
    description:
      "En la librería compras una goma que cuesta $200. Construye el monto con billetes y monedas.",
    price: 200,
    level: "basico",
    kind: "suma",
  },
  {
    id: "lib-basico-4",
    color: "naranjo",
    title: "Compra de una regla",
    description:
      "Compras una regla que cuesta $500. Construye ese monto con billetes y monedas.",
    price: 500,
    level: "basico",
    kind: "suma",
  },


  // ======== NIVEL INTERMEDIO (sumas, restas y multiplicaciones sencillas) ========

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
  {
    id: "sup-int-2",
    color: "rojo",
    title: "Carrito de colaciones",
    description:
      "Compras una leche saborizada de $2.300 y unas galletas de $1.250. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 3550, // 2.300 + 1.250
    level: "intermedio",
    kind: "suma",
  },
  {
    id: "sup-int-3",
    color: "rojo",
    title: "Yogures para la semana",
    description:
      "Compras 3 yogures que cuestan $900 cada uno. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 2700, // 3 * 900
    level: "intermedio",
    kind: "multiplicacion",
  },

  {
    id: "sup-int-4",
    color: "rojo",
    title: "Snacks para la familia",
    description:
      "En el supermercado compras 4 paquetes de galletas que cuestan $750 cada uno. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 3000, // 4 * 750
    level: "intermedio",
    kind: "multiplicacion",
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
  {
    id: "fer-int-2",
    color: "amarillo",
    title: "Canasto de frutas",
    description:
      "Compras 2 bandejas de frutillas de $850 cada una y además 1 kilo de plátanos por $600. ¿Cuánto pagas en total?",
    price: 2300, // 2*850 + 600
    level: "intermedio",
    kind: "mixta",
  },
  {
    id: "fer-int-3",
    color: "amarillo",
    title: "Compra con vuelto",
    description:
      "En la feria gastas $1.750 y pagas con $4.000. ¿Cuánto vuelto recibes? Construye SOLO el vuelto con billetes y monedas.",
    price: 2250, // 4.000 - 1.750
    level: "intermedio",
    kind: "resta",
  },

  {
    id: "fer-int-4",
    color: "amarillo",
    title: "Kilos de naranjas",
    description:
      "En la feria compras 4 kilos de naranjas y cada kilo cuesta $650. ¿Cuánto pagas en total?",
    price: 2600, // 4 * 650
    level: "intermedio",
    kind: "multiplicacion",
  },
  {
    id: "fer-int-5",
    color: "amarillo",
    title: "Lechugas para la semana",
    description:
      "Compras 5 lechugas y cada una cuesta $300. ¿Cuánto gastas en total? Construye el monto con billetes y monedas.",
    price: 1500, // 5 * 300
    level: "intermedio",
    kind: "multiplicacion",
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
  {
    id: "pan-int-2",
    color: "verde",
    title: "Desayuno familiar",
    description:
      "Compras 2 marraquetas de $650 cada una y 3 berlines de $400 cada uno. ¿Cuánto pagas en total?",
    price: 2500, // 2*650 + 3*400
    level: "intermedio",
    kind: "mixta",
  },
  {
    id: "pan-int-3",
    color: "verde",
    title: "Compra con billete grande",
    description:
      "En la panadería gastas $2.870 y pagas con un billete de $5.000. ¿Cuánto vuelto debes recibir?",
    price: 2130, // 5.000 - 2.870
    level: "intermedio",
    kind: "resta",
  },

  {
    id: "pan-int-4",
    color: "verde",
    title: "Dobladitas para todos",
    description:
      "Compras 4 dobladitas y cada una cuesta $550. ¿Cuánto pagas en total?",
    price: 2200, // 4 * 550
    level: "intermedio",
    kind: "multiplicacion",
  },
  {
    id: "pan-int-5",
    color: "verde",
    title: "Hallullas calentitas",
    description:
      "Compras 6 hallullas y cada una cuesta $200. ¿Cuánto pagas en total? Construye el monto con billetes y monedas.",
    price: 1200, // 6 * 200
    level: "intermedio",
    kind: "multiplicacion",
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
  {
    id: "alm-int-2",
    color: "morado",
    title: "Colación de la tarde",
    description:
      "Compras 2 bebidas de $950 cada una y un paquete de galletas de $700. ¿Cuánto gastas en total?",
    price: 2600, // 2*950 + 700
    level: "intermedio",
    kind: "mixta",
  },
  {
    id: "alm-int-3",
    color: "morado",
    title: "Compra con cambio",
    description:
      "En el almacén gastas $1.860 y pagas con $4.000. ¿Cuánto vuelto debes recibir?",
    price: 2140, // 4.000 - 1.860
    level: "intermedio",
    kind: "resta",
  },


  {
    id: "alm-int-4",
    color: "morado",
    title: "Jugos individuales",
    description:
      "En el almacén compras 3 jugos en caja y cada uno cuesta $700. ¿Cuánto gastas en total?",
    price: 2100, // 3 * 700
    level: "intermedio",
    kind: "multiplicacion",
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
  {
    id: "lib-int-2",
    color: "naranjo",
    title: "Set de escritura",
    description:
      "Compras 2 cuadernos de $1.800 cada uno y un lápiz de $900. ¿Cuánto pagas en total?",
    price: 4500, // 2*1.800 + 900
    level: "intermedio",
    kind: "mixta",
  },
  {
    id: "lib-int-3",
    color: "naranjo",
    title: "Compra con vuelto en librería",
    description:
      "En la librería gastas $2.740 y pagas con $6.000. ¿Cuánto vuelto debes recibir?",
    price: 3260, // 6.000 - 2.740
    level: "intermedio",
    kind: "resta",
  },

  {
    id: "lib-int-4",
    color: "naranjo",
    title: "Lápices de colores",
    description:
      "Compras 4 lápices de colores y cada uno cuesta $350. ¿Cuánto pagas en total?",
    price: 1400, // 4 * 350
    level: "intermedio",
    kind: "multiplicacion",
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

  {
    id: "sup-adv-2",
    color: "rojo",
    title: "Compras para la semana",
    description:
      "Compras 4 yogures de $650 cada uno y 3 cajas de té de $1.800 cada una. Luego aplican un descuento de $500 por cliente frecuente. ¿Cuánto pagas en total?",
    price: (4 * 650) + (3 * 1800) - 500, // 2600 + 5400 - 500 = 7500
    level: "avanzado",
    kind: "mixta",
  },

  {
    id: "sup-adv-3",
    color: "rojo",
    title: "Preparando una fiesta",
    description:
      "Compras 5 bebidas de $1.100 cada una y 12 paquetes de vasos de $300 cada uno. ¿Cuánto gastas en total?",
    price: (5 * 1100) + (12 * 300), // 5500 + 3600 = 9100
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

  {
    id: "fer-adv-2",
    color: "amarillo",
    title: "Verduras para la semana",
    description:
      "Compras 4 kilos de zanahorias a $700 cada kilo y 2 kilos de pimentones a $1.200 cada kilo. Luego te hacen un descuento de $300 por llevar más de 5 kilos. ¿Cuánto pagas?",
    price: (4 * 700) + (2 * 1200) - 300, // 2800 + 2400 - 300 = 4900
    level: "avanzado",
    kind: "mixta",
  },

  {
    id: "fer-adv-3",
    color: "amarillo",
    title: "Mix de frutas",
    description:
      "Compras 3 kilos de frutillas a $1.500 cada kilo y 4 bandejas de uvas a $1.200 cada una. ¿Cuánto gastas en total?",
    price: (3 * 1500) + (4 * 1200), // 4500 + 4800 = 9300
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

  {
    id: "pan-adv-2",
    color: "verde",
    title: "Desayuno familiar",
    description:
      "Compras 5 marraquetas de $200 cada una, 2 pasteles de $1.000 cada uno y 3 empanadas de $900 cada una. ¿Cuánto gastas en total?",
    price: (5 * 200) + (2 * 1000) + (3 * 900), // 1000 + 2000 + 2700 = 5700
    level: "avanzado",
    kind: "mixta",
  },

  {
    id: "pan-adv-3",
    color: "verde",
    title: "Pedido especial",
    description:
      "Compras 2 queques de $2.800 cada uno y 12 panes dulces de $250 cada uno. Luego te descuentan $400 por compra grande. ¿Cuánto pagas al final?",
    price: (2 * 2800) + (12 * 250) - 400, // 5600 + 3000 - 400 = 8200
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

  {
    id: "alm-adv-2",
    color: "morado",
    title: "Compras para la tarde",
    description:
      "Compras 4 bebidas de $900 cada una y 6 barras de cereal de $450 cada una. ¿Cuánto gastas en total?",
    price: (4 * 900) + (6 * 450), // 3600 + 2700 = 6300
    level: "avanzado",
    kind: "mixta",
  },


  {
    id: "alm-adv-3",
    color: "morado",
    title: "Pedido variado",
    description:
      "Compras 2 bolsas de arroz de $1.300 cada una, 3 paquetes de fideos de $800 cada uno y 5 sopas instantáneas de $400 cada una. ¿Cuánto es el total?",
    price: (2 * 1300) + (3 * 800) + (5 * 400),
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

  {
    id: "lib-adv-2",
    color: "naranjo",
    title: "Material escolar avanzado",
    description:
      "Compras 3 lápices de $600 cada uno, un set de marcadores por $3.200 y 2 blocks de dibujo de $1.800 cada uno. ¿Cuánto gastas en total?",
    price: (3 * 600) + 3200 + (2 * 1800), // 1800 + 3200 + 3600 = 8600
    level: "avanzado",
    kind: "mixta",
  },

  {
    id: "lib-adv-3",
    color: "naranjo",
    title: "Trabajo de arte",
    description:
      "Compras 4 témperas de $850 cada una, 2 pinceles de $1.100 cada uno y cartulina por $700. ¿Cuánto gastas en total?",
    price: (4 * 850) + (2 * 1100) + 700, // 3400 + 2200 + 700 = 6300
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
