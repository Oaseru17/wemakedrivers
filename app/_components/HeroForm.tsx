'use client'

import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

function HeroForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setFormStatus('sending')

    const fd = new FormData(form)
    const payload = {
      source: 'hero' as const,
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      area: fd.get('area') as string,
      postcode: fd.get('postcode') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send')
      setFormStatus('sent')
      trackEvent('generate_lead', { event_category: 'engagement', event_label: 'hero_form' })
      form.reset()
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-xl">
      <h3 className="text-xl font-bold text-primary mb-6">Start Your Journey</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name*"
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number*"
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
        />
        <select
          name="area"
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors text-gray-500"
          defaultValue=""
          required
        >
          <option value="" disabled>Select your area*</option>
          <option value="Barnet">Barnet</option>
          <option value="Camden">Camden</option>
          <option value="Colindale">Colindale</option>
          <option value="Cricklewood">Cricklewood</option>
          <option value="Crouch End">Crouch End</option>
          <option value="Edgware">Edgware</option>
          <option value="Edmonton">Edmonton</option>
          <option value="Finchley">Finchley</option>
          <option value="Golders Green">Golders Green</option>
          <option value="Hampstead">Hampstead</option>
          <option value="Hendon">Hendon</option>
          <option value="Highgate">Highgate</option>
          <option value="Mill Hill">Mill Hill</option>
          <option value="Muswell Hill">Muswell Hill</option>
          <option value="Southgate">Southgate</option>
          <option value="Tottenham">Tottenham</option>
          <option value="Walthamstow">Walthamstow</option>
          <option value="Whetstone">Whetstone</option>
          <option value="Wood Green">Wood Green</option>
        </select>
        <input
          name="postcode"
          type="text"
          placeholder="Or enter your postcode (e.g. SW1A 1AA)"
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
        />
        <button
          type="submit"
          disabled={formStatus === 'sending'}
          className="w-full bg-primary text-white py-3.5 rounded font-semibold uppercase tracking-wider text-sm hover:bg-accent transition-colors disabled:opacity-60"
        >
          {formStatus === 'sending' && <Loader2 size={16} className="inline animate-spin mr-2" />}
          {formStatus === 'sent' ? 'Sent!' : formStatus === 'error' ? 'Try Again' : 'Get Started'}
        </button>
        {formStatus === 'sent' && (
          <p className="text-green-600 text-sm flex items-center gap-1.5">
            <CheckCircle2 size={14} /> We'll be in touch shortly.
          </p>
        )}
        {formStatus === 'error' && (
          <p className="text-red-500 text-sm">Something went wrong. Please try again or call us.</p>
        )}
      </form>
    </div>
  )
}

export { HeroForm as default }
