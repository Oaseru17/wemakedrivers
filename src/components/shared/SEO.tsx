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
  description = 'Learn to drive in North London with WeMake Drivers. DVSA-approved instructors covering Hendon, Finchley, Golders Green and surrounding areas. 98% pass rate.',
  path = '',
  type = 'website',
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} — Learn to Drive in North London`
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
    setMeta('keywords', 'driving lessons North London, driving instructor North London, driving lessons Hendon, driving lessons Finchley, driving lessons Golders Green, learn to drive North London, automatic driving lessons, manual driving lessons, DVSA approved instructor')

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [fullTitle, description, url, type])

  return null
}

export { SEO as default }
