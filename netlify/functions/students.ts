import type { Context } from '@netlify/functions'
import { ObjectId } from 'mongodb'
import { getDb } from './_db'

export default async (req: Request, _context: Context) => {
  const headers = { 'Content-Type': 'application/json' }

  try {
    const db = await getDb()
    const col = db.collection('students')

    if (req.method === 'GET') {
      const students = await col.find().sort({ created_at: -1 }).toArray()
      return new Response(JSON.stringify(students), { headers })
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const doc = { ...body, created_at: new Date().toISOString() }
      const result = await col.insertOne(doc)
      return new Response(JSON.stringify({ ...doc, _id: result.insertedId }), { headers })
    }

    if (req.method === 'PATCH') {
      const { id, ...updates } = await req.json()
      await col.updateOne({ _id: new ObjectId(id) }, { $set: updates })
      return new Response(JSON.stringify({ ok: true }), { headers })
    }

    if (req.method === 'DELETE') {
      const { id } = await req.json()
      await col.deleteOne({ _id: new ObjectId(id) })
      return new Response(JSON.stringify({ ok: true }), { headers })
    }

    return new Response('Method not allowed', { status: 405 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers })
  }
}
