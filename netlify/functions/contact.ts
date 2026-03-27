import type { Context } from '@netlify/functions'
import { Resend } from 'resend'

interface ContactPayload {
  source: 'hero' | 'contact'
  name: string
  email: string
  phone: string
  area?: string
  postcode?: string
  subject?: string
  message?: string
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ['source', 'name', 'phone']

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHtml(data: ContactPayload): string {
  const rows: string[] = []

  const add = (label: string, value: string | undefined) => {
    if (value) rows.push(`<tr><td style="padding:8px 12px;font-weight:600;color:#2d2f3e">${label}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`)
  }

  add('Name', data.name)
  add('Email', data.email)
  add('Phone', data.phone)
  add('Area', data.area)
  add('Postcode', data.postcode)
  add('Subject', data.subject)
  add('Message', data.message)

  const heading = data.source === 'hero'
    ? 'New Lead — Start Your Journey Form'
    : 'New Message — Contact Form'

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#3cb878;padding:20px 24px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;color:#fff;font-size:20px">${heading}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:0 0 8px 8px">
        ${rows.join('')}
      </table>
      <p style="color:#999;font-size:12px;margin-top:16px">Sent from wemakedrivers.co.uk</p>
    </div>
  `
}

export default async (req: Request, _context: Context) => {
  const headers = { 'Content-Type': 'application/json' }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const data: ContactPayload = await req.json()

    for (const field of REQUIRED_FIELDS) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers },
        )
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const subjectLine = data.source === 'hero'
      ? `New Lead: ${escapeHtml(data.name)} — ${escapeHtml(data.area || 'London')}`
      : `Contact: ${escapeHtml(data.subject || 'General enquiry')} — ${escapeHtml(data.name)}`

    await resend.emails.send({
      from: 'WeMake Drivers <onboarding@resend.dev>',
      to: 'wemakedrivers@gmail.com',
      replyTo: data.email || undefined,
      subject: subjectLine,
      html: buildHtml(data),
    })

    return new Response(JSON.stringify({ ok: true }), { headers })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers })
  }
}
