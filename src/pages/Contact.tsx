import { useState, type FormEvent } from 'react'
import { Phone, Users, MessageCircle, HeadphonesIcon, Send, Loader2, CheckCircle2 } from 'lucide-react'
import PageBanner from '../components/shared/PageBanner'
import SectionHeading from '../components/shared/SectionHeading'
import { SITE } from '../data/site'
import SEO from '../components/shared/SEO'
import { trackEvent } from '../lib/analytics'

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

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setFormStatus('sending')

    const fd = new FormData(form)
    const payload = {
      source: 'contact' as const,
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      subject: fd.get('subject') as string,
      message: fd.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send')
      setFormStatus('sent')
      trackEvent('contact', { event_category: 'engagement', event_label: 'contact_form' })
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact WeMake Drivers to book driving lessons in London. Call, email, or WhatsApp us. DVSA-approved driving instructors covering North, South, East, West and Central London."
        path="/contact-us"
      />
      <PageBanner title="Contact Us" />

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
            {/* Form */}
            <div>
              <SectionHeading
                subtitle="Get in Touch"
                title="Talk to us?"
                description="You have questions and we have answers!"
              />
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name*"
                    required
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number*"
                    required
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-secondary transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-60"
                >
                  {formStatus === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {formStatus === 'sent' ? 'Sent!' : formStatus === 'error' ? 'Try Again' : 'Submit Message'}
                </button>
                {formStatus === 'sent' && (
                  <p className="text-green-600 text-sm flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Thanks for your message. We'll get back to you soon.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or call us.</p>
                )}
              </form>
            </div>

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
                <h3 className="text-xl font-bold mb-1">London Coverage Area</h3>
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

export default Contact
