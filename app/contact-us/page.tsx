import type { Metadata } from 'next'
import { Phone, Users, MessageCircle, HeadphonesIcon } from 'lucide-react'
import PageBanner from '@/components/shared/PageBanner'
import { SITE } from '@/lib/site'
import ContactForm from './_components/ContactForm'
import { breadcrumbsJsonLd } from '@/lib/breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact WeMake Drivers to book driving lessons in North London. Call, email, or WhatsApp us. DVSA-approved driving instructors covering North London — Hendon, Finchley, Golders Green and surrounding areas.',
  alternates: { canonical: 'https://wemakedrivers.co.uk/contact-us' },
}

const breadcrumbSchema = breadcrumbsJsonLd([
  { name: 'Home', url: 'https://wemakedrivers.co.uk' },
  { name: 'Contact Us', url: 'https://wemakedrivers.co.uk/contact-us' },
])

const contactMethods = [
  {
    icon: Phone,
    color: 'bg-secondary',
    title: 'Call on Phone',
    description: 'Give us a ring and speak directly with our friendly booking team.',
  },
  {
    icon: Users,
    color: 'bg-accent',
    title: 'Follow Social',
    description: 'Stay connected with us on social media for tips and updates.',
  },
  {
    icon: MessageCircle,
    color: 'bg-gold',
    title: 'Chat with Us',
    description: 'Start a live chat and get instant answers to your questions.',
  },
  {
    icon: HeadphonesIcon,
    color: 'bg-primary',
    title: 'Helpful Support',
    description: 'Our support team is available 7 days a week to assist you.',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Contact Methods */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-5`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden min-h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-dark" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">North London Coverage Area</h3>
                <p className="text-gray-300 text-sm">{SITE.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-light">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#25D366' }}>
              <MessageCircle size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">Prefer WhatsApp?</h2>
            <p className="text-gray-500 mb-6">
              Message us directly — we usually reply within minutes.
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={20} />
              Message Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
