//gtag.js

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID

let isConsentGiven = false;

export const setConsent = (consent) => {
  isConsentGiven = consent;
  if (isConsentGiven) {
    initGA();
  }
}

const initGA = () => {
  if (!window.gtag) {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
}

export const pageview = url => {
  if (isConsentGiven) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
}

export const event = ({ action, category, label, value }) => {
  if (isConsentGiven) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
