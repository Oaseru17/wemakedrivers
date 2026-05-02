'use client'

import { useState, type FormEvent } from 'react'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    <div>
      <SectionHeading
        subtitle="Get in Touch"
        title="Talk to us?"
        description="You have questions and we have answers!"
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
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
  )
}

export { ContactForm as default }
