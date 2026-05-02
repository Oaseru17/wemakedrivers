import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const filter: Record<string, unknown> = {}
    if (start && end) filter.date = { $gte: start, $lte: end }
    const docs = await db.collection('blocked_slots').find(filter).toArray()
    return NextResponse.json(docs)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb()
    const { date, hour } = await req.json()
    const result = await db.collection('blocked_slots').insertOne({ date, hour })
    return NextResponse.json({ _id: result.insertedId, date, hour })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const db = await getDb()
    const { id } = await req.json()
    await db.collection('blocked_slots').deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
