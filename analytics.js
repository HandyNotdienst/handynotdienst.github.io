(() => {
  const GA_MEASUREMENT_ID = "G-WR8LVE0JCB";
  const COOKIE_CONSENT_KEY = "hn_cookie_consent";

  window.HN_GA_MEASUREMENT_ID = window.HN_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID;
  window.HN_COOKIE_CONSENT_KEY = window.HN_COOKIE_CONSENT_KEY || COOKIE_CONSENT_KEY;
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  function getStoredConsent() {
    try {
      return localStorage.getItem(window.HN_COOKIE_CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function loadGoogleTag(options = {}) {
    const sendPageView = Boolean(options.sendPageView);
    if (window.HN_GTAG_LOADED) {
      if (sendPageView) {
        window.gtag("config", window.HN_GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          send_page_view: true,
        });
      }
      return;
    }

    window.HN_GTAG_LOADED = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(window.HN_GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", window.HN_GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: sendPageView,
    });
  }

  window.HN_LOAD_ANALYTICS = loadGoogleTag;

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });

  if (getStoredConsent() === "granted") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    loadGoogleTag({ sendPageView: true });
  }
})();
