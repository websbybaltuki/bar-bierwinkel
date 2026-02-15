import { useEffect, useMemo, useState } from "react";
import InstagramFeed from "./components/InstagramFeed";
import { supportedLanguages, translations } from "./i18n/translations";
import { menuSections, sourceDisclaimerEs } from "./data/menuData";

const MAP_EMBED_URL =
  import.meta.env.VITE_MAP_EMBED_URL ||
  "https://www.google.com/maps?q=Avinguda%20en%20Joan%20Carles%20I%2C%2024%2C%2003202%20Elx%2C%20Alicante&output=embed";
const RESERVATION_PHONE = import.meta.env.VITE_RESERVATION_PHONE || "+34 600 000 000";
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/34600000000";
const INSTAGRAM_PROFILE =
  import.meta.env.VITE_INSTAGRAM_PROFILE || "https://www.instagram.com/bierwinkel_elche/";
const INSTAGRAM_WIDGET_ID = import.meta.env.VITE_INSTAGRAM_WIDGET_ID || "";

const PAGE_KEYS = ["inicio", "menu", "visitanos"];
const PAGE_TRANSITION_MS = 280;
const FOOD_CATEGORIES = ["Aperitivos y Entrantes"];

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

  const t = translations[lang];
  const scheduleRows = t.scheduleRows || [];

  const filteredMenuSections = useMemo(() => {
    const isFood = menuType === "comida";
    return menuSections.filter((section) => {
      const inFood = FOOD_CATEGORIES.includes(section.category);
      return isFood ? inFood : !inFood;
    });
  }, [menuType]);

  const updateBrowserUrl = (page) => {
    if (page === "inicio") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }
    window.location.hash = page;
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <header className="site-header" id="top">
        <button className="logo logo-btn" onClick={() => navigateToPage("inicio")}>
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
          <button className={`nav-link-btn ${activePage === "visitanos" ? "active" : ""}`} onClick={() => navigateToPage("visitanos")}>
            {t.navVisit}
          </button>
        </nav>

        <div className="lang-switcher" role="group" aria-label="language switcher">
          <div className="lang-buttons-desktop">
            {supportedLanguages.map((code) => (
              <button
                key={code}
                className={`lang-btn ${lang === code ? "active" : ""}`}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="lang-select-wrap">
            <select
              className="lang-select"
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              aria-label="Seleccion de idioma"
            >
              {supportedLanguages.map((code) => (
                <option key={code} value={code}>
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
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
                  <strong>+120</strong>
                  <span>{t.statBeers}</span>
                </article>
                <article>
                  <strong>15</strong>
                  <span>{t.statTaps}</span>
                </article>
                <article>
                  <strong>2014</strong>
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

            <section id="eventos" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.eventsEyebrow}</p>
                <h2>{t.eventsTitle}</h2>
              </div>
              <div className="event-list">
                {t.events.map((event) => (
                  <article className="event-item" key={event.title}>
                    <p className="event-date">{event.day}</p>
                    <h3>{event.title}</h3>
                    <p>{event.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="instagram" className="section reveal home-section">
              <div className="section-heading">
                <p className="eyebrow">{t.instagramEyebrow}</p>
                <h2>{t.instagramTitle}</h2>
                <p>{t.instagramText}</p>
              </div>
              <InstagramFeed
                widgetId={INSTAGRAM_WIDGET_ID}
                fallbackPosts={t.instaFallback}
                profileUrl={INSTAGRAM_PROFILE}
                configHelp={t.instagramConfigHelp}
              />
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
                    <iframe src={MAP_EMBED_URL} title="Bierwinkel map home" loading="lazy"></iframe>
                  </div>
                </article>

                <article className="visit-card">
                  <h3>{t.reserveTitle}</h3>
                  <p>{t.reserveText}</p>
                  <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    {t.reserveBtn}
                  </a>
                  <a className="btn ghost" href={`tel:${RESERVATION_PHONE.replace(/\s+/g, "")}`}>
                    {t.callBtn}: {RESERVATION_PHONE}
                  </a>
                </article>
              </div>
            </section>

          </>
        ) : null}

        {activePage === "menu" ? (
          <section id="menu" className="section reveal">
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
            </div>

            <p className="menu-source-note">{sourceDisclaimerEs}</p>
            <p className="menu-source-note">{t.menuOfficialLinkText}</p>
            <div className={`menu-sections-grid ${filteredMenuSections.length === 1 ? "single-item" : ""}`}>
              {filteredMenuSections.map((section) => (
                <article className="menu-section-card" key={section.category}>
                  <h3>{section.category}</h3>
                  <ul className="menu-item-list">
                    {section.items.map((item) => (
                      <li key={`${section.category}-${item.name}`}>
                        <div className="menu-item-row">
                          <span className="menu-item-name">{item.name}</span>
                          <span className="menu-item-price">{item.price} €</span>
                        </div>
                        {item.note ? <small>{item.note}</small> : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activePage === "visitanos" ? (
          <section id="visitanos" className="section reveal">
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
                  <iframe src={MAP_EMBED_URL} title="Bierwinkel map" loading="lazy"></iframe>
                </div>
              </article>

              <article className="visit-card">
                <h3>{t.reserveTitle}</h3>
                <p>{t.reserveText}</p>
                <a className="btn primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  {t.reserveBtn}
                </a>
                <a className="btn ghost" href={`tel:${RESERVATION_PHONE.replace(/\s+/g, "")}`}>
                  {t.callBtn}: {RESERVATION_PHONE}
                </a>
              </article>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="site-footer">
        <p>{t.footerText}</p>
        <small>{new Date().getFullYear()} © Bierwinkel</small>
      </footer>
    </>
  );
}

export default App;
