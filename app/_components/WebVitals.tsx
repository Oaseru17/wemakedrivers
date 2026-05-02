'use client'

import { useReportWebVitals } from 'next/web-vitals'

function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  })
  return null
}

export { WebVitals as default }
