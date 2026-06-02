(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────
  const GA_ID         = 'G-LX775TTC7E';
  const CONSENT_KEY   = 'ck_consent_v1';
  const CONSENT_EXPIRY_DAYS = 365;

  // ── State ────────────────────────────────────────────────────────
  let state = { analytics: false, given: false };

  // ── Helpers ──────────────────────────────────────────────────────
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${d.toUTCString()};path=/;SameSite=Lax;Secure`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
    try { return match ? JSON.parse(decodeURIComponent(match[1])) : null; } catch { return null; }
  }

  function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  // ── UI ───────────────────────────────────────────────────────────
  function showBanner() {
    document.getElementById('ck-overlay').style.display = 'flex';
    document.getElementById('ck-revoke-btn').style.display = 'none';
    document.body.style.overflow = 'hidden';
  }

  function hideBanner() {
    document.getElementById('ck-overlay').style.display = 'none';
    document.getElementById('ck-revoke-btn').style.display = 'block';
    document.body.style.overflow = '';
  }

  function syncToggle() {
    document.getElementById('ck-analytics').checked = state.analytics;
  }

  // ── Google Analytics loading ──────────────────────────────────────
  function loadGA() {
    if (document.getElementById('ck-ga-script')) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    const s = document.createElement('script');
    s.id = 'ck-ga-script';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }

  function unloadGA() {
    ['_ga', `_ga_${GA_ID.replace('G-', '')}`].forEach(name => deleteCookie(name));
  }

  // ── Default Consent Mode (vor jeder Nutzeraktion) ─────────────────
  function initConsentMode() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
  }

  // ── Save & Apply ──────────────────────────────────────────────────
  function applyConsent(analyticsAllowed) {
    state.analytics = analyticsAllowed;
    state.given     = true;
    setCookie(CONSENT_KEY, state, CONSENT_EXPIRY_DAYS);

    if (analyticsAllowed) {
      loadGA();
    } else {
      unloadGA();
    }

    hideBanner();
    syncToggle();

    document.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: { ...state } }));
  }

  // ── Public API ────────────────────────────────────────────────────
  window.CookieConsent = {
    acceptAll() { applyConsent(true); },
    rejectAll()  { applyConsent(false); },
    saveSelection() {
      const allowed = document.getElementById('ck-analytics').checked;
      applyConsent(allowed);
    },
    showSettings() {
      showBanner();
      syncToggle();
    },
    toggleDetails(btn) {
      const categories = document.getElementById('ck-categories');
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      categories.hidden = open;
    },
    reset() {
      deleteCookie(CONSENT_KEY);
      state = { analytics: false, given: false };
      showBanner();
      document.getElementById('ck-analytics').checked = false;
    }
  };

  // ── Init ──────────────────────────────────────────────────────────
  initConsentMode();

  const saved = getCookie(CONSENT_KEY);
  if (saved && saved.given) {
    state = saved;
    if (state.analytics) loadGA();
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('ck-revoke-btn').style.display = 'block';
    });
  } else {
    document.addEventListener('DOMContentLoaded', showBanner);
  }

})();
