import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Navigation, CheckCircle } from 'lucide-react'
import PageBanner from '@/components/shared/PageBanner'
import { AREAS } from '@/lib/areas'
import { SITE, FEATURES, HOW_IT_WORKS } from '@/lib/site'
import { breadcrumbsJsonLd } from '@/lib/breadcrumbs'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const area = AREAS.find((a) => a.slug === slug)
  if (!area) return {}
  return {
    title: `Driving Lessons in ${area.name}`,
    description: `Looking for driving lessons in ${area.name} (${area.postcodes.join('/')})? WeMake Drivers covers ${area.name} and surrounding areas with DVSA-approved instructors. ${area.nearestTestCentre} test centre prep included. 98% first-time pass rate.`,
    alternates: { canonical: `https://wemakedrivers.co.uk/areas/${area.slug}` },
  }
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params
  const area = AREAS.find((a) => a.slug === slug)

  if (!area) notFound()

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'DrivingSchool',
    name: SITE.name,
    telephone: SITE.phone,
    url: `https://wemakedrivers.co.uk/areas/${area.slug}`,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressCountry: 'GB',
    },
    areaServed: [area.name, ...area.nearbyAreas],
  }

  const breadcrumbSchema = breadcrumbsJsonLd([
    { name: 'Home', url: 'https://wemakedrivers.co.uk' },
    { name: 'Areas', url: 'https://wemakedrivers.co.uk/areas' },
    { name: area.name, url: `https://wemakedrivers.co.uk/areas/${area.slug}` },
  ])

  return (
    <>
      <PageBanner title={`Driving Lessons in ${area.name}`} breadcrumb={area.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero intro */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 lg:w-3/5">
          <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
            Local Driving Lessons
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-6">
            Driving Lessons in {area.name}
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">{area.description}</p>
        </div>
      </section>

      {/* Facts strip */}
      <section className="bg-light py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-secondary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-primary mb-1">Postcodes</p>
                <p className="text-gray-500">{area.postcodes.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Navigation size={24} className="text-secondary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-primary mb-1">Nearest Test Centre</p>
                <p className="text-gray-500">{area.nearestTestCentre} DVSA Test Centre</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle size={24} className="text-secondary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-primary mb-1">Surrounding Areas</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {area.nearbyAreas.map((nearbyName) => {
                    const nearby = AREAS.find((a) => a.name === nearbyName)
                    return nearby ? (
                      <Link
                        key={nearby.slug}
                        href={`/areas/${nearby.slug}`}
                        className="text-secondary text-sm font-semibold hover:underline"
                      >
                        {nearbyName}
                      </Link>
                    ) : (
                      <span key={nearbyName} className="text-gray-500 text-sm">
                        {nearbyName}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why WeMake Drivers */}
      <section className="bg-accent py-20">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-12">
            Everything You Need to Pass in {area.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="border border-white/10 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            How It Works in {area.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary font-bold text-xl">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-primary text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start in {area.name}?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your first lesson today — your instructor comes to you.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-white text-secondary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Book a Lesson
          </Link>
        </div>
      </section>
    </>
  )
}
