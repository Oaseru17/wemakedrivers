import type { Context } from '@netlify/functions'
import { ObjectId } from 'mongodb'
import { getDb } from './_db'

export default async (req: Request, _context: Context) => {
  const db = await getDb()
  const col = db.collection('blocked_slots')
  const headers = { 'Content-Type': 'application/json' }

  if (req.method === 'GET') {
    const url = new URL(req.url)
    const start = url.searchParams.get('start')
    const end = url.searchParams.get('end')
    const filter: Record<string, unknown> = {}
    if (start && end) filter.date = { $gte: start, $lte: end }
    const docs = await col.find(filter).toArray()
    return new Response(JSON.stringify(docs), { headers })
  }

  if (req.method === 'POST') {
    const { date, hour } = await req.json()
    const result = await col.insertOne({ date, hour })
    return new Response(JSON.stringify({ _id: result.insertedId, date, hour }), { headers })
  }

  if (req.method === 'DELETE') {
    const { id } = await req.json()
    await col.deleteOne({ _id: new ObjectId(id) })
    return new Response(JSON.stringify({ ok: true }), { headers })
  }

  return new Response('Method not allowed', { status: 405 })
}
