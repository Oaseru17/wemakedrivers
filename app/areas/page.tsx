import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import PageBanner from '@/components/shared/PageBanner'
import { AREAS } from '@/lib/areas'

export const metadata: Metadata = {
  title: 'Areas We Cover | WeMake Drivers',
  description:
    'WeMake Drivers covers 18 North London areas: Barnet, Camden, Colindale, Cricklewood, Crouch End, Edgware, Edmonton, Finchley, Golders Green, Hampstead, Hendon, Highgate, Mill Hill, Muswell Hill, Southgate, Tottenham, Walthamstow, Whetstone, Wood Green.',
  alternates: { canonical: 'https://wemakedrivers.co.uk/areas' },
}

export default function AreasIndexPage() {
  return (
    <>
      <PageBanner title="Areas We Cover" breadcrumb="Areas" />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-500 leading-relaxed mb-12 max-w-2xl">
            We cover 18 areas across North London. Your instructor comes to you — no commute,
            no fuss. Choose your area below to see local routes, nearby test centres, and
            what makes driving in your neighbourhood unique.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group flex flex-col gap-2 bg-light rounded-xl p-5 hover:bg-secondary/10 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                <div className="flex items-center gap-2 text-secondary">
                  <MapPin size={16} className="shrink-0" />
                  <span className="font-bold text-primary group-hover:text-secondary transition-colors">
                    {area.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{area.postcodes.join(', ')}</p>
                <span className="text-secondary text-xs font-semibold mt-1 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
