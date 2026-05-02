import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WebVitals from '@/app/_components/WebVitals'
import { SITE } from '@/lib/site'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wemakedrivers.co.uk'),
  title: {
    default: `${SITE.name} — Learn to Drive in North London`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Looking for driving lessons in North London? WeMake Drivers offers DVSA-approved driving instructors with a 98% first-time pass rate. Book automatic or manual driving lessons across North London. Pass your driving test with confidence.',
  keywords: 'driving lessons North London, driving instructor North London, driving lessons Hendon, driving lessons Finchley, driving lessons Golders Green, learn to drive North London, automatic driving lessons, manual driving lessons, DVSA approved instructor',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — Learn to Drive in North London`,
    description:
      'DVSA-approved driving instructors in North London with a 98% first-time pass rate. Book automatic or manual lessons today.',
    url: 'https://wemakedrivers.co.uk',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'WeMake Drivers — Learn to Drive in North London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Learn to Drive in North London`,
    description:
      'DVSA-approved driving instructors in North London with a 98% first-time pass rate.',
    images: [{ url: '/twitter-image', width: 1200, height: 630, alt: 'WeMake Drivers — Learn to Drive in North London' }],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://wemakedrivers.co.uk',
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

const GA_ID = 'G-6549048JEM'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'DrivingSchool'],
  name: SITE.name,
  telephone: SITE.phone,
  url: 'https://wemakedrivers.co.uk',
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'North London',
    addressCountry: 'GB',
  },
  areaServed: [
    'Barnet', 'Camden', 'Colindale', 'Cricklewood', 'Crouch End', 'Edgware',
    'Edmonton', 'Finchley', 'Golders Green', 'Hampstead', 'Hendon', 'Highgate',
    'Mill Hill', 'Muswell Hill', 'Southgate', 'Tottenham', 'Walthamstow',
    'Whetstone', 'Wood Green',
  ],
  priceRange: '££',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '20:00',
    },
  ],
  // aggregateRating intentionally omitted until real GBP/Trustpilot reviews exist —
  // synthetic rating values violate Google's structured-data policy and risk a manual action.
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* JSON-LD in <head> so it appears in SSR HTML before any JS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <WebVitals />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
