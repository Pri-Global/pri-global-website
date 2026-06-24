import { useState, useEffect } from "react";

import { COOKIE_CONSENT_KEY } from "../lib/cookieConsent";

const EVENT = "pri-cookie-banner-change";

export function notifyCookieBannerChange(visible) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { visible } }));
}

export function useCookieBannerVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        return !localStorage.getItem(COOKIE_CONSENT_KEY);
      } catch {
        return false;
      }
    };

    const timer = setTimeout(() => {
      if (read()) {
        setVisible(true);
        notifyCookieBannerChange(true);
      }
    }, 800);

    const onChange = (e) => setVisible(Boolean(e.detail?.visible));

    window.addEventListener(EVENT, onChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  return visible;
}
