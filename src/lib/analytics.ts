declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function trackPageView(path: string) {
  if (typeof window.gtag !== 'function') return
  window.gtag('config', 'G-6549048JEM', {
    page_path: path,
  })
}

export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
