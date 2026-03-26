import { useEffect } from 'react'
import { SITE } from '../../data/site'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
}

function SEO({
  title,
  description = 'Learn to drive in London with WeMake Drivers. DVSA-approved instructors, flexible scheduling, and a 98% pass rate. Book your driving lessons today.',
  path = '',
  type = 'website',
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — Learn to Drive in London`
  const url = `https://wemakedrivers.co.uk${path}`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:site_name', SITE.name, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('robots', 'index, follow')
  }, [fullTitle, description, url, type])

  return null
}

export { SEO as default }
