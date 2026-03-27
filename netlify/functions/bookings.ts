import type { Context } from '@netlify/functions'
import { ObjectId } from 'mongodb'
import { getDb } from './_db'

export default async (req: Request, _context: Context) => {
  const headers = { 'Content-Type': 'application/json' }

  try {
    const db = await getDb()
    const col = db.collection('bookings')

    if (req.method === 'GET') {
      const url = new URL(req.url)
      const start = url.searchParams.get('start')
      const end = url.searchParams.get('end')
      const upcoming = url.searchParams.get('upcoming')

      if (upcoming === 'true') {
        const today = new Date().toISOString().split('T')[0]
        const docs = await col
          .find({ date: { $gte: today }, status: 'confirmed' })
          .sort({ date: 1, hour: 1 })
          .limit(8)
          .toArray()
        return new Response(JSON.stringify(docs), { headers })
      }

      const filter: Record<string, unknown> = {}
      if (start && end) filter.date = { $gte: start, $lte: end }
      const docs = await col.find(filter).sort({ date: 1, hour: 1 }).toArray()
      return new Response(JSON.stringify(docs), { headers })
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const doc = { ...body, status: 'confirmed', created_at: new Date().toISOString() }
      const result = await col.insertOne(doc)
      return new Response(JSON.stringify({ ...doc, _id: result.insertedId }), { headers })
    }

    if (req.method === 'PATCH') {
      const { id, ...updates } = await req.json()
      await col.updateOne({ _id: new ObjectId(id) }, { $set: updates })
      return new Response(JSON.stringify({ ok: true }), { headers })
    }

    return new Response('Method not allowed', { status: 405 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers })
  }
}
