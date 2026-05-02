import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const col = db.collection('bookings')
    const { searchParams } = new URL(req.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const upcoming = searchParams.get('upcoming')

    if (upcoming === 'true') {
      const today = new Date().toISOString().split('T')[0]
      const docs = await col
        .find({ date: { $gte: today }, status: 'confirmed' })
        .sort({ date: 1, hour: 1 })
        .limit(8)
        .toArray()
      return NextResponse.json(docs)
    }

    const filter: Record<string, unknown> = {}
    if (start && end) filter.date = { $gte: start, $lte: end }
    const docs = await col.find(filter).sort({ date: 1, hour: 1 }).toArray()
    return NextResponse.json(docs)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb()
    const body = await req.json()
    const doc = { ...body, status: 'confirmed', created_at: new Date().toISOString() }
    const result = await db.collection('bookings').insertOne(doc)
    return NextResponse.json({ ...doc, _id: result.insertedId })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db = await getDb()
    const { id, ...updates } = await req.json()
    await db.collection('bookings').updateOne({ _id: new ObjectId(id) }, { $set: updates })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
