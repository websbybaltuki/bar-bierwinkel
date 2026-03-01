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
export const drinksMenu = {
  bottleBeers: {
    category: categories.BOTTLE_BEERS,
    items: [
      // Pilsen / White beers
      { name: "Hoegaarden Blanca", price: 3.85, description: { es: "Blanca. Turbia. Aromatizada con cilantro. Belga. 5%", en: "White beer. Cloudy. Flavored with coriander. Belgian. 5%", fr: "Blanche. Trouble. Aromatisee a la coriandre. Belge. 5%", de: "Weissbier. Trub. Mit Koriander aromatisiert. Belgisch. 5%" } },
      { name: "Hoegaarden Grand Cru", price: 4.85, description: { es: "Turbia dorada. Strong Ale de baja fermentacion. Belga. 8,5%", en: "Golden cloudy. Low fermentation Strong Ale. Belgian. 8.5%", fr: "Doree trouble. Strong Ale de basse fermentation. Belge. 8,5%", de: "Goldtrub. Untergaring Strong Ale. Belgisch. 8,5%" } },
      { name: "Paulaner 50cl", price: 4.0, description: { es: "Turbia y dorada. Alemana. 5%", en: "Cloudy and golden. German. 5%", fr: "Trouble et doree. Allemande. 5%", de: "Trub und golden. Deutsch. 5%" } },
      // Porter & Stout
      { name: "Guinness Special Export", price: 5.2, description: { es: "Stout seca. Irlandesa elaborada al estilo belga. 8%", en: "Dry stout. Irish brewed in Belgian style. 8%", fr: "Stout seche. Irlandaise brassee a la belge. 8%", de: "Trockenes Stout. Irisch im belgischen Stil gebraut. 8%" } },
      { name: "Guinness Original", price: null, description: { es: "5% alc. 33cl", en: "5% alc. 33cl", fr: "5% alc. 33cl", de: "5% Alk. 33cl" } },
      { name: "Super Bock Stout", price: 4.5, description: { es: "Stout con cuerpo, dulce y poco amarga. Portuguesa. 5%", en: "Full-bodied stout, sweet and low bitterness. Portuguese. 5%", fr: "Stout corsee, douce et peu amere. Portugaise. 5%", de: "Vollmundiges Stout, suss und wenig bitter. Portugiesisch. 5%" } },
      // Specialties
      { name: "Barbar Bock Meca", price: 5.2, description: { es: "Oscura elaborada con miel. Belga. 8%", en: "Dark beer brewed with honey. Belgian. 8%", fr: "Brune brassee au miel. Belge. 8%", de: "Dunkelbier mit Honig gebraut. Belgisch. 8%" } },
      { name: "Delirium Red", price: 5.2, description: { es: "Cerveza fuerte con cerezas. Rojo oscuro. Belga. 8,5%", en: "Strong beer with cherries. Dark red. Belgian. 8.5%", fr: "Biere forte aux cerises. Rouge fonce. Belge. 8,5%", de: "Starkes Bier mit Kirschen. Dunkelrot. Belgisch. 8,5%" } },
      { name: "Delirium Tremens", price: 5.2, description: { es: "Dorada. Sabor dulce y final seco y alcoholico. Belga. 8,5%", en: "Golden. Sweet flavor with dry, alcoholic finish. Belgian. 8.5%", fr: "Doree. Saveur sucree et finale seche et alcoolisee. Belge. 8,5%", de: "Golden. Susser Geschmack mit trockenem, alkoholischem Abgang. Belgisch. 8,5%" } },
      { name: "Kasteel Donker", price: 4.85, description: { es: "Oscura y cremosa. Belga. 11%", en: "Dark and creamy. Belgian. 11%", fr: "Brune et cremeuse. Belge. 11%", de: "Dunkel und cremig. Belgisch. 11%" } },
      { name: "Kasteel Triple", price: 4.85, description: { es: "Estilo abadia triple. Ale. Dorada. Belga. 11%", en: "Triple abbey style. Ale. Golden. Belgian. 11%", fr: "Style abbaye triple. Ale. Doree. Belge. 11%", de: "Dreifacher Abteistil. Ale. Golden. Belgisch. 11%" } },
      { name: "Gulden Draak", price: 4.85, description: { es: "Tostada oscura triple. Muy fuerte. Belga. 10,5%", en: "Dark toasted triple. Very strong. Belgian. 10.5%", fr: "Triple brune grillee. Tres forte. Belge. 10,5%", de: "Dunkles gerostetes Tripel. Sehr stark. Belgisch. 10,5%" } },
      { name: "Gulden Draak 9000", price: 4.85, description: { es: "Ambar. Strong Ale. Belga. 10%", en: "Amber. Strong Ale. Belgian. 10%", fr: "Ambree. Strong Ale. Belge. 10%", de: "Bernstein. Strong Ale. Belgisch. 10%" } },
      { name: "Satan Gold", price: 4.85, description: { es: "Dorada. Belga. 8%", en: "Golden. Belgian. 8%", fr: "Doree. Belge. 8%", de: "Golden. Belgisch. 8%" } },
      { name: "Piraat", price: 4.85, description: { es: "Rubia muy fuerte. Belga. 10,5%", en: "Very strong blonde. Belgian. 10.5%", fr: "Blonde tres forte. Belge. 10,5%", de: "Sehr starkes Blondes. Belgisch. 10,5%" } },
      // Abbey beers
      { name: "Leffe Blonde", price: 4.0, description: { es: "Rubia. Belga. 6,6%", en: "Blonde. Belgian. 6.6%", fr: "Blonde. Belge. 6,6%", de: "Blond. Belgisch. 6,6%" } },
      { name: "Leffe Brune", price: 4.0, description: { es: "Oscura. Con sabor a malta tostada. Belga. 6,5%", en: "Dark. With roasted malt flavor. Belgian. 6.5%", fr: "Brune. Saveur de malt torrefie. Belge. 6,5%", de: "Dunkel. Mit Rostmalzgeschmack. Belgisch. 6,5%" } },
      { name: "Leffe Tripel", price: 4.2, description: { es: "Cerveza de alta fermentacion con 8,5% de alcohol. Sabor dulce y afrutado con notas de especias. Color dorado con espuma densa y cremosa.", en: "Top-fermented beer with 8.5% alcohol. Sweet and fruity flavor with spice notes. Golden color with dense, creamy foam.", fr: "Biere de haute fermentation a 8,5% d'alcool. Saveur douce et fruitee aux notes d'epices. Couleur doree avec mousse dense et cremeuse.", de: "Obergaring Bier mit 8,5% Alkohol. Susser, fruchtiger Geschmack mit Gewurznoten. Goldene Farbe mit dichtem, cremigem Schaum." } },
      { name: "Grimbergen Blonde", price: 4.0, description: { es: "Rubia y ligera. Belga. 6,7%", en: "Blonde and light. Belgian. 6.7%", fr: "Blonde et legere. Belge. 6,7%", de: "Blond und leicht. Belgisch. 6,7%" } },
      { name: "Grimbergen Double Ambree", price: 4.2, description: { es: "Tostada. Belga. 6,5%", en: "Toasted. Belgian. 6.5%", fr: "Ambree. Belge. 6,5%", de: "Gerostet. Belgisch. 6,5%" } },
      { name: "Grimbergen Triple", price: 4.85, description: { es: "Dorada. Belga. 9%", en: "Golden. Belgian. 9%", fr: "Doree. Belge. 9%", de: "Golden. Belgisch. 9%" } },
      { name: "Maredsous Brune", price: 4.85, description: { es: "Oscura con cuerpo. Belga. 8%", en: "Full-bodied dark. Belgian. 8%", fr: "Brune corsee. Belge. 8%", de: "Vollmundiges Dunkelbier. Belgisch. 8%" } },
      { name: "Maredsous Tripel", price: 4.85, description: { es: "Dorada fuerte. Belga. 10%", en: "Strong golden. Belgian. 10%", fr: "Doree forte. Belge. 10%", de: "Starkes Goldenes. Belgisch. 10%" } },
      { name: "St Bernardus Prior", price: 4.85, description: { es: "Oscura muy aromatica. Belga. 8%", en: "Very aromatic dark. Belgian. 8%", fr: "Brune tres aromatique. Belge. 8%", de: "Sehr aromatisches Dunkelbier. Belgisch. 8%" } },
      { name: "St Bernardus Abt", price: 5.2, description: { es: "Oscura muy fuerte. Belga. 10%", en: "Very strong dark. Belgian. 10%", fr: "Brune tres forte. Belge. 10%", de: "Sehr starkes Dunkelbier. Belgisch. 10%" } },
      { name: "Het Kapittel Pater", price: 4.0, description: { es: "Negra. Belga. 6%", en: "Black. Belgian. 6%", fr: "Noire. Belge. 6%", de: "Schwarz. Belgisch. 6%" } },
      { name: "Het Kapittel Abt", price: 4.85, description: { es: "Rubia fuerte y amarga. Belga. 10%", en: "Strong and bitter blonde. Belgian. 10%", fr: "Blonde forte et amere. Belge. 10%", de: "Stark und bitteres Blondes. Belgisch. 10%" } },
      // Pale Ale / IPA
      { name: "Judas", price: 4.5, description: { es: "Dorada. Belga. 8,5%", en: "Golden. Belgian. 8.5%", fr: "Doree. Belge. 8,5%", de: "Golden. Belgisch. 8,5%" } },
      { name: "Duvel", price: 4.85, description: { es: "Dorada. Clasica cerveza belga. 8,5%", en: "Golden. Classic Belgian beer. 8.5%", fr: "Doree. Biere belge classique. 8,5%", de: "Golden. Klassisches belgisches Bier. 8,5%" } },
      { name: "Duvel Tripel Hop Citra", price: 4.85, description: { es: "IPA. Elaborada con tres variedades de lupulo. Belga. 9,5%", en: "IPA. Brewed with three hop varieties. Belgian. 9.5%", fr: "IPA. Brassee avec trois varietes de houblon. Belge. 9,5%", de: "IPA. Mit drei Hopfensorten gebraut. Belgisch. 9,5%" } },
      { name: "Palm", price: 3.6, description: { es: "Pale Ale. Tostada. Belga. 5,2%", en: "Pale Ale. Toasted. Belgian. 5.2%", fr: "Pale Ale. Ambree. Belge. 5,2%", de: "Pale Ale. Gerostet. Belgisch. 5,2%" } },
      { name: "Martin's IPA 55", price: 4.5, description: { es: "44 IBUs. Belga. 6,9%", en: "44 IBUs. Belgian. 6.9%", fr: "44 IBU. Belge. 6,9%", de: "44 IBU. Belgisch. 6,9%" } },
      { name: "BrewDog Punk IPA", price: 4.7, description: { es: "5,6% IPA de color claro, aromas a frutas tropicales (mango y pina) y ligeramente amarga.", en: "5.6% Light colored IPA, tropical fruit aromas (mango and pineapple) and slightly bitter.", fr: "5,6% IPA de couleur claire, aromes de fruits tropicaux (mangue et ananas) et legerement amere.", de: "5,6% Helles IPA, tropische Fruchtaromen (Mango und Ananas) und leicht bitter." } },
      // Trappist
      { name: "Orval", price: 5.2, description: { es: "La trapense mas amarga. Belga. 6,2%", en: "The most bitter Trappist. Belgian. 6.2%", fr: "La trappiste la plus amere. Belge. 6,2%", de: "Das bitterste Trappistenbier. Belgisch. 6,2%" } },
      { name: "Chimay Roja", price: 4.85, description: { es: "Color rojizo. Afrutada. Trapense. Belga. 7%", en: "Reddish color. Fruity. Trappist. Belgian. 7%", fr: "Couleur rousse. Fruitee. Trappiste. Belge. 7%", de: "Rotliche Farbe. Fruchtig. Trappist. Belgisch. 7%" } },
      { name: "Westmalle Tripel", price: 5.15, description: { es: "Rubia dorada. Aroma a hierbas. Belga. 9,5%", en: "Golden blonde. Herbal aroma. Belgian. 9.5%", fr: "Blonde doree. Aromes d'herbes. Belge. 9,5%", de: "Goldblond. Krauteraroma. Belgisch. 9,5%" } },
      { name: "Westmalle Dubbel", price: 4.85, description: { es: "Oscura. Cuerpo suave. Belga. 7%", en: "Dark. Smooth body. Belgian. 7%", fr: "Brune. Corps doux. Belge. 7%", de: "Dunkel. Weicher Korper. Belgisch. 7%" } },
      { name: "Rochefort 10", price: 6.2, description: { es: "Negra. Muy especiada. Belga. 11,3%", en: "Black. Very spicy. Belgian. 11.3%", fr: "Noire. Tres epicee. Belge. 11,3%", de: "Schwarz. Sehr wurzig. Belgisch. 11,3%" } },
      { name: "Rochefort 8", price: 4.5, description: { es: "Ambar. Belga. 9,2%", en: "Amber. Belgian. 9.2%", fr: "Ambree. Belge. 9,2%", de: "Bernstein. Belgisch. 9,2%" } },
      { name: "La Trappe Dubbel", price: 4.85, description: { es: "Color oscuro. Holandesa. 6%", en: "Dark color. Dutch. 6%", fr: "Couleur sombre. Hollandaise. 6%", de: "Dunkle Farbe. Niederlandisch. 6%" } },
      { name: "La Trappe Tripel", price: 4.85, description: { es: "Rubia. Holandesa. 8%", en: "Blonde. Dutch. 8%", fr: "Blonde. Hollandaise. 8%", de: "Blond. Niederlandisch. 8%" } },
      { name: "La Trappe Quadrupel", price: 4.85, description: { es: "Rojizo. Strong Ale. Holandesa. 10%", en: "Reddish. Strong Ale. Dutch. 10%", fr: "Rousse. Strong Ale. Hollandaise. 10%", de: "Rotlich. Strong Ale. Niederlandisch. 10%" } },
      // Lagers
      { name: "1906", price: 3.0, description: null },
      { name: "Estrella Galicia", price: 3.0, description: null },
      { name: "Bud", price: 3.0, description: { es: "Rubia dulzona. Americana. 5%", en: "Sweet blonde. American. 5%", fr: "Blonde sucree. Americaine. 5%", de: "Susses Blondes. Amerikanisch. 5%" } },
      { name: "Heineken", price: 2.5, description: { es: "Holandesa. 5%", en: "Dutch. 5%", fr: "Hollandaise. 5%", de: "Niederlandisch. 5%" } },
      { name: "Corona", price: 3.5, description: { es: "Ligera. Mexicana. 4,6%", en: "Light. Mexican. 4.6%", fr: "Legere. Mexicaine. 4,6%", de: "Leicht. Mexikanisch. 4,6%" } },
      { name: "Biere du Demon", price: 4.5, description: { es: "Francesa. 12%", en: "French. 12%", fr: "Francaise. 12%", de: "Franzosisch. 12%" } },
      { name: "Lowenbrau", price: 3.5, description: { es: "Alemana. 5,2%", en: "German. 5.2%", fr: "Allemande. 5,2%", de: "Deutsch. 5,2%" } },
      { name: "Samichlaus", price: 6.6, description: { es: "Ambar. La lager mas fuerte del mundo. Suiza. 14%", en: "Amber. The world's strongest lager. Swiss. 14%", fr: "Ambree. La lager la plus forte du monde. Suisse. 14%", de: "Bernstein. Das starkste Lager der Welt. Schweizer. 14%" } },
      { name: "Urquell Pilsner", price: 3.0, description: { es: "Checa. 4,4%", en: "Czech. 4.4%", fr: "Tcheque. 4,4%", de: "Tschechisch. 4,4%" } },
      { name: "Stella Artois", price: 3.0, description: { es: "Belga. 5,2%", en: "Belgian. 5.2%", fr: "Belge. 5,2%", de: "Belgisch. 5,2%" } },
      { name: "Carlsberg", price: 3.0, description: { es: "Danesa. 5%", en: "Danish. 5%", fr: "Danoise. 5%", de: "Danisch. 5%" } },
      { name: "Budvar Budejovicky", price: 3.5, description: { es: "Checa. 5%", en: "Czech. 5%", fr: "Tcheque. 5%", de: "Tschechisch. 5%" } },
      { name: "Kronenbourg", price: 3.0, description: { es: "Francesa. 5%", en: "French. 5%", fr: "Francaise. 5%", de: "Franzosisch. 5%" } },
      { name: "Warsteiner", price: 3.5, description: { es: "Alemana. 4,8%", en: "German. 4.8%", fr: "Allemande. 4,8%", de: "Deutsch. 4,8%" } }
    ]
  },
  draftBeers: {
    category: categories.DRAFT_BEERS,
    items: [
      { name: "Lager BWK", prices: [{ type: servingTypes.glass, volume: "33cl", price: 2.2 }, { type: servingTypes.mug, volume: "50cl", price: 3.3 }], description: { es: "Rubia suave. 5%", en: "Smooth blonde. 5%", fr: "Blonde douce. 5%", de: "Mildes Blondes. 5%" } },
      { name: "Tripel Karmeliet", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.8 }, { type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "Tres cereales. Belga. 8%", en: "Three grains. Belgian. 8%", fr: "Trois cereales. Belge. 8%", de: "Drei Getreide. Belgisch. 8%" } },
      { name: "Martin's Pale Ale", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.8 }, { type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "Inglesa. 5,8%", en: "English. 5.8%", fr: "Anglaise. 5,8%", de: "Englisch. 5,8%" } },
      { name: "Martin's IPA", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.8 }, { type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "55 IBUs. Belga. 6,5%", en: "55 IBUs. Belgian. 6.5%", fr: "55 IBU. Belge. 6,5%", de: "55 IBU. Belgisch. 6,5%" } },
      { name: "Gordon Finest Gold", prices: [{ type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "Rubia fuerte. Escocesa. 10%", en: "Strong blonde. Scottish. 10%", fr: "Blonde forte. Ecossaise. 10%", de: "Starkes Blondes. Schottisch. 10%" } },
      { name: "Tostada Gran Via", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.5 }, { type: servingTypes.mug, volume: "50cl", price: 4.5 }], description: { es: "6,4% Color ambar intenso con reflejos rojizos. Espuma persistente. Alta intensidad aromatica con notas de levadura fresca y pan tostado.", en: "6.4% Intense amber color with reddish reflections. Persistent foam. High aromatic intensity with notes of fresh yeast and toasted bread.", fr: "6,4% Couleur ambre intense aux reflets rougeatres. Mousse persistante. Haute intensite aromatique aux notes de levure fraiche et pain grille.", de: "6,4% Intensive Bernsteinfarbe mit rotlichen Reflexen. Bestandiger Schaum. Hohe aromatische Intensitat mit Noten von frischer Hefe und getoastetem Brot." } },
      { name: "Kwak", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.8 }, { type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "Tostada afrutada. Belga. 8,4%", en: "Fruity toasted. Belgian. 8.4%", fr: "Ambree fruitee. Belge. 8,4%", de: "Fruchtiges Rostbier. Belgisch. 8,4%" } },
      { name: "Kwak Copa", price: 4.0, description: { es: "La Kwak debe su nombre a Pauwel Kwak, un tabernero de 1791 que creo esta cerveza servida en un vaso alargado con soporte de madera para los cocheros.", en: "Kwak owes its name to Pauwel Kwak, an innkeeper from 1791 who created this beer served in an elongated glass with wooden support for coachmen.", fr: "La Kwak doit son nom a Pauwel Kwak, un aubergiste de 1791 qui crea cette biere servie dans un verre allonge avec support en bois pour les cochers.", de: "Kwak verdankt seinen Namen Pauwel Kwak, einem Gastwirt von 1791, der dieses Bier in einem langlichen Glas mit Holzstander fur Kutscher kreierte." } },
      { name: "Guinness Special Export", prices: [{ type: servingTypes.glass, price: 3.9 }, { type: servingTypes.mug, volume: "50cl", price: 5.2 }], description: { es: "Elaborada al estilo belga. 8%", en: "Brewed in Belgian style. 8%", fr: "Brassee a la belge. 8%", de: "Im belgischen Stil gebraut. 8%" } },
      { name: "Cuvee des Trolls", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.8 }, { type: servingTypes.mug, volume: "50cl", price: 4.8 }], description: { es: "Cerveza de alta fermentacion, refrescante y ligera, con aromas de cascara de naranja seca. Belga. 7%", en: "Top-fermented beer, refreshing and light, with dried orange peel aromas. Belgian. 7%", fr: "Biere de haute fermentation, rafraichissante et legere, aux aromes d'ecorce d'orange sechee. Belge. 7%", de: "Obergaring Bier, erfrischend und leicht, mit Aromen von getrockneter Orangenschale. Belgisch. 7%" } },
      { name: "La Chouffe", prices: [{ type: servingTypes.glass, volume: "33cl", price: 4.3 }, { type: servingTypes.mug, volume: "50cl", price: 5.5 }], description: { es: "Dorada. Sabor afrutado y ligeramente lupulizado. Belga. 8%", en: "Golden. Fruity and slightly hoppy flavor. Belgian. 8%", fr: "Doree. Saveur fruitee et legerement houblonnee. Belge. 8%", de: "Golden. Fruchtiger und leicht hopfiger Geschmack. Belgisch. 8%" } },
      { name: "Chimay Roja", prices: [{ type: servingTypes.glass, volume: "33cl", price: 3.9 }, { type: servingTypes.mug, volume: "50cl", price: 4.9 }], description: { es: "Roja afrutada. Trapense. Belga. 7%", en: "Fruity red. Trappist. Belgian. 7%", fr: "Rouge fruitee. Trappiste. Belge. 7%", de: "Fruchtiges Rot. Trappist. Belgisch. 7%" } }
    ]
  },
  glutenFreeBeers: {
    category: categories.GLUTEN_FREE_BEERS,
    items: [
      { name: "Dougall's IPA", price: 4.5, description: { es: "IPA sin gluten. 6,4%. 33cl", en: "Gluten-free IPA. 6.4%. 33cl", fr: "IPA sans gluten. 6,4%. 33cl", de: "Glutenfreies IPA. 6,4%. 33cl" } },
      { name: "Mahou tostada 0,0 Sin Gluten", price: null, description: null },
      { name: "Naturepils", price: 4.0, description: { es: "Cerveza ecologica sin gluten. 4,6%", en: "Organic gluten-free beer. 4.6%", fr: "Biere bio sans gluten. 4,6%", de: "Bio glutenfreies Bier. 4,6%" } }
    ]
  },
  nonAlcoholicBeers: {
    category: categories.NON_ALCOHOLIC_BEERS,
    items: [
      { name: "Corona 0,0", price: 3.5, description: null },
      { name: "Mahou 0,0 tostada", price: 3.0, description: { es: "Tostada", en: "Toasted", fr: "Ambree", de: "Gerostet" } },
      { name: "Heineken 0,0", price: 2.5, description: null },
      { name: "Clausthaler", price: 3.0, description: { es: "0,0", en: "0.0", fr: "0,0", de: "0,0" } },
      { name: "Super Bock Stout 0,0", price: 3.0, description: { es: "Negra sin alcohol", en: "Non-alcoholic dark beer", fr: "Noire sans alcool", de: "Alkoholfreies Dunkelbier" } },
      { name: "Kopparberg Fresa y Lima 0,0", price: null, description: { es: "Sidra 33cl", en: "Cider 33cl", fr: "Cidre 33cl", de: "Cider 33cl" } }
    ]
  },
  fruitBeers: {
    category: categories.LAMBIC_FRUIT_BEERS,
    items: [
      { name: "Timmermans Peche", price: 4.0, description: { es: "Melocoton. 4%", en: "Peach. 4%", fr: "Peche. 4%", de: "Pfirsich. 4%" } },
      { name: "Timmermans Framboise", price: 4.0, description: { es: "Frambuesa. 4%", en: "Raspberry. 4%", fr: "Framboise. 4%", de: "Himbeere. 4%" } },
      { name: "Timmermans Kriek", price: 4.5, description: { es: "Cerezas. 4%", en: "Cherries. 4%", fr: "Cerises. 4%", de: "Kirschen. 4%" } },
      { name: "Floris Passion", price: 4.5, description: { es: "Fruta de la pasion. 4%", en: "Passion fruit. 4%", fr: "Fruit de la passion. 4%", de: "Passionsfrucht. 4%" } },
      { name: "Floris Chocolate", price: 4.5, description: { es: "Chocolate. 4%", en: "Chocolate. 4%", fr: "Chocolat. 4%", de: "Schokolade. 4%" } },
      { name: "Mongozo Coconut", price: 4.5, description: { es: "Coco. 4%", en: "Coconut. 4%", fr: "Noix de coco. 4%", de: "Kokosnuss. 4%" } }
    ]
  },
  ciders: {
    category: categories.CIDERS,
    items: [
      { name: "Magners", price: 4.0, description: { es: "33cl. Irlandesa", en: "33cl. Irish", fr: "33cl. Irlandaise", de: "33cl. Irisch" } },
      { name: "Kopparberg Fresa y Lima", price: 4.5, description: { es: "Sidra de fresa y lima. 50cl", en: "Strawberry and lime cider. 50cl", fr: "Cidre fraise et citron vert. 50cl", de: "Erdbeer-Limetten-Cider. 50cl" } },
      { name: "Kopparberg Mixed Fruit", price: 4.5, description: { es: "Frutas variadas. 50cl", en: "Mixed fruit. 50cl", fr: "Fruits varies. 50cl", de: "Gemischte Fruchte. 50cl" } },
      { name: "Kopparberg Mixed Fruit Tropical", price: 4.5, description: { es: "Frutas tropicales. 50cl", en: "Tropical fruit. 50cl", fr: "Fruits tropicaux. 50cl", de: "Tropische Fruchte. 50cl" } },
      { name: "Ladron de Manzanas", price: 3.3, description: { es: "Sidra de manzana. 33cl", en: "Apple cider. 33cl", fr: "Cidre de pomme. 33cl", de: "Apfelcider. 33cl" } }
    ]
  },
  wines: {
    category: categories.WINES,
    items: [
      { name: { es: "Copa de vino tinto", en: "Glass of red wine", fr: "Verre de vin rouge", de: "Glas Rotwein" }, price: 2.5, description: { es: "Consulte al camarero por el vino", en: "Ask your server about the wine", fr: "Consultez le serveur pour le vin", de: "Fragen Sie den Kellner nach dem Wein" } },
      { name: { es: "Tinto de verano", en: "Summer red wine", fr: "Tinto de verano", de: "Tinto de Verano" }, price: 2.8, description: { es: "Tinto de verano de la casa preparado con Fanta limon", en: "House summer red wine prepared with lemon Fanta", fr: "Tinto de verano maison prepare avec Fanta citron", de: "Haus-Tinto de Verano mit Zitronen-Fanta" } },
      { name: { es: "Copa vino blanco Alicante", en: "Alicante white wine glass", fr: "Verre de vin blanc Alicante", de: "Glas Alicante Weisswein" }, price: 3.7, description: { es: "Sabor refrescante y afrutado", en: "Refreshing and fruity flavor", fr: "Saveur rafraichissante et fruitee", de: "Erfrischender und fruchtiger Geschmack" } },
      { name: { es: "Botella vino blanco Alicante", en: "Alicante white wine bottle", fr: "Bouteille de vin blanc Alicante", de: "Flasche Alicante Weisswein" }, price: 25.0, description: { es: "Vino semidulce de la zona. Sabor refrescante y afrutado.", en: "Semi-sweet local wine. Refreshing and fruity flavor.", fr: "Vin demi-doux de la region. Saveur rafraichissante et fruitee.", de: "Halbsusser Wein aus der Region. Erfrischender und fruchtiger Geschmack." } },
      { name: { es: "Copa de vino blanco verdejo", en: "Verdejo white wine glass", fr: "Verre de vin blanc verdejo", de: "Glas Verdejo Weisswein" }, price: 2.5, description: { es: "Consulte al camarero por el vino", en: "Ask your server about the wine", fr: "Consultez le serveur pour le vin", de: "Fragen Sie den Kellner nach dem Wein" } }
    ]
  },
  liquors: {
    category: categories.LIQUORS,
    items: [
      { name: "Jack Daniel's", price: 7.5 },
      { name: "Red Label", price: 6.5 },
      { name: "Brugal", price: 6.5 },
      { name: "Cacique", price: 6.5 },
      { name: "Barcelo", price: 6.5 },
      { name: "Seagram's", price: 6.5 },
      { name: "Beefeater", price: 6.5 },
      { name: "Tanqueray", price: 6.5 },
      { name: "Tanqueray 0,0", price: 6.5 },
      { name: "Puerto de Indias", price: 6.5 },
      { name: "Vodka Absolut", price: 6.5 },
      { name: "Baileys", prices: [{ type: servingTypes.cup, price: 6.5 }, { type: servingTypes.shot, price: 2.2 }] },
      { name: "Tequila", prices: [{ type: servingTypes.cup, price: 6.5 }, { type: servingTypes.shot, price: 2.2 }] },
      { name: "Jagermeister", prices: [{ type: servingTypes.cup, price: 7.5 }, { type: servingTypes.shot, price: 2.2 }] },
      { name: { es: "Licor de Hierbas", en: "Herbal liqueur", fr: "Liqueur aux herbes", de: "Krauterlikor" }, prices: [{ type: servingTypes.cup, price: 6.5 }, { type: servingTypes.shot, price: 2.2 }] },
      { name: "Vermouth", price: 3.85 },
      { name: "Martini", price: 3.5 }
    ]
  },
  teas: {
    category: categories.TEAS,
    items: [
      { name: { es: "Manzanilla", en: "Chamomile", fr: "Camomille", de: "Kamille" }, price: 1.8, description: { es: "100% pura flor de manzanilla. Aroma y colores intensos.", en: "100% pure chamomile flower. Intense aroma and colors.", fr: "100% pure fleur de camomille. Aromes et couleurs intenses.", de: "100% reine Kamillenblute. Intensives Aroma und Farben." } },
      { name: { es: "Menta", en: "Mint", fr: "Menthe", de: "Minze" }, price: 1.8, description: { es: "Hojas de menta. Infusion tradicional de sabor refrescante.", en: "Mint leaves. Traditional infusion with refreshing flavor.", fr: "Feuilles de menthe. Infusion traditionnelle au gout rafraichissant.", de: "Minzblatten. Traditioneller Aufguss mit erfrischendem Geschmack." } },
      { name: { es: "Te Rooibos con Vainilla", en: "Rooibos tea with vanilla", fr: "The rooibos a la vanille", de: "Rooibos-Tee mit Vanille" }, price: 1.8 },
      { name: { es: "Te Jengibre con Curcuma", en: "Ginger tea with turmeric", fr: "The au gingembre et curcuma", de: "Ingwertee mit Kurkuma" }, price: 1.8 },
      { name: { es: "Te Jengibre con Mango", en: "Ginger tea with mango", fr: "The au gingembre et mangue", de: "Ingwertee mit Mango" }, price: 1.8 },
      { name: { es: "Te Jengibre con Limon", en: "Ginger tea with lemon", fr: "The au gingembre et citron", de: "Ingwertee mit Zitrone" }, price: 1.8 },
      { name: { es: "Te rojo cuerpo del deseo", en: "Red tea body of desire", fr: "The rouge corps du desir", de: "Roter Tee Korper der Begierde" }, price: 1.8, description: { es: "Te pu-erh, te verde, pina, petalos de rosa y trozos de fresa. Perfecto para quienes cuidan su linea.", en: "Pu-erh tea, green tea, pineapple, rose petals and strawberry pieces. Perfect for those watching their figure.", fr: "The pu-erh, the vert, ananas, petales de rose et morceaux de fraise. Parfait pour ceux qui surveillent leur ligne.", de: "Pu-Erh-Tee, Gruntee, Ananas, Rosenblattern und Erdbeerstucke. Perfekt fur Figurbewusste." } },
      { name: { es: "Te verde jengibre y limon", en: "Green tea ginger and lemon", fr: "The vert gingembre et citron", de: "Gruntee Ingwer und Zitrone" }, price: 1.8, description: { es: "Te verde, limon, regaliz, jengibre, menta y pimienta negra.", en: "Green tea, lemon, licorice, ginger, mint and black pepper.", fr: "The vert, citron, reglisse, gingembre, menthe et poivre noir.", de: "Gruntee, Zitrone, Lakritze, Ingwer, Minze und schwarzer Pfeffer." } }
    ]
  },
  softDrinks: {
    category: categories.SOFT_DRINKS,
    items: [
      { name: { es: "Agua", en: "Water", fr: "Eau", de: "Wasser" }, price: 1.3, description: "33cl" },
      { name: "Sprite", price: 2.0 },
      { name: "Coca Cola", price: 2.0 },
      { name: "Coca Cola Zero", price: 2.0 },
      { name: { es: "Fanta Limon", en: "Fanta Lemon", fr: "Fanta Citron", de: "Fanta Zitrone" }, price: 2.0 },
      { name: { es: "Fanta Naranja", en: "Fanta Orange", fr: "Fanta Orange", de: "Fanta Orange" }, price: 2.0 },
      { name: { es: "Aquarius Limon", en: "Aquarius Lemon", fr: "Aquarius Citron", de: "Aquarius Zitrone" }, price: 2.2 },
      { name: { es: "Aquarius Naranja", en: "Aquarius Orange", fr: "Aquarius Orange", de: "Aquarius Orange" }, price: 2.2 },
      { name: "FuzeTea", price: 2.2 },
      { name: { es: "Tonica", en: "Tonic water", fr: "Eau tonique", de: "Tonic Water" }, price: 2.2 },
      { name: { es: "Zumo de pina", en: "Pineapple juice", fr: "Jus d'ananas", de: "Ananassaft" }, price: 2.0 },
      { name: { es: "Zumo de melocoton", en: "Peach juice", fr: "Jus de peche", de: "Pfirsichsaft" }, price: 2.0 },
      { name: { es: "Zumo de naranja", en: "Orange juice", fr: "Jus d'orange", de: "Orangensaft" }, price: 2.0 }
    ]
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
  gluten: { label: "Gluten", symbol: "G" },
  dairy: { label: "Lacteos", symbol: "L" },
  eggs: { label: "Huevos", symbol: "H" },
  nuts: { label: "Frutos secos", symbol: "F" },
  peanuts: { label: "Cacahuetes", symbol: "C" },
  soy: { label: "Soja", symbol: "S" },
  fish: { label: "Pescado", symbol: "P" },
  shellfish: { label: "Mariscos", symbol: "M" },
  celery: { label: "Apio", symbol: "A" },
  mustard: { label: "Mostaza", symbol: "Mo" },
  sesame: { label: "Sesamo", symbol: "Se" },
  sulphites: { label: "Sulfitos", symbol: "Su" },
  lupin: { label: "Altramuces", symbol: "Al" },
  molluscs: { label: "Moluscos", symbol: "Ml" }
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
      return `${type}${vol}: ${p.price}€`;
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

  sections.push({
    id: "cervezas_botella",
    type: "drink",
    category: getLocalizedText(drinksMenu.bottleBeers.category, lang),
    items: drinksMenu.bottleBeers.items.map((item) => formatMenuItem(item, lang))
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
