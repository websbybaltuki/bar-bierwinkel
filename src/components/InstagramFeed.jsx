import { useEffect, useMemo } from "react";

const scriptSelector = "script[data-instagram-provider='elfsight']";

function InstagramFeed({ widgetId, fallbackPosts, profileUrl, configHelp }) {
  const normalizedProfileUrl = useMemo(() => {
    const fallbackUrl = "https://www.instagram.com/bierwinkel_elche/";
    if (!profileUrl) return fallbackUrl;

    try {
      const parsed = new URL(profileUrl);
      parsed.search = "";
      parsed.hash = "";
      parsed.pathname = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
      return parsed.toString();
    } catch {
      return fallbackUrl;
    }
  }, [profileUrl]);

  const embedProfileUrl = `${normalizedProfileUrl}embed`;

  useEffect(() => {
    if (!widgetId) return;
    if (document.querySelector(scriptSelector)) return;

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.dataset.instagramProvider = "elfsight";
    document.body.appendChild(script);
  }, [widgetId]);

  if (widgetId) {
    return (
      <div className="instagram-widget-wrap">
        <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy="true"></div>
      </div>
    );
  }

  return (
    <>
      <p className="config-help">{configHelp}</p>
      <div className="instagram-profile-wrap">
        <iframe
          src={embedProfileUrl}
          title="Instagram Bierwinkel Elche"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <div className="insta-grid">
        {fallbackPosts.map((post) => (
          <a key={post} className="insta-card" href={normalizedProfileUrl} target="_blank" rel="noreferrer">
            <span>{post}</span>
          </a>
        ))}
      </div>
    </>
  );
}

export default InstagramFeed;
