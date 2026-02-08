/**
 * Google Analytics 4 helper
 * Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env to enable
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function pageview(url) {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
  }
}

export function event({ action, category, label, value }) {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}
