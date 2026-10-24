/**
 * Analytics-ready event helper. Pushes to window.dataLayer (GA4 / Google Tag
 * Manager compatible). Does nothing until NEXT_PUBLIC_GA_ID is configured.
 */
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}
