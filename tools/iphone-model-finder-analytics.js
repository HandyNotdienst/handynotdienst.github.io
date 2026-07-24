window.HN_GA_MEASUREMENT_ID = "G-WR8LVE0JCB";
    window.HN_COOKIE_CONSENT_KEY = "hn_cookie_consent";
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    const hnAnalyticsConsent = (() => {
      try {
        return localStorage.getItem(window.HN_COOKIE_CONSENT_KEY);
      } catch (error) {
        return null;
      }
    })();
    gtag("consent", "default", {
      analytics_storage: hnAnalyticsConsent === "granted" ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    });
    gtag("js", new Date());
    gtag("config", window.HN_GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: hnAnalyticsConsent === "granted"
    });
