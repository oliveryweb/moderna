export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductDetails {
  productId: string;
  fullDescription: string;
  origin: string;
  harvest: string;
  acidity: string;
  polyphenols: string;
  images: string[];
  tastingNotes: {
    aroma: string[];
    palate: string[];
    finish: string[];
  };
  pairings: string[];
  storageInstructions: string;
  nutritionalInfo: {
    caloriesPer100ml: number;
    fat: string;
    protein: string;
    carbohydrates: string;
  };
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "María García",
    rating: 5,
    title: "Excelente combinación",
    comment: "El combo de Olei & Co. es perfecto para regalar. La calidad del aceite y el balsámico es excepcional. La presentación es muy elegante.",
    date: "2026-03-10",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "Carlos López",
    rating: 5,
    title: "Producto premium",
    comment: "Compré este combo para mi esposa y quedó encantada. El sabor es muy refinado y la bolsita de tela es un detalle muy lindo.",
    date: "2026-03-05",
    verified: true,
  },
  {
    id: "r3",
    productId: "1",
    author: "Ana Martínez",
    rating: 4,
    title: "Muy bueno, recomendado",
    comment: "Buen producto, aunque esperaba un poco más de intensidad en el sabor. Aun así, es de muy buena calidad.",
    date: "2026-02-28",
    verified: true,
  },
  {
    id: "r4",
    productId: "2",
    author: "Roberto Fernández",
    rating: 5,
    title: "Aceite de calidad superior",
    comment: "El Mediterráneo de Oliovita es mi favorito. Suave, delicado, perfecto para ensaladas y pescado. Excelente relación precio-calidad.",
    date: "2026-03-08",
    verified: true,
  },
  {
    id: "r5",
    productId: "2",
    author: "Sofía Rodríguez",
    rating: 5,
    title: "Sabor impecable",
    comment: "Llevo años comprando este aceite. Nunca decepciona. El sabor es consistente y la calidad siempre está garantizada.",
    date: "2026-02-20",
    verified: true,
  },
  {
    id: "r6",
    productId: "3",
    author: "Diego Sánchez",
    rating: 4,
    title: "Buen equilibrio",
    comment: "El Clásico de Oliovita es versátil. Funciona bien para cocinar y también para terminar platos. Muy recomendado.",
    date: "2026-03-01",
    verified: true,
  },
  {
    id: "r7",
    productId: "4",
    author: "Lucía Pérez",
    rating: 5,
    title: "Intenso y delicioso",
    comment: "El Extra Virgen de Tupelí es muy intenso, justo como me gusta. Perfecto para pan tostado y platos que necesiten un sabor robusto.",
    date: "2026-03-07",
    verified: true,
  },
  {
    id: "r8",
    productId: "5",
    author: "Javier Moreno",
    rating: 5,
    title: "Aceite gourmet",
    comment: "Laur es un aceite de verdadera calidad gourmet. Se nota el cuidado en cada detalle. Vale cada peso invertido.",
    date: "2026-02-25",
    verified: true,
  },
  {
    id: "r9",
    productId: "13",
    author: "Patricia Ruiz",
    rating: 5,
    title: "Premium en su máxima expresión",
    comment: "La Vasija de Olei & Co. es espectacular. Un aceite de colección. Ideal para ocasiones especiales o para los verdaderos amantes del buen aceite.",
    date: "2026-03-06",
    verified: true,
  },
  {
    id: "r10",
    productId: "18",
    author: "Martín Gómez",
    rating: 5,
    title: "Regalo perfecto",
    comment: "Compré la Jarra de Olei & Co. como regalo y fue un éxito. Presentación impecable, aceite de excelente calidad y la bolsita de tela es un detalle muy considerado.",
    date: "2026-03-03",
    verified: true,
  },
];

export const productDetails: Record<string, ProductDetails> = {
  "1": {
    productId: "1",
    fullDescription:
      "El Dúo Vasija de Olei & Co. es una combinación perfecta para los amantes del buen aceite. Incluye un aceite de oliva virgen extra de excelente calidad y un aceto balsámico reducción artesanal. Este combo viene presentado en una elegante bolsita de tela de transporte, ideal para regalar o para llevar contigo a cualquier lugar.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.3%",
    polyphenols: "280 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/duo_97972f89.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olei-aceto_bf6a6a84.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olei_e77857a5.webp",
    ],
    tastingNotes: {
      aroma: ["hierba fresca", "almendra", "manzana verde"],
      palate: ["suave", "cremoso", "equilibrado"],
      finish: ["persistente", "elegante"],
    },
    pairings: [
      "Ensaladas frescas",
      "Pescado a la parrilla",
      "Quesos suaves",
      "Pan tostado",
      "Verduras asadas",
    ],
    storageInstructions:
      "Guardar en lugar fresco y oscuro, alejado de la luz directa. Temperatura ideal entre 14°C y 18°C. Consumir dentro de 2 años de la cosecha.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "2": {
    productId: "2",
    fullDescription:
      "El Mediterráneo de Oliovita es un aceite de oliva virgen extra suave y delicado, perfecto para quienes buscan un sabor refinado sin intensidad. Elaborado con aceitunas Arbequina seleccionadas, este aceite destaca por su cremosidad y versatilidad en la cocina.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.2%",
    polyphenols: "200 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/oliovita-mediterraneo_435db871.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/oliovita_f398bb1a.png",
    ],
    tastingNotes: {
      aroma: ["manteca", "almendra dulce", "flores blancas"],
      palate: ["suave", "cremoso", "delicado"],
      finish: ["limpio", "prolongado"],
    },
    pairings: [
      "Ensaladas delicadas",
      "Pescado blanco",
      "Cremas y sopas",
      "Postres salados",
      "Frutas",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Ideal entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "3": {
    productId: "3",
    fullDescription:
      "El Clásico de Oliovita es un aceite de oliva virgen extra equilibrado y versátil, perfecto para cualquier ocasión. Elaborado con una cuidadosa selección de aceitunas, ofrece un sabor armónico que complementa cualquier plato.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.22%",
    polyphenols: "220 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/oliovita-clasico_713144f6.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/oliovita_f398bb1a.png",
    ],
    tastingNotes: {
      aroma: ["hierba suave", "almendra", "frutal"],
      palate: ["equilibrado", "fresco", "afrutado"],
      finish: ["limpio", "persistente"],
    },
    pairings: [
      "Ensaladas variadas",
      "Carnes blancas",
      "Verduras",
      "Pastas",
      "Quesos suaves",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Ideal entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "4": {
    productId: "4",
    fullDescription:
      "El Extra Virgen de Tupelí es un aceite robusto y herbáceo elaborado con aceitunas Coratina de Mendoza. Destaca por su intensidad de sabor y sus notas herbáceas características, perfectas para quienes buscan un aceite con personalidad.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.25%",
    polyphenols: "350 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/tupeli-250_21dba7f6.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/coratina_final_8fd68cc8.png",
    ],
    tastingNotes: {
      aroma: ["hierba cortada", "almendra verde", "pimienta"],
      palate: ["intenso", "herbáceo", "picante"],
      finish: ["persistente", "robusto"],
    },
    pairings: [
      "Pan tostado",
      "Carnes rojas",
      "Vegetales asados",
      "Sopas de verdura",
      "Quesos fuertes",
    ],
    storageInstructions:
      "Guardar en lugar oscuro y fresco. Temperatura óptima entre 12°C y 16°C. Consumir dentro de 2 años.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "5": {
    productId: "5",
    fullDescription:
      "Laur es un aceite de oliva virgen extra premium de Mendoza, reconocido internacionalmente como uno de los mejores del mundo. Elaborado con aceitunas Picual seleccionadas, ofrece un perfil complejo y sofisticado.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.15%",
    polyphenols: "420 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/laur_9f8ecdb2.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/picual_final_dad62050.png",
    ],
    tastingNotes: {
      aroma: ["hierba aromática", "almendra", "tomate verde"],
      palate: ["potente", "mineral", "complejo"],
      finish: ["largo", "persistente"],
    },
    pairings: [
      "Carnes premium",
      "Pescados nobles",
      "Verduras asadas",
      "Quesos curados",
      "Platos gourmet",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco y oscuro. Temperatura entre 12°C y 16°C. Consumir dentro de 3 años.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "6": {
    productId: "6",
    fullDescription:
      "La Coratina de Familia Zuccardi es un aceite robusto y complejo, elaborado con la variedad Coratina de Mendoza. Destaca por su intensidad y sus notas especiadas características.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.24%",
    polyphenols: "360 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/coratina_final_8fd68cc8.png",
    ],
    tastingNotes: {
      aroma: ["hierba, especias, almendra"],
      palate: ["robusto", "especiado", "complejo"],
      finish: ["persistente", "intenso"],
    },
    pairings: [
      "Carnes rojas",
      "Quesos fuertes",
      "Vegetales asados",
      "Platos con especias",
    ],
    storageInstructions:
      "Guardar en lugar oscuro y fresco. Temperatura óptima entre 12°C y 16°C. Consumir dentro de 2 años.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "7": {
    productId: "7",
    fullDescription:
      "La Genovesa de Familia Zuccardi es un aceite elegante y frutal, elaborado con la variedad Genovesa. Ofrece un perfil sofisticado con notas frutales delicadas.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.23%",
    polyphenols: "240 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/genovesa_final_bea8324b.png",
    ],
    tastingNotes: {
      aroma: ["frutal", "almendra", "flores"],
      palate: ["elegante", "frutal", "equilibrado"],
      finish: ["limpio", "prolongado"],
    },
    pairings: [
      "Pescado blanco",
      "Ensaladas frescas",
      "Quesos suaves",
      "Verduras delicadas",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Temperatura entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "8": {
    productId: "8",
    fullDescription:
      "La Picual de Familia Zuccardi es un aceite potente y mineral, elaborado con la variedad Picual. Destaca por su complejidad y sus notas herbáceas intensas.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.2%",
    polyphenols: "400 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/picual_final_dad62050.png",
    ],
    tastingNotes: {
      aroma: ["hierba, mineral, almendra"],
      palate: ["potente", "mineral", "herbáceo"],
      finish: ["largo", "persistente"],
    },
    pairings: [
      "Carnes rojas",
      "Quesos curados",
      "Vegetales asados",
      "Platos gourmet",
    ],
    storageInstructions:
      "Guardar en lugar oscuro y fresco. Temperatura óptima entre 12°C y 16°C. Consumir dentro de 2 años.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "9": {
    productId: "9",
    fullDescription:
      "El Original de Zuelo es un aceite fresco y afrutado, elaborado con una cuidadosa selección de aceitunas. Ofrece un sabor versátil y equilibrado.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.21%",
    polyphenols: "260 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/zuelo-original_183e460d.png",
    ],
    tastingNotes: {
      aroma: ["frutal", "hierba", "almendra"],
      palate: ["fresco", "afrutado", "equilibrado"],
      finish: ["limpio", "persistente"],
    },
    pairings: [
      "Ensaladas",
      "Pescado",
      "Verduras",
      "Pastas",
      "Quesos suaves",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Ideal entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "10": {
    productId: "10",
    fullDescription:
      "El Blend Doña Sofía de Hilal es un aceite suave y mantecoso, perfecto para quienes buscan un sabor delicado y accesible. Elaborado con una selección de aceitunas.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.19%",
    polyphenols: "180 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/hilal_6946bcd0.png",
    ],
    tastingNotes: {
      aroma: ["manteca", "almendra dulce"],
      palate: ["suave", "mantecoso", "accesible"],
      finish: ["limpio", "suave"],
    },
    pairings: [
      "Ensaladas delicadas",
      "Pescado blanco",
      "Cremas",
      "Frutas",
      "Pan",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Ideal entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "13": {
    productId: "13",
    fullDescription:
      "La Vasija de Olei & Co. es un aceite premium y elegante, elaborado con una selección cuidadosa de aceitunas. Ofrece un perfil complejo y sofisticado, ideal para ocasiones especiales.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.28%",
    polyphenols: "300 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olei-500_55627a04.png",
    ],
    tastingNotes: {
      aroma: ["hierba fresca", "almendra", "frutal"],
      palate: ["complejo", "herbáceo", "elegante"],
      finish: ["persistente", "sofisticado"],
    },
    pairings: [
      "Carnes premium",
      "Pescados nobles",
      "Quesos curados",
      "Platos gourmet",
      "Ocasiones especiales",
    ],
    storageInstructions:
      "Guardar en lugar fresco y oscuro, alejado de la luz directa. Temperatura ideal entre 14°C y 18°C. Consumir dentro de 2 años de la cosecha.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "16": {
    productId: "16",
    fullDescription:
      "El Premium de El Mistol es un aceite robusto y complejo, elaborado con una selección premium de aceitunas. Destaca por su intensidad y sus notas complejas.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.26%",
    polyphenols: "370 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/Mistol_53b8c7b1.png",
    ],
    tastingNotes: {
      aroma: ["hierba, especias, almendra"],
      palate: ["robusto", "complejo", "intenso"],
      finish: ["persistente", "premium"],
    },
    pairings: [
      "Carnes rojas",
      "Quesos fuertes",
      "Vegetales asados",
      "Platos con especias",
    ],
    storageInstructions:
      "Guardar en lugar oscuro y fresco. Temperatura óptima entre 12°C y 16°C. Consumir dentro de 2 años.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "17": {
    productId: "17",
    fullDescription:
      "El Blend Doña Sofía de Hilal en formato de 1 litro es un aceite suave y mantecoso, perfecto para uso diario. Elaborado con una selección de aceitunas, ofrece excelente relación precio-calidad.",
    origin: "Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.19%",
    polyphenols: "180 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/hilal-1L_b8e26996.png",
    ],
    tastingNotes: {
      aroma: ["manteca", "almendra dulce"],
      palate: ["suave", "mantecoso", "accesible"],
      finish: ["limpio", "suave"],
    },
    pairings: [
      "Ensaladas",
      "Pescado",
      "Cremas",
      "Verduras",
      "Pan",
      "Uso diario",
    ],
    storageInstructions:
      "Conservar en botella oscura en lugar fresco. Ideal entre 14°C y 18°C. Consumir dentro de 18 meses.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
  "18": {
    productId: "18",
    fullDescription:
      "La Jarra de Olei & Co. es un aceite premium presentado en una elegante jarra, ideal para regalar. Elaborado con una selección cuidadosa de aceitunas, ofrece un perfil equilibrado y sofisticado.",
    origin: "Mendoza, Argentina",
    harvest: "Cosecha temprana 2025",
    acidity: "0.3%",
    polyphenols: "290 mg/kg",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663036843124/5qNoZ6BSow9hmxvii2Jssp/olei-500_55627a04.png",
    ],
    tastingNotes: {
      aroma: ["hierba fresca", "almendra", "manzana verde"],
      palate: ["elegante", "equilibrado", "premium"],
      finish: ["persistente", "sofisticado"],
    },
    pairings: [
      "Ensaladas frescas",
      "Pescado a la parrilla",
      "Quesos suaves",
      "Pan tostado",
      "Verduras asadas",
    ],
    storageInstructions:
      "Guardar en lugar fresco y oscuro, alejado de la luz directa. Temperatura ideal entre 14°C y 18°C. Consumir dentro de 2 años de la cosecha.",
    nutritionalInfo: {
      caloriesPer100ml: 884,
      fat: "99.8g",
      protein: "0g",
      carbohydrates: "0g",
    },
  },
};
