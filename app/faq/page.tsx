import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import PageBanner from '@/components/shared/PageBanner'
import { FAQS } from '@/lib/faqs'
import { breadcrumbsJsonLd } from '@/lib/breadcrumbs'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about WeMake Drivers — lesson costs, manual vs automatic, areas covered, how long to get test-ready, cancellation policy, intensive courses, DVSA-approved instructors and Pass Plus.',
  alternates: { canonical: 'https://wemakedrivers.co.uk/faq' },
}

const breadcrumbSchema = breadcrumbsJsonLd([
  { name: 'Home', url: 'https://wemakedrivers.co.uk' },
  { name: 'FAQ', url: 'https://wemakedrivers.co.uk/faq' },
])

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FaqPage() {
  return (
    <>
      <PageBanner title="Frequently Asked Questions" breadcrumb="FAQ" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-primary hover:text-secondary transition-colors">
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-secondary transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div
                  className="px-6 pb-5 text-gray-600 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-white/80 mb-8">
            Our team is happy to help — get in touch and we'll answer anything you need to know.
          </p>
          <Link
            href="/contact-us"
            className="inline-block bg-white text-secondary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
