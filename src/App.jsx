import { useEffect, useMemo, useState } from "react";
import { supportedLanguages, translations } from "./i18n/translations";
import {
  allergenMeta,
  getBottleBeerCatalog,
  getDrinkCatalog,
  getCompleteMenus,
  getMenuSections,
  normalizeKey
} from "./data/menu";

const MAP_EMBED_URL =
  import.meta.env.VITE_MAP_EMBED_URL ||
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.5574426676135!2d-0.6934849!3d38.266569000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63b68c79e2798d%3A0xbe1411f868907d7c!2sBierwinkel%20Elche!5e0!3m2!1sen!2ses!4v1772485321842!5m2!1sen!2ses";
const MAP_LINK_URL =
  import.meta.env.VITE_MAP_LINK_URL ||
  "https://maps.app.goo.gl/QggDacB3iVjiyzvM9";


const RESERVATION_PHONE = "+34 966 61 26 52";
const MOBILE_PHONE = "670052243";
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "elche@bierwinkel.es";
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/34670052243";
const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_PROFILE || "https://www.instagram.com/bierwinkel_elche/?hl=es";
const PAGE_KEYS = ["inicio", "menu", "album", "visitanos"];

// Mapeo: ID de cerveza (generado desde Cervezas.json) → archivo de imagen en /public/cervezas/
// Sin mapeo (sin cerveza en el menú): Becks.jpeg, BarbarBok.jpeg, Corona.jpeg,
//   Dinckerlaker.jpeg, HogaerdaaenGranCru.jpeg (duplicado), ChouffeIPA.jpeg (duplicado)
const BEER_IMAGES = {
  // ── CERVEZAS DE TRIGO ──────────────────────────────────────────────────────
  "cervezas_botella_hoegaarden_grand_cru":      "/cervezas/HogaerdaaenGranCru.jpeg",       // Hoegaarden Grand Cru
  "cervezas_botella_paulaner_50cl":             "/cervezas/Paulaner.jpeg",                // Paulaner 50cl
  "cervezas_botella_weihenstephan_hefe_50cl":   "/cervezas/Weihenstephaner.jpeg",         // Weihenstephan Hefe 50cl
  "cervezas_botella_erdinger_pikantus_50cl":    "/cervezas/Erdinger.jpeg",                // Erdinger Pikantus 50cl
  "cervezas_botella_sanwald":                   "/cervezas/Sanwald.jpeg",                 // Sanwald

  // ── ESPECIALIDADES EXTRA ───────────────────────────────────────────────────
  "cervezas_botella_la_chouffe":                "/cervezas/Lachouffe.jpeg",               // La Chouffe
  "cervezas_botella_becks":                     "/cervezas/Becks.jpeg",                   // Becks
  "cervezas_botella_dinckel_privaat":           "/cervezas/Dinckerlaker.jpeg",            // Dinckel Privaat
  "cervezas_botella_corona":                    "/cervezas/Corona.jpeg",                  // Corona
  "cervezas_botella_triple_moines":             "/cervezas/TripleMoines.jpeg",            // Triple Moines
  "cervezas_botella_barbar_blonde":             "/cervezas/Barbar%20Blonde.jpeg",         // Barbar Blonde
  "cervezas_botella_barbar_bock_meca":          "/cervezas/BarbarBok.jpeg",               // Barbar Bock Meca
  "cervezas_botella_st_feuillien":              "/cervezas/StFeuillien.jpeg",             // St Feuillien
  "cervezas_botella_delirium_red":              "/cervezas/Deliriumred.jpeg",             // Delirium Red
  "cervezas_botella_la_divine":                 "/cervezas/Ladivine.jpeg",                // La Divine
  "cervezas_botella_delirium_tremens":          "/cervezas/cerveza_botella_delirium_tremens.jpeg", // Delirium Tremens
  "cervezas_botella_kasteel_triple":            "/cervezas/Kaasteltriple.jpeg",           // Kasteel Triple
  "cervezas_botella_tripel_karmeliet":          "/cervezas/TripleKarmeliet.jpeg",         // Tripel Karmeliet
  "cervezas_botella_gulden_draak":              "/cervezas/GuldenDraak.jpeg",             // Gulden Draak
  "cervezas_botella_gulden_draak_9000":         "/cervezas/GuldenDrak9000.jpeg",          // Gulden Draak 9000
  "cervezas_botella_satan_gold":                "/cervezas/Satan_gold.jpeg",              // Satan Gold
  "cervezas_botella_la_guillotine":             "/cervezas/La%20guillot%C3%ADneme.jpeg",  // La Guillotine

  // ── ABADÍA ─────────────────────────────────────────────────────────────────
  "cervezas_botella_leffe_blonde":              "/cervezas/LeffeBlonde.jpeg",             // Leffe Blonde
  "cervezas_botella_leffe_brune":               "/cervezas/LeffeBrune.jpeg",              // Leffe Brune
  "cervezas_botella_leffe_tripel":              "/cervezas/Leffetriple.jpeg",             // Leffe Tripel
  "cervezas_botella_grimbergen_triple":         "/cervezas/GrimbergenTriple.jpeg",        // Grimbergen Triple
  "cervezas_botella_grimbergen_double_ambree":  "/cervezas/GrimbergeDouble.jpeg",         // Grimbergen Double Ambrée
  "cervezas_botella_maredsous_brune":           "/cervezas/Maredsousbrune.jpeg",          // Maredsous Brune
  "cervezas_botella_maredsous_tripel":          "/cervezas/Maredsoustriple.jpeg",         // Maredsous Tripel
  "cervezas_botella_st_bernardus_prior":        "/cervezas/SaintBernardusPrior.jpeg",     // St Bernardus Prior
  "cervezas_botella_st_bernardus_abt":          "/cervezas/SaintBernardus12.jpeg",        // St Bernardus Abt
  "cervezas_botella_het_kapittel_pater":        "/cervezas/HetKapittel.jpeg",             // Het Kapittel Pater
  "cervezas_botella_het_kapittel_abt":          "/cervezas/HetKapittelWatou.jpeg",        // Het Kapittel Abt

  // ── PALE ALE / IPA / ALTA FERMENTACIÓN ────────────────────────────────────
  "cervezas_botella_chouffe_ipa":               "/cervezas/ChouffeIPA.jpeg",              // Chouffe IPA
  "cervezas_botella_judas":                     "/cervezas/Judas.jpeg",                   // Judas
  "cervezas_botella_troubadour_magma":          "/cervezas/TroubadourMagma.jpeg",         // Troubadour Magma
  "cervezas_botella_bush_beer_ambree":          "/cervezas/BushCaractere.jpeg",           // Bush Beer Ambrée
  "cervezas_botella_duvel":                     "/cervezas/Duvel.jpeg",                   // Duvel
  "cervezas_botella_duvel_tripel_hop_citra":    "/cervezas/DuvelHopCitra.jpeg",           // Duvel Tripel Hop Citra
  "cervezas_botella_palm":                      "/cervezas/Palm.jpeg",                    // Palm
  "cervezas_botella_martin_s_ipa_55":           "/cervezas/MatinsIPA55.jpeg",             // Martin's IPA 55
  "cervezas_botella_brewdog_punk_ipa":          "/cervezas/BrewdrogIPA.jpeg",             // BrewDog Punk IPA

  // ── TRAPENSES ──────────────────────────────────────────────────────────────
  "cervezas_botella_achel_dubbel":              "/cervezas/AchelDubbel.jpeg",             // Achel Dubbel
  "cervezas_botella_orval":                     "/cervezas/Orval.jpeg",                   // Orval
  "cervezas_botella_chimay_roja":               "/cervezas/Chimayroja.jpeg",              // Chimay Roja
  "cervezas_botella_chimay_blanca":             "/cervezas/Chimay_blanca.jpeg",           // Chimay Blanca
  "cervezas_botella_chimay_azul":               "/cervezas/ChimayAzul.jpeg",              // Chimay Azul
  "cervezas_botella_westmalle_tripel":          "/cervezas/Westmalletriple.jpeg",         // Westmalle Tripel
  "cervezas_botella_westmalle_dubbel":          "/cervezas/WestmalleDubell.jpeg",         // Westmalle Dubbel
  "cervezas_botella_rochefort_10":              "/cervezas/Rocherfort10.jpeg",            // Rochefort 10
  "cervezas_botella_rochefort_8":               "/cervezas/Rochefort8.jpeg",              // Rochefort 8
  "cervezas_botella_la_trappe_dubbel":          "/cervezas/Latrappedubel.jpeg",           // La Trappe Dubbel
  "cervezas_botella_la_trappe_tripel":          "/cervezas/Latrappetriple.jpeg",          // La Trappe Tripel
  "cervezas_botella_la_trappe_quadrupel":       "/cervezas/Latrappequadruple.jpeg",       // La Trappe Quadrupel

  // ── LAGERS ─────────────────────────────────────────────────────────────────
  "cervezas_botella_1906":                      "/cervezas/1906.jpeg",                    // 1906
  "cervezas_botella_estrella_galicia":          "/cervezas/EstrellaGalicia.jpeg",         // Estrella Galicia
  "cervezas_botella_bud":                       "/cervezas/Budweiser.jpeg",               // Bud
  "cervezas_botella_heineken":                  "/cervezas/Heineken.jpeg",                // Heineken
  "cervezas_botella_biere_du_demon":            "/cervezas/Bieredudemon.jpeg",            // Biere du Demon
  "cervezas_botella_lowenbrau":                 "/cervezas/Lowenbrau.jpeg",               // Löwenbrau
  "cervezas_botella_samichlaus":                "/cervezas/Samischlaus.jpeg",             // Samichlaus

  // ── PILSEN ─────────────────────────────────────────────────────────────────
  "cervezas_botella_urquell_pilsner":           "/cervezas/PilserUrquell.jpeg",           // Urquell Pilsner
  "cervezas_botella_stella_artois":             "/cervezas/StellaArtois.jpeg",            // Stella Artois
  "cervezas_botella_carlsberg":                 "/cervezas/Calsberg.jpeg",                // Carlsberg
  "cervezas_botella_warsteiner":                "/cervezas/Wasteiner.jpeg",               // Warsteiner

  // ── PORTER Y STOUT ─────────────────────────────────────────────────────────
  "cervezas_botella_guinness_special_export":   "/cervezas/GuinnessSpecialExport.jpeg",   // Guinness Special Export
  "cervezas_botella_troubadour_imperial_stout": "/cervezas/TroubadourImperialStout.jpeg", // Troubadour Imperial Stout
  "cervezas_botella_troubadour_obscura":        "/cervezas/TroubadourObscura.jpeg",       // Troubadour Obscura
  "cervezas_botella_super_bock_stout":          "/cervezas/S%C3%BAperBockStout.jpeg",     // Super Bock Stout

  // ── CERVEZAS SIN GLUTEN ────────────────────────────────────────────────────
  "cervezas_sin_gluten_dougall_s_ipa":                "/cervezas/DougallsIPAsingluten.jpg",       // Dougall's IPA
  "cervezas_sin_gluten_mahou_tostada_0_0_sin_gluten": "/cervezas/Mahoutostada00singluten.jpg",    // Mahou Tostada 0,0 Sin Gluten
  "cervezas_sin_gluten_naturepils":                   "/cervezas/Naturepils.jpg",                 // Naturepils

  // ── CERVEZAS SIN ALCOHOL ───────────────────────────────────────────────────
  "cervezas_sin_alcohol_clausthaler":               "/cervezas/Clausthaler.jpg",               // Clausthaler
  "cervezas_sin_alcohol_corona_0_0":                "/cervezas/Corona00.jpg",                  // Corona 0,0
  "cervezas_sin_alcohol_mahou_0_0_tostada":         "/cervezas/Mahoutostada00.jpg",            // Mahou 0,0 Tostada
  "cervezas_sin_alcohol_super_bock_stout":          "/cervezas/Superbocksinalcohol.jpg",       // Super Bock Stout 0,0
  "cervezas_sin_alcohol_kopparberg_fresa_y_lima":   "/cervezas/Kopparbergsinalcohol.jpg",      // Kopparberg Fresa y Lima 0,0
  "cervezas_sin_alcohol_dinckel_privaat_0_0":       "/cervezas/Dinkelacker00.jpg",             // Dinckel Privaat 0,0

  // ── SIDRAS ─────────────────────────────────────────────────────────────────
  "sidras_kopparberg_fresa_y_lima":                 "/cervezas/Kopparbergfresaylima.jpg",      // Kopparberg Fresa y Lima
  "sidras_kopparberg_mixed_fruit":                  "/cervezas/Kopparbergmixed.jpg",           // Kopparberg Mixed Fruit
  "sidras_ladron_de_manzanas":                      "/cervezas/Ladrondemanzanas.jpg",          // Ladrón de Manzanas
  "sidras_magners":                                 "/cervezas/magners.jpg",                   // Magners
};
const BEER_CATALOG = [
  ...getBottleBeerCatalog(),
  ...getDrinkCatalog("CERVEZAS SIN GLUTEN",  "cervezas_sin_gluten"),
  ...getDrinkCatalog("CERVEZAS SIN ALCOHOL", "cervezas_sin_alcohol"),
  ...getDrinkCatalog("SIDRAS",               "sidras"),
]
  .filter((beer) => BEER_IMAGES[beer.id])
  .map((beer) => ({ ...beer, img: BEER_IMAGES[beer.id] }));

const getWeekSeed = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return Math.floor(monday.getTime() / 1000);
};

const seededShuffle = (arr, seed) => {
  let s = seed;
  const rand = () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const PAGE_TRANSITION_MS = 280;
const MENU_ASSETS = {
  es: {
    appetizers: "/aperitivos_esp.png",
    menus: "/menus_esp.png"
  },
  en: {
    appetizers: "/aperitivos_eng.png",
    menus: "/menus_eng.png"
  }
};
const languageOptions = [
  { code: "es", label: "ES", flagSrc: "https://flagcdn.com/w40/es.png", flagAlt: "Bandera de España" },
  { code: "en", label: "EN", flagSrc: "https://flagcdn.com/w40/gb.png", flagAlt: "UK flag" },
  { code: "fr", label: "FR", flagSrc: "https://flagcdn.com/w40/fr.png", flagAlt: "Drapeau français" },
  { code: "de", label: "DE", flagSrc: "https://flagcdn.com/w40/de.png", flagAlt: "Deutsche Flagge" }
];

function App() {
  const initialLang = useMemo(() => {
    const saved = localStorage.getItem("bierwinkel-lang");
    return supportedLanguages.includes(saved) ? saved : "es";
  }, []);

  const initialPage = useMemo(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    return PAGE_KEYS.includes(hash) ? hash : "inicio";
  }, []);

  const [lang, setLang] = useState(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(initialPage);
  const [pageTransition, setPageTransition] = useState("in");
  const [menuType, setMenuType] = useState("comida");
  const [showAllergens, setShowAllergens] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [sheetOverrides, setSheetOverrides] = useState({});
  const [emailCopied, setEmailCopied] = useState(false);

  const [weeklyBeers, setWeeklyBeers] = useState([]);

  const t = translations[lang];
  const scheduleRows = t.scheduleRows || [];
  const assetLang = lang === "es" ? "es" : "en";
  const menuAssets = MENU_ASSETS[assetLang];
  const selectedLanguage = languageOptions.find((option) => option.code === lang) || languageOptions[0];
  const localizedMenuSections = useMemo(() => getMenuSections(lang), [lang]);
  const localizedCompleteMenus = useMemo(() => getCompleteMenus(lang), [lang]);

  const filteredMenuSections = useMemo(() => {
    if (menuType === "menus") return [];
    let sections;
    if (menuType === "postres") {
      sections = localizedMenuSections.filter((section) => section.type === "food" && section.id === "postres");
    } else if (menuType === "comida") {
      sections = localizedMenuSections.filter(
        (section) => section.type === "food" && section.id !== "postres" && section.id !== "menus"
      );
    } else {
      sections = localizedMenuSections.filter((section) => section.type === "drink");
    }

    if (Object.keys(sheetOverrides).length === 0) return sections;

    const applyItem = (item) => {
      const ov = sheetOverrides[item.id];
      if (!ov) return item;
      if ((ov.disponible || "").toUpperCase() === "NO") return null;
      const price = parseFloat((ov.precio || "").replace(",", "."));
      return { ...item, price: isNaN(price) ? item.price : price };
    };

    return sections.map((section) => {
      if (section.groups) {
        const newGroups = section.groups
          .map((group) => ({ ...group, items: group.items.map(applyItem).filter(Boolean) }))
          .filter((g) => g.items.length > 0);
        return { ...section, groups: newGroups, items: newGroups.flatMap((g) => g.items) };
      }
      return { ...section, items: section.items.map(applyItem).filter(Boolean) };
    });
  }, [localizedMenuSections, menuType, sheetOverrides]);

  const formatMenuPrice = (price) => {
    if (!price) return "";
    if (price === "Consultar") return price;
    if (typeof price === "string") return price;
    return `${price.toFixed(2)} €`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {});
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2500);
  };

  const updateBrowserUrl = (page) => {
    if (page === "inicio") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }
    history.pushState(null, "", "#" + page);
  };

  const navigateToPage = (page) => {
    setMenuOpen(false);
    if (page === activePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPageTransition("out");
    window.setTimeout(() => {
      setActivePage(page);
      updateBrowserUrl(page);
      window.scrollTo(0, 0);
      setPageTransition("in");
    }, PAGE_TRANSITION_MS);
  };

  const scrollToHomeSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToHomeSection = (sectionId) => {
    setMenuOpen(false);
    if (activePage === "inicio") {
      scrollToHomeSection(sectionId);
      return;
    }

    setPageTransition("out");
    window.setTimeout(() => {
      setActivePage("inicio");
      updateBrowserUrl("inicio");
      setPageTransition("in");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.setTimeout(() => scrollToHomeSection(sectionId), 90);
    }, PAGE_TRANSITION_MS);
  };

  const goToBottleBeers = () => {
    setMenuType("bebida");
    navigateToPage("menu");
    window.setTimeout(() => {
      const el = document.getElementById("section-cervezas_botella");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, PAGE_TRANSITION_MS + 120);
  };

  const goToBeerSubgroup = (beer) => {
    const groupId = normalizeKey(beer.categoria);
    const sectionId = beer.menuSection || "cervezas_botella";
    setMenuType("bebida");
    navigateToPage("menu");
    window.setTimeout(() => {
      const subgroupEl = document.getElementById(`subgroup-${groupId}`);
      if (subgroupEl) {
        subgroupEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const sectionEl = document.getElementById(`section-${sectionId}`);
        if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, PAGE_TRANSITION_MS + 120);
  };

  useEffect(() => {
    localStorage.setItem("bierwinkel-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang, activePage, menuType]);

  useEffect(() => {
    const orbs = document.querySelectorAll(".bg-orb");

    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sheetId = import.meta.env.VITE_BEERS_SHEET_ID;
    const sheetGid = import.meta.env.VITE_BEERS_SHEET_GID || "0";
    const csvUrl =
      import.meta.env.VITE_BEERS_SHEET_CSV_URL ||
      (sheetId
        ? `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`
        : null);

    const fallback = (reason) => {
      console.log("[Sheet] fallback activado:", reason);
      setWeeklyBeers(seededShuffle(BEER_CATALOG, getWeekSeed()).slice(0, 5));
    };

    if (!csvUrl) { fallback("sin URL configurada"); return; }

    console.log("[Sheet] cargando:", csvUrl);
    fetch(csvUrl)
      .then((r) => r.text())
      .then((text) => {
        const clean = text.replace(/^\uFEFF/, "").replace(/\r/g, "");
        const lines = clean.trim().split("\n").filter((l) => l.trim());
        console.log("[Sheet] primera línea:", lines[0]?.slice(0, 120));
        if (lines[0]?.trimStart().startsWith("<")) {
          console.error("[Sheet] ❌ La respuesta es HTML, no CSV. Publika la hoja: Archivo → Compartir → Publicar en la web → CSV");
          fallback("respuesta HTML en lugar de CSV");
          return;
        }
        if (lines.length < 2) { fallback("CSV vacío"); return; }
        const sep = lines[0].includes("\t") ? "\t" : lines[0].includes(";") ? ";" : ",";
        const unquote = (s) => s.trim().replace(/^"(.*)"$/, "$1");
        const headers = lines[0].split(sep).map(unquote).map((h) => h.toLowerCase());
        console.log("[Sheet] cabeceras:", headers);
        const idIdx = headers.indexOf("id");
        const recIdx = headers.indexOf("recomendacion");
        console.log("[Sheet] columna id:", idIdx, "| columna recomendacion:", recIdx);
        if (idIdx === -1) { fallback("no se encuentra columna 'id' en el CSV"); return; }
        const map = {};
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(sep).map(unquote);
          const id = cols[idIdx];
          if (!id) continue;
          const obj = {};
          headers.forEach((h, j) => { obj[h] = cols[j] ?? ""; });
          map[id] = obj;
        }
        const featured = BEER_CATALOG.filter(
          (beer) => (map[beer.id]?.recomendacion || "").toUpperCase() === "SI"
        );
        console.log("[Sheet] IDs en map:", Object.keys(map).length, "| muestra:", Object.keys(map).slice(0, 3));
        console.log("[Sheet] recomendados:", featured.map((b) => b.id));
        setSheetOverrides(map);
        if (featured.length > 0) setWeeklyBeers(featured.slice(0, 5));
        else fallback("ninguna cerveza marcada con SI");
      })
      .catch((e) => fallback("error fetch: " + e.message));
  }, []);

  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      {activePage === "inicio" ? (
        <div className="global-logo-watermark" aria-hidden="true">
          <img src="/logo_bwk.png" alt="" />
        </div>
      ) : null}

      <header className="site-header" id="top">
        <button className="logo logo-btn" onClick={() => navigateToPage("inicio")}>
          <img src="/logo_bwk.png" alt="Bierwinkel" className="brand-mark-header" />
          BIERWINKEL
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="toggle menu">
          ☰
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <button className={`nav-link-btn ${activePage === "inicio" ? "active" : ""}`} onClick={() => navigateToPage("inicio")}>
            {t.navHome}
          </button>
          <button className="nav-link-btn" onClick={() => goToHomeSection("historia")}>
            {t.navHistory}
          </button>
          <button className={`nav-link-btn ${activePage === "menu" ? "active" : ""}`} onClick={() => navigateToPage("menu")}>
            {t.navMenu}
          </button>
          <button className={`nav-link-btn ${activePage === "album" ? "active" : ""}`} onClick={() => navigateToPage("album")}>
            {t.navAlbum}
          </button>
          <button className={`nav-link-btn ${activePage === "visitanos" ? "active" : ""}`} onClick={() => navigateToPage("visitanos")}>
            {t.navVisit}
          </button>
        </nav>

        <div className="lang-switcher" role="group" aria-label="language switcher">
          <div className="lang-dropdown">
            <button
              className="lang-dropdown-trigger"
              onClick={() => setLangMenuOpen((value) => !value)}
              aria-label="Seleccion de idioma"
            >
              <img className="lang-flag-img" src={selectedLanguage.flagSrc} alt={selectedLanguage.flagAlt} />
              <span>{selectedLanguage.label}</span>
            </button>
            {langMenuOpen ? (
              <div className="lang-dropdown-menu">
                {languageOptions
                  .filter((option) => supportedLanguages.includes(option.code))
                  .map((option) => (
                    <button
                      key={option.code}
                      className={`lang-option ${lang === option.code ? "active" : ""}`}
                      onClick={() => {
                        setLang(option.code);
                        setLangMenuOpen(false);
                      }}
                    >
                      <img className="lang-flag-img" src={option.flagSrc} alt={option.flagAlt} />
                      <span>{option.label}</span>
                    </button>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className={`page-shell ${pageTransition === "out" ? "page-out" : "page-in"}`}>
        {activePage === "inicio" ? (
          <>
            <section id="inicio" className="hero reveal">
              <p className="eyebrow">{t.heroEyebrow}</p>
              <h1>{t.heroTitle}</h1>
              <p className="hero-text">{t.heroText}</p>

              <div className="hero-cta">
                <button className="btn primary" onClick={() => navigateToPage("menu")}>
                  {t.heroBtnMenu}
                </button>
                <button className="btn ghost" onClick={() => scrollToHomeSection("visitanos-home")}>
                  {t.heroBtnReserve}
                </button>
              </div>

              <div className="hero-stats">
                <article>
                  <strong>+110</strong>
                  <span>{t.statBeers}</span>
                </article>
                <article>
                  <strong>17</strong>
                  <span>{t.statTaps}</span>
                </article>
                <article>
                  <strong>1998</strong>
                  <span>{t.statYear}</span>
                </article>
              </div>
            </section>

            <section id="historia" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.historyEyebrow}</p>
                <h2>{t.historyTitle}</h2>
              </div>
              <div className="history-grid">
                <p>{t.historyP1}</p>
                <p>{t.historyP2}</p>
                <p>{t.historyP3}</p>
              </div>
            </section>

            <section id="cervezas-trigo" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.wheatBeersEyebrow}</p>
                <h2>{t.wheatBeersTitle}</h2>
              </div>
              <div className="beer-album-grid">
                {weeklyBeers.map((beer) => (
                  <article
                    className="beer-album-card"
                    key={beer.id}
                    onClick={() => goToBeerSubgroup(beer)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") goToBeerSubgroup(beer); }}
                  >
                    <div className="beer-album-img-wrap">
                      <img src={beer.img} alt={beer.name} loading="lazy" />
                    </div>
                    <div className="beer-album-info">
                      {beer.categoria ? <p className="beer-album-type">{beer.categoria}</p> : null}
                      <h3 className="beer-album-name">{beer.name}</h3>
                      {beer.origen ? <p className="beer-album-origin">{beer.origen}</p> : null}
                      {beer.graduacion ? <p className="beer-album-abv">{beer.graduacion}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="eventos" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.eventsEyebrow}</p>
                <h2>{t.eventsTitle}</h2>
              </div>
              <div className={`event-list${t.events.length <= 2 ? " event-list--centered" : ""}`}>
                {t.events.map((event) => (
                  <article className="event-item" key={event.title}>
                    <p className="event-date">{event.day}</p>
                    <h3>{event.title}</h3>
                    <p>{event.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="visitanos-home" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.visitEyebrow}</p>
                <h2>{t.visitTitle}</h2>
              </div>

              <div className="visit-grid">
                <article className="visit-card schedule-card">
                  <h3>{t.scheduleTitle}</h3>
                  <div className="schedule-list">
                    {scheduleRows.map((row) => (
                      <div className="schedule-item" key={row.day}>
                        <span>{row.day}</span>
                        <strong>{row.hours}</strong>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="visit-card">
                  <h3>{t.addressTitle}</h3>
                  <p>{t.addressText}</p>
                  <div className="map-frame-wrap">
                    <iframe src={MAP_EMBED_URL} title="Bierwinkel map home" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <a href={MAP_LINK_URL} target="_blank" rel="noreferrer" className="map-click-overlay" aria-label={t.mapLinkText}></a>
                  </div>
                </article>

                <article className="visit-card">
                  <h3>{t.reserveTitle}</h3>
                  <p>{t.reserveText}</p>
                  <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    {t.reserveBtn}: {MOBILE_PHONE}
                  </a>
                  <a className="btn ghost" href={`tel:${RESERVATION_PHONE.replace(/\s+/g, "")}`}>
                    {t.callBtn}: {RESERVATION_PHONE}
                  </a>
                  <a className="btn ghost" href={`tel:${MOBILE_PHONE.replace(/\s+/g, "")}`}>
                    {t.mobileBtn}: {MOBILE_PHONE}
                  </a>
                  <button className="btn ghost" onClick={copyEmail}>
                    {emailCopied ? t.emailCopied : `Email: ${CONTACT_EMAIL}`}
                  </button>
                </article>
              </div>
            </section>

          </>
        ) : null}

        {activePage === "menu" ? (
          <section id="menu" className="section">
            <div className="section-heading">
              <p className="eyebrow">{t.menuEyebrow}</p>
              <h2>{t.menuTitle}</h2>
              <p>{t.menuText}</p>
            </div>

            <div className="menu-type-switch">
              <button
                className={`menu-type-btn ${menuType === "comida" ? "active" : ""}`}
                onClick={() => setMenuType("comida")}
              >
                {t.menuTabFood}
              </button>
              <button
                className={`menu-type-btn ${menuType === "bebida" ? "active" : ""}`}
                onClick={() => setMenuType("bebida")}
              >
                {t.menuTabDrink}
              </button>
              <button
                className={`menu-type-btn ${menuType === "postres" ? "active" : ""}`}
                onClick={() => setMenuType("postres")}
              >
                {t.menuTabDesserts}
              </button>
              <button
                className={`menu-type-btn ${menuType === "menus" ? "active" : ""}`}
                onClick={() => setMenuType("menus")}
              >
                {t.menuTabFullMenus}
              </button>
            </div>

            {menuType !== "menus" ? (
              <>
                <div className={`menu-sections-grid ${filteredMenuSections.length === 1 ? "single-item" : ""}`}>
                  {filteredMenuSections.map((section) => (
                    <article className="menu-section-card" key={section.id || section.category} id={section.id ? `section-${section.id}` : undefined}>
                      <h3>{section.category}</h3>
                      {Array.isArray(section.availableSausages) && section.availableSausages.length > 0 ? (
                        <div className="section-availability-block">
                          <p className="section-availability-title">
                            {t.menuAvailableSausages || "Salchichas disponibles"}
                          </p>
                          <div className="section-availability-list">
                            {section.availableSausages.map((sausage) => (
                              <span
                                key={`${section.id || section.category}-available-${sausage}`}
                                className="section-availability-item"
                              >
                                {sausage}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {section.groups && section.groups.length > 0 ? (
                        section.groups.map((group) => (
                          <div key={group.id} id={`subgroup-${group.id}`} className="menu-subgroup">
                            <h4 className="menu-subgroup-title">{group.category}</h4>
                            <ul className="menu-item-list">
                              {group.items.map((item) => (
                                <li key={`${group.id}-${item.id || item.name}`}>
                                  <div className="menu-item-row">
                                    <span className="menu-item-name">
                                      {item.name}
                                    </span>
                                    <span className="menu-item-price">{formatMenuPrice(item.price)}</span>
                                  </div>
                                  {item.note ? <small>{item.note}</small> : null}
                                  {showAllergens && Array.isArray(item.allergens) && item.allergens.length > 0 ? (
                                    <div className="allergen-icons-row">
                                      {item.allergens
                                        .filter((code) => allergenMeta[code])
                                        .map((code) => (
                                          <span
                                            key={`${group.id}-${item.id || item.name}-${code}`}
                                            className="allergen-icon-glyph"
                                            title={allergenMeta[code].label}
                                            aria-label={allergenMeta[code].label}
                                          >
                                            {allergenMeta[code].icon || allergenMeta[code].symbol}
                                          </span>
                                        ))}
                                    </div>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul className="menu-item-list">
                          {section.items.map((item) => (
                            <li key={`${section.id || section.category}-${item.id || item.name}`}>
                              <div className="menu-item-row">
                                <span className="menu-item-name">
                                  {item.name}
                                </span>
                                <span className="menu-item-price">{formatMenuPrice(item.price)}</span>
                              </div>
                              {item.note ? <small>{item.note}</small> : null}
                              {showAllergens && Array.isArray(item.allergens) && item.allergens.length > 0 ? (
                                <div className="allergen-icons-row">
                                  {item.allergens
                                    .filter((code) => allergenMeta[code])
                                    .map((code) => (
                                      <span
                                        key={`${section.id || section.category}-${item.id || item.name}-${code}`}
                                        className="allergen-icon-glyph"
                                        title={allergenMeta[code].label}
                                        aria-label={allergenMeta[code].label}
                                      >
                                        {allergenMeta[code].icon || allergenMeta[code].symbol}
                                      </span>
                                    ))}
                                </div>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="complete-menus-grid">
                {localizedCompleteMenus.map((menu) => (
                  <article className="menu-section-card complete-menu-card" key={menu.id}>
                    <div className="menu-item-row">
                      <h3>{menu.name}</h3>
                      <span className="menu-item-price">{menu.price.toFixed(2)} €</span>
                    </div>
                    <div className="complete-menu-sections">
                      {menu.sections.map((section) => (
                        <div key={`${menu.id}-${section.id || section.name}`} className="complete-menu-block">
                          <h4>{section.name}</h4>
                          {section.options.length > 0 ? (
                            <ul>
                              {section.options.map((option) => (
                                <li key={`${menu.id}-${section.id || section.name}-${option.id || option.name}`}>
                                  <span>{option.name}</span>
                                  {option.description ? <small>{option.description}</small> : null}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {menuType !== "menus" ? (
              <>
                {showAllergens ? (
                  <div className="allergen-legend">
                    {Object.entries(allergenMeta).map(([code, meta]) => (
                      <span className="allergen-pill" key={code}>
                        <span className="allergen-icon-glyph" aria-hidden="true">
                          {meta.icon || meta.symbol}
                        </span>
                        {meta.label}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="allergen-toggle-wrap">
                  <button
                    className={`allergen-toggle-btn ${showAllergens ? "active" : ""}`}
                    onClick={() => setShowAllergens((value) => !value)}
                  >
                    {showAllergens ? t.menuHideAllergens : t.menuShowAllergens}
                  </button>
                </div>
              </>
            ) : null}

            <div className="menu-files-wrap">
              <div className="menu-files-links">
                <a className="btn ghost" href={menuAssets.appetizers} target="_blank" rel="noreferrer">
                  {t.menuOpenAppetizers}
                </a>
                <a className="btn ghost" href={menuAssets.menus} target="_blank" rel="noreferrer">
                  {t.menuOpenMenus}
                </a>
              </div>
            </div>
          </section>
        ) : null}

        {activePage === "album" ? (
          <section id="album" className="section">
            <div className="section-heading">
              <p className="eyebrow">{t.albumEyebrow}</p>
              <h2>{t.albumTitle}</h2>
              <p>{t.albumText}</p>
            </div>
            <div className="beer-album-grid">
              {BEER_CATALOG.map((beer) => (
                <article
                  className="beer-album-card"
                  key={beer.id}
                  onClick={() => goToBeerSubgroup(beer)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") goToBeerSubgroup(beer); }}
                >
                  <div className="beer-album-img-wrap">
                    <img src={beer.img} alt={beer.name} loading="lazy" />
                  </div>
                  <div className="beer-album-info">
                    {beer.categoria ? <p className="beer-album-type">{beer.categoria}</p> : null}
                    <h3 className="beer-album-name">{beer.name}</h3>
                    {beer.origen ? <p className="beer-album-origin">{beer.origen}</p> : null}
                    {beer.graduacion ? <p className="beer-album-abv">{beer.graduacion}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activePage === "visitanos" ? (
          <section id="visitanos" className="section">
            <div className="section-heading">
              <p className="eyebrow">{t.visitEyebrow}</p>
              <h2>{t.visitTitle}</h2>
            </div>

            <div className="visit-grid">
              <article className="visit-card schedule-card">
                <h3>{t.scheduleTitle}</h3>
                <div className="schedule-list">
                  {scheduleRows.map((row) => (
                    <div className="schedule-item" key={row.day}>
                      <span>{row.day}</span>
                      <strong>{row.hours}</strong>
                    </div>
                  ))}
                </div>
              </article>

              <article className="visit-card">
                <h3>{t.addressTitle}</h3>
                <p>{t.addressText}</p>
                <div className="map-frame-wrap">
                  <iframe src={MAP_EMBED_URL} title="Bierwinkel map" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <a href={MAP_LINK_URL} target="_blank" rel="noreferrer" className="map-click-overlay" aria-label={t.mapLinkText}></a>
                </div>
              </article>

              <article className="visit-card">
                <h3>{t.reserveTitle}</h3>
                <p>{t.reserveText}</p>
                <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  {t.reserveBtn}: {MOBILE_PHONE}
                </a>
                <a className="btn ghost" href={`tel:${RESERVATION_PHONE.replace(/\s+/g, "")}`}>
                  {t.callBtn}: {RESERVATION_PHONE}
                </a>
                <a className="btn ghost" href={`tel:${MOBILE_PHONE.replace(/\s+/g, "")}`}>
                  {t.mobileBtn}: {MOBILE_PHONE}
                </a>
                <a className="btn ghost" href={`mailto:${CONTACT_EMAIL}`}>
                  Email: {CONTACT_EMAIL}
                </a>
              </article>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="site-footer">
        <p>{t.footerText}</p>
        <div className="footer-socials" aria-label="Canales de contacto">
          <a
            className="footer-icon-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
            </svg>
          </a>
          <a
            className="footer-icon-link"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2A10 10 0 0 0 3.4 17.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 7.9 9.3 8 8 0 0 1-11.8 5.2l-.4-.2-2.9.7.8-2.8-.3-.4A8 8 0 0 1 12 4Zm-3 4.3c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.5c.1.2 1.8 2.9 4.4 4 .6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.6-.7 1.8-1.4.2-.7.2-1.2.1-1.3-.1-.1-.3-.2-.6-.4l-1.1-.5c-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-1-1.7-2.1-1.9-2.5-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5L10 8.8c-.1-.4-.4-.5-.7-.5H9Z" />
            </svg>
          </a>
        </div>
        <div className="footer-meta-wrap">
          <span className="footer-meta">{new Date().getFullYear()} © Bierwinkel</span>
          <span className="footer-separator" aria-hidden="true">
            |
          </span>
          <span className="footer-credit">
            {t.footerDesignBy}{" "}
            <a href="https://websbybaltuki.com/" target="_blank" rel="noreferrer">
              WebsByBaltuki
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
