import cervezasData from "./Cervezas.json";

// Complete multilingual menu data for Bierwinkel Elche
// This file exports structured menu data with translations for es, en, fr, de

export const supportedLanguages = ["es", "en", "fr", "de"];

// Helper to get localized text
export const getLocalizedText = (textObj, lang) => {
  if (typeof textObj === "string") return textObj;
  return textObj?.[lang] || textObj?.es || textObj || "";
};

// Category translations
const categories = {
  BOTTLE_BEERS: { es: "Cervezas de botella", en: "Bottled beers", fr: "Bieres en bouteille", de: "Flaschenbiere" },
  DRAFT_BEERS: { es: "Cervezas de barril", en: "Draft beers", fr: "Bieres pression", de: "Fassbiere" },
  GLUTEN_FREE_BEERS: { es: "Cervezas sin gluten", en: "Gluten-free beers", fr: "Bieres sans gluten", de: "Glutenfreie Biere" },
  NON_ALCOHOLIC_BEERS: { es: "Cervezas sin alcohol", en: "Non-alcoholic beers", fr: "Bieres sans alcool", de: "Alkoholfreie Biere" },
  LAMBIC_FRUIT_BEERS: { es: "Cervezas Lambic y frutas", en: "Lambic and fruit beers", fr: "Bieres Lambic et aux fruits", de: "Lambic und Fruchtbiere" },
  CIDERS: { es: "Sidras", en: "Ciders", fr: "Cidres", de: "Cider" },
  WINES: { es: "Vinos", en: "Wines", fr: "Vins", de: "Weine" },
  LIQUORS: { es: "Licores / Cubatas / Otros", en: "Liquors / Cocktails / Others", fr: "Liqueurs / Cocktails / Autres", de: "Spirituosen / Cocktails / Andere" },
  SOFT_DRINKS: { es: "Zumos y refrescos", en: "Juices and soft drinks", fr: "Jus et boissons fraiches", de: "Safte und Erfrischungsgetranke" },
  TEAS: { es: "Infusiones y tes", en: "Infusions and teas", fr: "Infusions et thes", de: "Aufgusse und Tees" },
  APPETIZERS: { es: "Aperitivos", en: "Appetizers", fr: "Aperitifs", de: "Vorspeisen" },
  SALADS: { es: "Ensaladas", en: "Salads", fr: "Salades", de: "Salate" },
  BURGERS: { es: "Hamburguesas", en: "Burgers", fr: "Hamburgers", de: "Burger" },
  HOT_DOGS: { es: "Perritos", en: "Hot dogs", fr: "Hot dogs", de: "Hot Dogs" },
  GERMAN_SPECIALTIES: { es: "Salchichas y especialidades alemanas", en: "Sausages and German specialties", fr: "Saucisses et specialites allemandes", de: "Wurstchen und deutsche Spezialitaten" },
  DESSERTS: { es: "Postres", en: "Desserts", fr: "Desserts", de: "Nachspeisen" },
  MENUS: { es: "Menus completos", en: "Full menus", fr: "Menus complets", de: "Komplette Menus" }
};

// Serving types translations
const servingTypes = {
  glass: { es: "Cana", en: "Glass", fr: "Verre", de: "Glas" },
  mug: { es: "Jarra", en: "Mug", fr: "Chope", de: "Krug" },
  cup: { es: "Copa", en: "Cup", fr: "Coupe", de: "Kelch" },
  shot: { es: "Chupito", en: "Shot", fr: "Shot", de: "Schnaps" },
  bottle: { es: "Botella", en: "Bottle", fr: "Bouteille", de: "Flasche" }
};

// =====================
// DRINKS MENU
// =====================
export const normalizeKey = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const getSectionByMenu = (menuName) => {
  const target = normalizeKey(menuName);
  return (cervezasData?.secciones || []).find((section) => normalizeKey(section?.menu) === target) || null;
};

const drinkSectionIdByMenuKey = {
  cervezas_de_botella: "cervezas_botella",
  cervezas_de_barril: "cervezas_barril",
  cervezas_sin_gluten: "cervezas_sin_gluten",
  cervezas_sin_alcohol: "cervezas_sin_alcohol",
  cervezas_lambic_y_frutas: "cervezas_frutas",
  sidras: "sidras",
  vinos: "vinos",
  licores_cubatas_otros: "licores",
  infusiones_y_tes: "infusiones",
  zumos_y_refrescos: "refrescos"
};

const getDrinkSectionId = (menuName) => {
  const menuKey = normalizeKey(menuName);
  return drinkSectionIdByMenuKey[menuKey] || menuKey;
};

const buildDrinkItemId = (sectionId, productName, fallbackId) => {
  const normalizedName = normalizeKey(productName);
  const normalizedFallback = normalizeKey(fallbackId);
  const baseId = normalizedName || normalizedFallback || "item";
  return `${sectionId}_${baseId}`;
};

const buildDescription = (product) => {
  const description = String(product?.descripcion || "").trim();
  if (description) return description;

  const parts = [product?.origen, product?.graduacion].filter(Boolean);
  if (parts.length > 0) return parts.join(". ");
  return null;
};

const buildPrices = (product) => {
  const prices = product?.precios && typeof product.precios === "object" ? product.precios : null;
  if (!prices) return [];

  const mapped = [];
  const cana = toNumber(prices.cana_33cl ?? prices.cana);
  const jarra = toNumber(prices.jarra_50cl);
  const copa = toNumber(prices.copa);
  const chupito = toNumber(prices.chupito);

  if (cana !== null) {
    mapped.push({
      type: servingTypes.glass,
      volume: prices.cana_33cl !== undefined ? "33cl" : null,
      price: cana
    });
  }
  if (jarra !== null) {
    mapped.push({
      type: servingTypes.mug,
      volume: "50cl",
      price: jarra
    });
  }
  if (copa !== null) {
    mapped.push({
      type: servingTypes.cup,
      price: copa
    });
  }
  if (chupito !== null) {
    mapped.push({
      type: servingTypes.shot,
      price: chupito
    });
  }
  return mapped;
};

const buildItemFromProduct = (product, sectionId, fallbackId) => {
  const item = {
    id: buildDrinkItemId(sectionId, product?.nombre, fallbackId),
    name: product?.nombre || "",
    description: buildDescription(product)
  };

  const price = toNumber(product?.precio_eur);
  const prices = buildPrices(product);

  if (price !== null) {
    item.price = price;
    return item;
  }

  if (prices.length === 1 && !prices[0].volume) {
    item.price = prices[0].price;
    return item;
  }

  if (prices.length > 0) {
    item.prices = prices;
    return item;
  }

  item.price = null;
  return item;
};

const getSectionItems = (menuName) => {
  const section = getSectionByMenu(menuName);
  if (!section) return [];
  const sectionId = getDrinkSectionId(menuName);

  return (section.categorias || []).flatMap((category, categoryIndex) =>
    (category.productos || []).map((product, productIndex) =>
      buildItemFromProduct(product, sectionId, `item_${categoryIndex + 1}_${productIndex + 1}`)
    )
  );
};

const buildGroupedSection = (menuName) => {
  const section = getSectionByMenu(menuName);
  if (!section) return [];
  const sectionId = getDrinkSectionId(menuName);

  return (section.categorias || []).map((category, index) => ({
    id: normalizeKey(category?.nombre || `group_${index + 1}`),
    category: category?.nombre || `Grupo ${index + 1}`,
    items: (category.productos || []).map((product, productIndex) =>
      buildItemFromProduct(product, sectionId, `item_${index + 1}_${productIndex + 1}`)
    )
  }));
};

const bottleGroups = buildGroupedSection("CERVEZAS DE BOTELLA");

export const drinksMenu = {
  bottleBeers: {
    category: categories.BOTTLE_BEERS,
    groups: bottleGroups,
    items: bottleGroups.flatMap((group) => group.items)
  },
  draftBeers: {
    category: categories.DRAFT_BEERS,
    items: getSectionItems("CERVEZAS DE BARRIL")
  },
  glutenFreeBeers: {
    category: categories.GLUTEN_FREE_BEERS,
    items: getSectionItems("CERVEZAS SIN GLUTEN")
  },
  nonAlcoholicBeers: {
    category: categories.NON_ALCOHOLIC_BEERS,
    items: getSectionItems("CERVEZAS SIN ALCOHOL")
  },
  fruitBeers: {
    category: categories.LAMBIC_FRUIT_BEERS,
    items: getSectionItems("CERVEZAS LAMBIC Y FRUTAS")
  },
  ciders: {
    category: categories.CIDERS,
    items: getSectionItems("SIDRAS")
  },
  wines: {
    category: categories.WINES,
    items: getSectionItems("VINOS")
  },
  liquors: {
    category: categories.LIQUORS,
    items: getSectionItems("LICORES / CUBATAS / OTROS")
  },
  teas: {
    category: categories.TEAS,
    items: getSectionItems("INFUSIONES Y TES")
  },
  softDrinks: {
    category: categories.SOFT_DRINKS,
    items: getSectionItems("ZUMOS Y REFRESCOS")
  }
};

// =====================
// FOOD MENU
// =====================
export const foodMenu = {
  appetizers: {
    category: categories.APPETIZERS,
    items: [
      { id: "aros_cebolla", name: { es: "Aros de cebolla", en: "Onion rings", fr: "Rondelles d'oignon", de: "Zwiebelringe" }, price: 4.80, description: { es: "Acompanados de salsa barbacoa. 8 uds", en: "Served with BBQ sauce. 8 pcs", fr: "Accompagnes de sauce barbecue. 8 pcs", de: "Mit BBQ-Sauce serviert. 8 Stuck" } },
      { id: "biernacker", name: "Biernacker", price: 4.95, description: { es: "Salchicha seca y pepinillos", en: "Dry sausage and pickles", fr: "Saucisse seche et cornichons", de: "Trockene Wurst und Gurken" } },
      { id: "currywurst", name: "Currywurst", price: 5.95, description: { es: "Salchicha Thuringer con salsa curry", en: "Thuringer sausage with curry sauce", fr: "Saucisse Thuringer avec sauce curry", de: "Thuringer Wurst mit Currysauce" } },
      { id: "plato_queso", name: { es: "Plato de queso", en: "Cheese plate", fr: "Assiette de fromages", de: "Kaseteller" }, price: 6.25, description: { es: "Queso manchego y queso ahumado frances", en: "Manchego cheese and French smoked cheese", fr: "Fromage manchego et fromage fume francais", de: "Manchego-Kase und franzosischer Raucherkase" } },
      { id: "delicias_pollo", name: { es: "Delicias de pollo", en: "Chicken tenders", fr: "Delices de poulet", de: "Huhnchen-Leckerbissen" }, price: 5.45, description: { es: "Jugosas tiras de pollo rebozado con salsa barbacoa", en: "Juicy breaded chicken strips with BBQ sauce", fr: "Delicieuses lanières de poulet panees avec sauce barbecue", de: "Saftige panierte Huhnchenstreifen mit BBQ-Sauce" } },
      { id: "croquetas_queso", name: { es: "Croquetas de queso", en: "Cheese croquettes", fr: "Croquettes de fromage", de: "Kasekroketten" }, price: 5.25, description: { es: "Con confitura de arandanos. 6 uds", en: "With blueberry jam. 6 pcs", fr: "Avec confiture de myrtilles. 6 pcs", de: "Mit Blaubeermarmelade. 6 Stuck" } },
      { id: "camembert_frito", name: { es: "Camembert frito", en: "Fried Camembert", fr: "Camembert frit", de: "Frittierter Camembert" }, price: 7.85, description: { es: "Con confitura de arandanos", en: "With blueberry jam", fr: "Avec confiture de myrtilles", de: "Mit Blaubeermarmelade" } },
      { id: "chips_huevo_bacon", name: { es: "Chips huevo y bacon", en: "Egg and bacon chips", fr: "Frites oeuf et bacon", de: "Pommes mit Ei und Speck" }, price: 6.45, description: { es: "Hechas con patatas fritas de baston", en: "Made with french fries", fr: "Faites avec des frites", de: "Mit Pommes frites" } },
      { id: "chips_cheddar_bacon", name: { es: "Chips cheddar y bacon", en: "Cheddar and bacon chips", fr: "Frites cheddar et bacon", de: "Pommes mit Cheddar und Speck" }, price: 6.35, description: { es: "Hechas con patatas fritas de baston", en: "Made with french fries", fr: "Faites avec des frites", de: "Mit Pommes frites" } },
      { id: "patatas_bravas", name: { es: "Patatas bravas", en: "Bravas potatoes", fr: "Patatas bravas", de: "Patatas bravas" }, price: 5.75, description: { es: "Las de toda la vida. Pidelas tambien con alioli", en: "The classic ones. Also available with aioli", fr: "Les classiques. Demandez-les aussi avec l'aioli", de: "Die klassischen. Auch mit Aioli erhaltlich" } },
      { id: "tabla_campanard", name: { es: "Tabla campanard", en: "Campanard platter", fr: "Planche campanard", de: "Campanard-Platte" }, price: 7.55, description: { es: "Patatas gajo a las siete salsas", en: "Potato wedges with seven sauces", fr: "Pommes de terre en quartiers aux sept sauces", de: "Kartoffelecken mit sieben Saucen" } },
      { id: "nachos_cheese", name: { es: "Nachos cheese", en: "Cheese nachos", fr: "Nachos fromage", de: "Kase-Nachos" }, price: 5.25, description: { es: "Triangulitos de cheddar acompanados de guacamole", en: "Cheddar triangles served with guacamole", fr: "Triangles de cheddar accompagnes de guacamole", de: "Cheddar-Dreiecke mit Guacamole" } },
      { id: "tabla_pate_quesos", name: { es: "Tabla de pate y quesos", en: "Pate and cheese board", fr: "Planche de pate et fromages", de: "Pastete- und Kaseplatte" }, price: 14.45, description: { es: "Seleccion de quesos y pate", en: "Selection of cheeses and pate", fr: "Selection de fromages et pate", de: "Auswahl an Kase und Pastete" } }
    ]
  },
  salads: {
    category: categories.SALADS,
    items: [
      { id: "ensalada_templada", name: { es: "Ensalada templada", en: "Warm salad", fr: "Salade tiede", de: "Lauwarmer Salat" }, price: 7.75, description: { es: "Mix de ensalada, tomate, bacon a la plancha, cebolla crujiente. Aderezada con crema balsamica", en: "Mixed greens, tomato, grilled bacon, crispy onion. Dressed with balsamic cream", fr: "Melange de salade, tomate, bacon grille, oignon croustillant. Assaisonnee de creme balsamique", de: "Salatmischung, Tomate, gegrillter Speck, knusprige Zwiebeln. Mit Balsamico-Creme angerichtet" } },
      { id: "ensalada_pollo", name: { es: "Ensalada de pollo", en: "Chicken salad", fr: "Salade de poulet", de: "Huhnchensalat" }, price: 7.95, description: { es: "Mix de ensalada, tomate, pollo a la plancha. Aderezada con salsa cesar", en: "Mixed greens, tomato, grilled chicken. Dressed with Caesar sauce", fr: "Melange de salade, tomate, poulet grille. Assaisonnee de sauce cesar", de: "Salatmischung, Tomate, gegrilltes Huhnchen. Mit Caesar-Sauce angerichtet" } },
      { id: "ensalada_queso_feta", name: { es: "Ensalada de queso feta", en: "Feta cheese salad", fr: "Salade au fromage feta", de: "Fetakase-Salat" }, price: 7.25, description: { es: "Mix de ensalada, tomate, queso feta. Aderezada con vinagreta de la casa", en: "Mixed greens, tomato, feta cheese. Dressed with house vinaigrette", fr: "Melange de salade, tomate, fromage feta. Assaisonnee de vinaigrette maison", de: "Salatmischung, Tomate, Fetakase. Mit Hausvinaigrette angerichtet" } },
      { id: "ensalada_ventresca", name: { es: "Ensalada de ventresca", en: "Tuna belly salad", fr: "Salade de ventresca", de: "Thunfischbauch-Salat" }, price: 9.45, description: { es: "Ventresca, tomate y frutos secos. Aderezada con crema balsamica", en: "Tuna belly, tomato and nuts. Dressed with balsamic cream", fr: "Ventresca, tomate et fruits secs. Assaisonnee de creme balsamique", de: "Thunfischbauch, Tomate und Nusse. Mit Balsamico-Creme angerichtet" } }
    ]
  },
  burgers: {
    category: categories.BURGERS,
    items: [
      { id: "hamburguesa_ternera", name: { es: "Hamburguesa ternera", en: "Beef burger", fr: "Hamburger boeuf", de: "Rindfleisch-Burger" }, price: 8.90, description: { es: "Hamburguesa de ternera de 125gr. Mix lechugas, tomate, queso cheddar. Acompanada de patatas fritas", en: "125g beef burger. Mixed lettuce, tomato, cheddar cheese. Served with fries", fr: "Hamburger de boeuf de 125g. Melange de laitues, tomate, fromage cheddar. Accompagne de frites", de: "125g Rindfleisch-Burger. Salatmischung, Tomate, Cheddar-Kase. Mit Pommes frites" } },
      { id: "hamburguesa_buey", name: { es: "Hamburguesa buey", en: "Ox burger", fr: "Hamburger boeuf aged", de: "Ochsen-Burger" }, price: 11.90, description: { es: "Hamburguesa de buey de 200gr. Mix lechugas, tomate, queso cheddar. Acompanada de patatas fritas", en: "200g ox burger. Mixed lettuce, tomato, cheddar cheese. Served with fries", fr: "Hamburger de boeuf de 200g. Melange de laitues, tomate, fromage cheddar. Accompagne de frites", de: "200g Ochsen-Burger. Salatmischung, Tomate, Cheddar-Kase. Mit Pommes frites" } },
      { id: "hamburguesa_angus", name: { es: "Hamburguesa angus", en: "Angus burger", fr: "Hamburger Angus", de: "Angus-Burger" }, price: 11.90, description: { es: "Hamburguesa Angus de 200gr. Mix lechugas, tomate, queso cheddar. Acompanada de patatas fritas", en: "200g Angus burger. Mixed lettuce, tomato, cheddar cheese. Served with fries", fr: "Hamburger Angus de 200g. Melange de laitues, tomate, fromage cheddar. Accompagne de frites", de: "200g Angus-Burger. Salatmischung, Tomate, Cheddar-Kase. Mit Pommes frites" } },
      { id: "hamburguesa_pollo", name: { es: "Hamburguesa pollo", en: "Chicken burger", fr: "Hamburger poulet", de: "Huhnchen-Burger" }, price: 8.75, description: { es: "Hamburguesa de pollo de 125gr. Mix lechugas, tomate, queso cheddar. Acompanada de patatas fritas", en: "125g chicken burger. Mixed lettuce, tomato, cheddar cheese. Served with fries", fr: "Hamburger de poulet de 125g. Melange de laitues, tomate, fromage cheddar. Accompagne de frites", de: "125g Huhnchen-Burger. Salatmischung, Tomate, Cheddar-Kase. Mit Pommes frites" } }
    ],
    modifiers: [
      { id: "extra_huevo", name: { es: "Anadir huevo", en: "Add egg", fr: "Ajouter oeuf", de: "Ei hinzufugen" }, price: 1.0 },
      { id: "extra_bacon", name: { es: "Anadir bacon", en: "Add bacon", fr: "Ajouter bacon", de: "Speck hinzufugen" }, price: 1.0 }
    ]
  },
  hotDogs: {
    category: categories.HOT_DOGS,
    items: [
      { id: "perrito_caliente", name: { es: "Perrito caliente", en: "Hot dog", fr: "Hot dog", de: "Hot Dog" }, price: 7.45, description: { es: "Salchicha frankfurt, pepinillo aleman y cebolla crujiente. Acompanado de patatas fritas", en: "Frankfurt sausage, German pickle and crispy onion. Served with fries", fr: "Saucisse de Francfort, cornichon allemand et oignon croustillant. Accompagne de frites", de: "Frankfurter Wurst, deutsche Gurke und knusprige Zwiebeln. Mit Pommes frites" } }
    ]
  },
  germanSpecialties: {
    category: categories.GERMAN_SPECIALTIES,
    sausageTypes: [
      { id: "bockwurst_ahumada", name: { es: "Bockwurst ahumada", en: "Smoked Bockwurst", fr: "Bockwurst fumee", de: "Geraucher Bockwurst" } },
      { id: "thuringer_especiada", name: { es: "Thüringer especiada", en: "Spiced Thuringer", fr: "Thuringer epicee", de: "Gewurzte Thuringer" } },
      { id: "rindswurst_ternera", name: { es: "Rindswurst de ternera", en: "Beef Rindswurst", fr: "Rindswurst de boeuf", de: "Rindswurst" } },
      { id: "hungara_picante", name: { es: "Hungara picante", en: "Spicy Hungarian", fr: "Hongroise piquante", de: "Scharfe Ungarische" } }
    ],
    sideOptions: [
      { id: "patatas_fritas", name: { es: "Patatas fritas", en: "French fries", fr: "Frites", de: "Pommes frites" } },
      { id: "pure_patatas", name: { es: "Pure de patatas", en: "Mashed potatoes", fr: "Puree de pommes de terre", de: "Kartoffelpuree" } },
      { id: "chucrut", name: { es: "Chucrut", en: "Sauerkraut", fr: "Choucroute", de: "Sauerkraut" } }
    ],
    items: [
      { id: "plato_salchicha_alemana", name: { es: "Plato salchicha alemana (a elegir)", en: "German sausage plate (choice)", fr: "Assiette de saucisse allemande (au choix)", de: "Deutscher Wurstteller (nach Wahl)" }, price: 7.90, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix (frites, puree de pommes de terre ou choucroute)", de: "Salatmischung und Beilage nach Wahl (Pommes, Kartoffelpuree oder Sauerkraut)" } },
      { id: "plato_salchicha_hungara_picante", name: { es: "Plato salchicha hungara picante", en: "Spicy Hungarian sausage plate", fr: "Assiette de saucisse hongroise piquante", de: "Scharfer ungarischer Wurstteller" }, price: 8.85, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix (frites, puree de pommes de terre ou choucroute)", de: "Salatmischung und Beilage nach Wahl (Pommes, Kartoffelpuree oder Sauerkraut)" } },
      { id: "plato_sugerencia_2_salchichas", name: { es: "Plato sugerencia (2 salchichas a elegir)", en: "Suggestion plate (2 sausages of choice)", fr: "Assiette suggestion (2 saucisses au choix)", de: "Vorschlagsteller (2 Wurstchen nach Wahl)" }, price: 14.80, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix (frites, puree de pommes de terre ou choucroute)", de: "Salatmischung und Beilage nach Wahl (Pommes, Kartoffelpuree oder Sauerkraut)" } },
      { id: "tabla_hamburgo_4_salchichas", name: { es: "Tabla Hamburgo (4 salchichas a elegir)", en: "Hamburg platter (4 sausages of choice)", fr: "Planche Hambourg (4 saucisses au choix)", de: "Hamburger Platte (4 Wurstchen nach Wahl)" }, price: 27.25, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix (frites, puree de pommes de terre ou choucroute)", de: "Salatmischung und Beilage nach Wahl (Pommes, Kartoffelpuree oder Sauerkraut)" } },
      { id: "tabla_campanard_y_algo_mas", name: { es: "Tabla campanard y algo mas", en: "Campanard platter and more", fr: "Planche campanard et plus", de: "Campanard-Platte und mehr" }, price: 10.45, description: { es: "Patatas gajo y salchicha bockwurst a las siete salsas", en: "Potato wedges and bockwurst sausage with seven sauces", fr: "Pommes de terre en quartiers et saucisse bockwurst aux sept sauces", de: "Kartoffelecken und Bockwurst mit sieben Saucen" } },
      { id: "frikadellen", name: "Frikadellen", price: 9.95, description: { es: "Albondigas de carne especiada al estilo aleman. Acompanado de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "German-style spiced meat patties. Served with salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Boulettes de viande epicee a l'allemande. Accompagnees de salade et accompagnement au choix (frites, puree ou choucroute)", de: "Deutsche gewurzte Fleischpflanzerl. Mit Salat und Beilage nach Wahl (Pommes, Kartoffelpuree oder Sauerkraut)" } },
      { id: "codillo_de_cerdo", name: { es: "Codillo de cerdo", en: "Pork knuckle", fr: "Jarret de porc", de: "Schweinshaxe" }, price: 17.75, description: { es: "Hecho al horno al estilo aleman. Acompanado de ensalada, pure de patatas y chucrut", en: "Oven-baked German style. Served with salad, mashed potatoes and sauerkraut", fr: "Cuit au four a l'allemande. Accompagne de salade, puree de pommes de terre et choucroute", de: "Im deutschen Stil im Ofen gebacken. Mit Salat, Kartoffelpuree und Sauerkraut" } }
    ]
  },
  desserts: {
    category: categories.DESSERTS,
    items: [
      { id: "tarta_chocolate", name: { es: "Tarta de chocolate", en: "Chocolate cake", fr: "Tarte au chocolat", de: "Schokoladenkuchen" }, price: 5.75 },
      { id: "tarta_manzana", name: { es: "Tarta de manzana", en: "Apple pie", fr: "Tarte aux pommes", de: "Apfelkuchen" }, price: 5.45 }
    ]
  }
};

// =====================
// FULL MENUS
// =====================
export const fullMenus = {
  category: categories.MENUS,
  currency: "EUR",
  menus: [
    {
      id: "menu_basic",
      name: { es: "Menu Basic", en: "Basic Menu", fr: "Menu Basic", de: "Basic-Menu" },
      price: 15.90,
      includes: [
        {
          type: "starter_choice",
          name: { es: "Entrante a elegir", en: "Starter of your choice", fr: "Entree au choix", de: "Vorspeise nach Wahl" },
          options: [
            { id: "ensalada_pollo", name: { es: "Ensalada de pollo", en: "Chicken salad", fr: "Salade de poulet", de: "Huhnchensalat" } },
            { id: "ensalada_queso_feta", name: { es: "Ensalada de queso feta", en: "Feta cheese salad", fr: "Salade au fromage feta", de: "Fetakase-Salat" } },
            { id: "aros_cebolla", name: { es: "Aros de cebolla", en: "Onion rings", fr: "Rondelles d'oignon", de: "Zwiebelringe" } },
            { id: "delicias_pollo", name: { es: "Delicias de pollo", en: "Chicken tenders", fr: "Delices de poulet", de: "Huhnchen-Leckerbissen" } },
            { id: "camembert_frito", name: { es: "Camembert frito", en: "Fried Camembert", fr: "Camembert frit", de: "Frittierter Camembert" } }
          ]
        },
        {
          type: "main_choice",
          name: { es: "Plato de salchicha a elegir", en: "Sausage dish of your choice", fr: "Plat de saucisse au choix", de: "Wurstgericht nach Wahl" },
          options: [
            { id: "bockwurst_ahumada", name: { es: "Bockwurst ahumada", en: "Smoked Bockwurst", fr: "Bockwurst fumee", de: "Geraucher Bockwurst" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } },
            { id: "thuringer_especiada", name: { es: "Thüringer especiada", en: "Spiced Thuringer", fr: "Thuringer epicee", de: "Gewurzte Thuringer" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } },
            { id: "hungara_picante", name: { es: "Hungara picante", en: "Spicy Hungarian", fr: "Hongroise piquante", de: "Scharfe Ungarische" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } },
            { id: "rindswurst_ternera", name: { es: "Rindswurst de ternera", en: "Beef Rindswurst", fr: "Rindswurst de boeuf", de: "Rindswurst" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } }
          ]
        },
        {
          type: "drink_included",
          name: { es: "1 bebida incluida", en: "1 drink included", fr: "1 boisson incluse", de: "1 Getrank inklusive" },
          options: [
            { id: "agua", name: { es: "Agua", en: "Water", fr: "Eau", de: "Wasser" } },
            { id: "refresco", name: { es: "Refresco", en: "Soft drink", fr: "Boisson gazeuse", de: "Erfrischungsgetrank" } },
            { id: "copa_vino", name: { es: "Copa de vino", en: "Glass of wine", fr: "Verre de vin", de: "Glas Wein" } },
            { id: "cerveza_sin_alcohol", name: { es: "Cerveza sin alcohol", en: "Non-alcoholic beer", fr: "Biere sans alcool", de: "Alkoholfreies Bier" } },
            { id: "jarra_lager", name: { es: "Jarra de cerveza lager", en: "Lager beer mug", fr: "Chope de biere lager", de: "Lagerbier-Krug" } }
          ]
        }
      ]
    },
    {
      id: "menu_privaat",
      name: { es: "Menu Privaat", en: "Privaat Menu", fr: "Menu Privaat", de: "Privaat-Menu" },
      price: 18.95,
      includes: [
        {
          type: "starter_choice",
          name: { es: "Entrante a elegir", en: "Starter of your choice", fr: "Entree au choix", de: "Vorspeise nach Wahl" },
          options: [
            { id: "ensalada_pollo", name: { es: "Ensalada de pollo", en: "Chicken salad", fr: "Salade de poulet", de: "Huhnchensalat" } },
            { id: "ensalada_queso_feta", name: { es: "Ensalada de queso feta", en: "Feta cheese salad", fr: "Salade au fromage feta", de: "Fetakase-Salat" } },
            { id: "aros_cebolla", name: { es: "Aros de cebolla", en: "Onion rings", fr: "Rondelles d'oignon", de: "Zwiebelringe" } },
            { id: "delicias_pollo", name: { es: "Delicias de pollo", en: "Chicken tenders", fr: "Delices de poulet", de: "Huhnchen-Leckerbissen" } },
            { id: "croquetas_queso", name: { es: "Croquetas de queso", en: "Cheese croquettes", fr: "Croquettes de fromage", de: "Kasekroketten" } }
          ]
        },
        {
          type: "main_choice",
          name: { es: "Plato especialidad a elegir", en: "Specialty dish of your choice", fr: "Plat de specialite au choix", de: "Spezialitat nach Wahl" },
          options: [
            { id: "plato_sugerencia_2_salchichas", name: { es: "Plato sugerencia (2 salchichas a elegir)", en: "Suggestion plate (2 sausages of choice)", fr: "Assiette suggestion (2 saucisses au choix)", de: "Vorschlagsteller (2 Wurstchen nach Wahl)" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } },
            { id: "frikadellen_menu", name: "Frikadellen", description: { es: "Albondigas de carne especiada al estilo aleman. Acompanado de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "German-style spiced meat patties. Served with salad and side of your choice", fr: "Boulettes de viande epicee a l'allemande. Accompagnees de salade et accompagnement au choix", de: "Deutsche gewurzte Fleischpflanzerl. Mit Salat und Beilage nach Wahl" } }
          ]
        },
        {
          type: "drink_included",
          name: { es: "1 bebida incluida", en: "1 drink included", fr: "1 boisson incluse", de: "1 Getrank inklusive" },
          options: [
            { id: "agua", name: { es: "Agua", en: "Water", fr: "Eau", de: "Wasser" } },
            { id: "refresco", name: { es: "Refresco", en: "Soft drink", fr: "Boisson gazeuse", de: "Erfrischungsgetrank" } },
            { id: "copa_vino", name: { es: "Copa de vino", en: "Glass of wine", fr: "Verre de vin", de: "Glas Wein" } },
            { id: "cerveza_sin_alcohol", name: { es: "Cerveza sin alcohol", en: "Non-alcoholic beer", fr: "Biere sans alcool", de: "Alkoholfreies Bier" } },
            { id: "jarra_lager", name: { es: "Jarra de cerveza lager", en: "Lager beer mug", fr: "Chope de biere lager", de: "Lagerbier-Krug" } }
          ]
        }
      ]
    },
    {
      id: "menu_premium",
      name: { es: "Menu Premium", en: "Premium Menu", fr: "Menu Premium", de: "Premium-Menu" },
      price: 24.45,
      includes: [
        {
          type: "starter_choice",
          name: { es: "Entrante a elegir", en: "Starter of your choice", fr: "Entree au choix", de: "Vorspeise nach Wahl" },
          options: [
            { id: "ensalada_pollo", name: { es: "Ensalada de pollo", en: "Chicken salad", fr: "Salade de poulet", de: "Huhnchensalat" } },
            { id: "ensalada_queso_feta", name: { es: "Ensalada de queso feta", en: "Feta cheese salad", fr: "Salade au fromage feta", de: "Fetakase-Salat" } },
            { id: "aros_cebolla", name: { es: "Aros de cebolla", en: "Onion rings", fr: "Rondelles d'oignon", de: "Zwiebelringe" } },
            { id: "delicias_pollo", name: { es: "Delicias de pollo", en: "Chicken tenders", fr: "Delices de poulet", de: "Huhnchen-Leckerbissen" } },
            { id: "croquetas_queso", name: { es: "Croquetas de queso", en: "Cheese croquettes", fr: "Croquettes de fromage", de: "Kasekroketten" } }
          ]
        },
        {
          type: "main_choice",
          name: { es: "Plato especialidad a elegir", en: "Specialty dish of your choice", fr: "Plat de specialite au choix", de: "Spezialitat nach Wahl" },
          options: [
            { id: "plato_3_salchichas", name: { es: "Plato 3 salchichas", en: "3 sausages plate", fr: "Assiette 3 saucisses", de: "3 Wurstchen Teller" }, description: { es: "Mix de ensalada y guarnicion a elegir (patatas fritas, pure de patatas o chucrut)", en: "Mixed salad and side of your choice (fries, mashed potatoes or sauerkraut)", fr: "Melange de salade et accompagnement au choix", de: "Salatmischung und Beilage nach Wahl" } },
            { id: "codillo_cerdo_menu", name: { es: "Codillo de cerdo", en: "Pork knuckle", fr: "Jarret de porc", de: "Schweinshaxe" }, description: { es: "Hecho al horno al estilo aleman. Acompanado de ensalada, pure de patatas y chucrut", en: "Oven-baked German style. Served with salad, mashed potatoes and sauerkraut", fr: "Cuit au four a l'allemande. Accompagne de salade, puree de pommes de terre et choucroute", de: "Im deutschen Stil im Ofen gebacken. Mit Salat, Kartoffelpuree und Sauerkraut" } }
          ]
        },
        {
          type: "drink_included",
          name: { es: "1 bebida incluida", en: "1 drink included", fr: "1 boisson incluse", de: "1 Getrank inklusive" },
          options: [
            { id: "agua", name: { es: "Agua", en: "Water", fr: "Eau", de: "Wasser" } },
            { id: "refresco", name: { es: "Refresco", en: "Soft drink", fr: "Boisson gazeuse", de: "Erfrischungsgetrank" } },
            { id: "copa_vino", name: { es: "Copa de vino", en: "Glass of wine", fr: "Verre de vin", de: "Glas Wein" } },
            { id: "cerveza_sin_alcohol", name: { es: "Cerveza sin alcohol", en: "Non-alcoholic beer", fr: "Biere sans alcool", de: "Alkoholfreies Bier" } },
            { id: "jarra_lager", name: { es: "Jarra de cerveza lager", en: "Lager beer mug", fr: "Chope de biere lager", de: "Lagerbier-Krug" } }
          ]
        }
      ]
    }
  ]
};

// Allergen metadata
export const allergenMeta = {
  gluten:    { label: "Cereales con Gluten", symbol: "G",  img: "/alergenos/gluten.svg" },
  dairy:     { label: "Lácteos",             symbol: "L",  img: "/alergenos/dairy.svg" },
  eggs:      { label: "Huevos",              symbol: "H",  img: "/alergenos/eggs.svg" },
  nuts:      { label: "Frutos de cáscara",   symbol: "F",  img: "/alergenos/nuts.svg" },
  peanuts:   { label: "Cacahuetes",          symbol: "C",  img: "/alergenos/peanuts.svg" },
  soy:       { label: "Soja",                symbol: "S",  img: "/alergenos/soy.svg" },
  fish:      { label: "Pescado",             symbol: "P",  img: "/alergenos/fish.svg" },
  shellfish: { label: "Crustáceos",          symbol: "M",  img: "/alergenos/crustaceans.svg" },
  celery:    { label: "Apio",                symbol: "A",  img: "/alergenos/celery.svg" },
  mustard:   { label: "Mostaza",             symbol: "Mo", img: "/alergenos/mustard.svg" },
  sesame:    { label: "Granos de sésamo",    symbol: "Se", img: "/alergenos/sesame.svg" },
  sulphites: { label: "Dióxido de azufre y sulfitos", symbol: "Su", img: "/alergenos/sulphites.svg" },
  lupin:     { label: "Altramuces",          symbol: "Al", img: "/alergenos/lupin.svg" },
  molluscs:  { label: "Moluscos",            symbol: "Ml", img: "/alergenos/molluscs.svg" }
};

// Default allergens for food dishes (fallback when item doesn't define its own list)
const foodAllergensById = {
  aros_cebolla: ["gluten"],
  biernacker: ["mustard", "sulphites"],
  currywurst: ["mustard", "sulphites"],
  plato_queso: ["dairy"],
  delicias_pollo: ["gluten", "eggs"],
  croquetas_queso: ["gluten", "dairy", "eggs"],
  camembert_frito: ["gluten", "dairy", "eggs"],
  chips_huevo_bacon: ["eggs"],
  chips_cheddar_bacon: ["dairy"],
  patatas_bravas: [],
  tabla_campanard: ["mustard", "eggs"],
  nachos_cheese: ["dairy"],
  tabla_pate_quesos: ["dairy", "sulphites"],
  ensalada_templada: ["gluten", "sulphites"],
  ensalada_pollo: ["dairy", "eggs", "fish", "mustard"],
  ensalada_queso_feta: ["dairy", "sulphites"],
  ensalada_ventresca: ["fish", "nuts", "sulphites"],
  hamburguesa_ternera: ["gluten", "dairy", "mustard"],
  hamburguesa_buey: ["gluten", "dairy", "mustard"],
  hamburguesa_angus: ["gluten", "dairy", "mustard"],
  hamburguesa_pollo: ["gluten", "dairy", "mustard"],
  extra_huevo: ["eggs"],
  extra_bacon: [],
  perrito_caliente: ["gluten", "mustard", "sulphites"],
  plato_salchicha_alemana: ["mustard", "sulphites"],
  plato_salchicha_hungara_picante: ["mustard", "sulphites"],
  plato_sugerencia_2_salchichas: ["mustard", "sulphites"],
  tabla_hamburgo_4_salchichas: ["mustard", "sulphites"],
  tabla_campanard_y_algo_mas: ["mustard", "sulphites", "eggs"],
  frikadellen: ["gluten", "eggs", "mustard"],
  codillo_de_cerdo: ["mustard", "sulphites"],
  tarta_chocolate: ["gluten", "dairy", "eggs"],
  tarta_manzana: ["gluten", "dairy", "eggs"]
};

const featuredSausageIds = ["bockwurst_ahumada", "thuringer_especiada", "rindswurst_ternera"];

const formatPrices = (prices, lang) => {
  if (!prices || prices.length === 0) return null;
  if (prices.length === 1) return prices[0].price;

  return prices
    .map((p) => {
      const type = getLocalizedText(p.type, lang);
      const vol = p.volume ? ` ${p.volume}` : "";
      return `${type}${vol}: ${p.price.toFixed(2)}€`;
    })
    .join(" / ");
};

const formatMenuItem = (item, lang) => {
  const itemKey = item.id || (typeof item.name === "string" ? item.name : null);
  const fallbackAllergens = itemKey ? foodAllergensById[itemKey] : [];

  return {
    id: item.id || item.name,
    name: getLocalizedText(item.name, lang),
    price: item.price ?? (item.prices ? formatPrices(item.prices, lang) : null),
    note: getLocalizedText(item.description, lang) || null,
    allergens: item.allergens || fallbackAllergens || []
  };
};

export const getMenuSections = (lang) => {
  const sections = [];

  sections.push({
    id: "aperitivos",
    type: "food",
    category: getLocalizedText(foodMenu.appetizers.category, lang),
    items: foodMenu.appetizers.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "ensaladas",
    type: "food",
    category: getLocalizedText(foodMenu.salads.category, lang),
    items: foodMenu.salads.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "hamburguesas",
    type: "food",
    category: getLocalizedText(foodMenu.burgers.category, lang),
    items: [
      ...foodMenu.burgers.items.map((item) => formatMenuItem(item, lang)),
      ...foodMenu.hotDogs.items.map((item) => formatMenuItem(item, lang)),
      ...foodMenu.burgers.modifiers.map((item) => ({
        ...formatMenuItem(item, lang),
        note: getLocalizedText(item.description, lang)
      }))
    ]
  });

  sections.push({
    id: "especialidades",
    type: "food",
    category: getLocalizedText(foodMenu.germanSpecialties.category, lang),
    availableSausages: foodMenu.germanSpecialties.sausageTypes
      .filter((item) => featuredSausageIds.includes(item.id))
      .map((item) => getLocalizedText(item.name, lang)),
    items: foodMenu.germanSpecialties.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "postres",
    type: "food",
    category: getLocalizedText(foodMenu.desserts.category, lang),
    items: foodMenu.desserts.items.map((item) => formatMenuItem(item, lang))
  });

  const bottleBeerGroups = (drinksMenu.bottleBeers.groups || []).map((group) => ({
    id: group.id,
    category: getLocalizedText(group.category, lang),
    items: (group.items || []).map((item) => formatMenuItem(item, lang))
  }));

  sections.push({
    id: "cervezas_botella",
    type: "drink",
    category: getLocalizedText(drinksMenu.bottleBeers.category, lang),
    items:
      bottleBeerGroups.length > 0
        ? bottleBeerGroups.flatMap((group) => group.items)
        : drinksMenu.bottleBeers.items.map((item) => formatMenuItem(item, lang)),
    groups: bottleBeerGroups.length > 0 ? bottleBeerGroups : undefined
  });

  sections.push({
    id: "cervezas_barril",
    type: "drink",
    category: getLocalizedText(drinksMenu.draftBeers.category, lang),
    items: drinksMenu.draftBeers.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "cervezas_sin_gluten",
    type: "drink",
    category: getLocalizedText(drinksMenu.glutenFreeBeers.category, lang),
    items: drinksMenu.glutenFreeBeers.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "cervezas_sin_alcohol",
    type: "drink",
    category: getLocalizedText(drinksMenu.nonAlcoholicBeers.category, lang),
    items: drinksMenu.nonAlcoholicBeers.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "cervezas_frutas",
    type: "drink",
    category: getLocalizedText(drinksMenu.fruitBeers.category, lang),
    items: drinksMenu.fruitBeers.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "sidras",
    type: "drink",
    category: getLocalizedText(drinksMenu.ciders.category, lang),
    items: drinksMenu.ciders.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "vinos",
    type: "drink",
    category: getLocalizedText(drinksMenu.wines.category, lang),
    items: drinksMenu.wines.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "licores",
    type: "drink",
    category: getLocalizedText(drinksMenu.liquors.category, lang),
    items: drinksMenu.liquors.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "infusiones",
    type: "drink",
    category: getLocalizedText(drinksMenu.teas.category, lang),
    items: drinksMenu.teas.items.map((item) => formatMenuItem(item, lang))
  });

  sections.push({
    id: "refrescos",
    type: "drink",
    category: getLocalizedText(drinksMenu.softDrinks.category, lang),
    items: drinksMenu.softDrinks.items.map((item) => formatMenuItem(item, lang))
  });

  return sections;
};

export const getCompleteMenus = (lang) => {
  return fullMenus.menus.map((menu) => ({
    id: menu.id,
    name: getLocalizedText(menu.name, lang),
    price: menu.price,
    sections: menu.includes.map((section) => ({
      id: section.type,
      name: getLocalizedText(section.name, lang),
      options: section.options.map((option) => ({
        id: option.id,
        name: getLocalizedText(option.name, lang),
        description: option.description ? getLocalizedText(option.description, lang) : null
      }))
    }))
  }));
};

/**
 * Returns products from any Cervezas.json section with generated IDs.
 * Use BEER_IMAGES in App.jsx (keyed by these IDs) to cross-reference photos.
 */
export const getDrinkCatalog = (menuName, sectionId) => {
  const section = getSectionByMenu(menuName);
  if (!section) return [];
  return (section.categorias || []).flatMap((category) =>
    (category.productos || []).map((product) => ({
      id: buildDrinkItemId(sectionId, product.nombre, ""),
      name: product.nombre || "",
      categoria: category.nombre || "",
      menuSection: sectionId,
      descripcion: product.descripcion || null,
      origen: product.origen || null,
      graduacion: product.graduacion || null,
      precio: product.precio_eur ?? null
    }))
  );
};

export const getBottleBeerCatalog = () =>
  getDrinkCatalog("CERVEZAS DE BOTELLA", "cervezas_botella");

// Export all
export default {
  allergenMeta,
  getMenuSections,
  getCompleteMenus,
  supportedLanguages,
  getLocalizedText,
  categories,
  servingTypes,
  drinksMenu,
  foodMenu,
  fullMenus
};
