import { useState, useEffect, useCallback } from 'react'
import { db } from './mongodb'
import type { Student, Booking, BlockedSlot } from './types'

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// --- Students ---

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    try {
      const { documents } = await db.find<Student>('students', {}, { created_at: -1 })
      if (documents) setStudents(documents)
    } catch (e) {
      console.error('Failed to fetch students:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const addStudent = async (student: Omit<Student, '_id' | 'created_at'>) => {
    const doc = { ...student, created_at: new Date().toISOString() }
    const { insertedId } = await db.insertOne('students', doc)
    const newStudent = { ...doc, _id: insertedId! } as Student
    setStudents((prev) => [newStudent, ...prev])
    return newStudent
  }

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    await db.updateOne('students', { _id: { $oid: id } }, { $set: updates })
    setStudents((prev) => prev.map((s) => s._id === id ? { ...s, ...updates } : s))
  }

  return { students, loading, addStudent, updateStudent, refetch: fetch }
}

// --- Bookings ---

export function useBookings(weekDates: Date[]) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetch = useCallback(async () => {
    if (!startDate || !endDate) return
    try {
      const { documents } = await db.find<Booking>('bookings', {
        date: { $gte: startDate, $lte: endDate },
      })
      if (documents) setBookings(documents)
    } catch (e) {
      console.error('Failed to fetch bookings:', e)
    }
    setLoading(false)
  }, [startDate, endDate])

  useEffect(() => { fetch() }, [fetch])

  const createBooking = async (booking: {
    student_id: string
    student_name: string
    student_phone: string
    student_area: string
    date: string
    hour: number
    lesson_type: string
    rate: number
  }) => {
    const doc = { ...booking, status: 'confirmed', created_at: new Date().toISOString() }
    const { insertedId } = await db.insertOne('bookings', doc)
    const newBooking = { ...doc, _id: insertedId! } as Booking
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBooking = async (id: string, updates: { status?: string }) => {
    await db.updateOne('bookings', { _id: { $oid: id } }, { $set: updates })
    setBookings((prev) => prev.map((b) => b._id === id ? { ...b, ...updates } as Booking : b))
  }

  return { bookings, loading, createBooking, updateBooking, refetch: fetch }
}

// --- Upcoming bookings ---

export function useUpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  const fetch = useCallback(async () => {
    const today = fmt(new Date())
    try {
      const { documents } = await db.find<Booking>(
        'bookings',
        { date: { $gte: today }, status: 'confirmed' },
        { date: 1, hour: 1 },
        8,
      )
      if (documents) setBookings(documents)
    } catch (e) {
      console.error('Failed to fetch upcoming:', e)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { bookings, refetch: fetch }
}

// --- Blocked Slots ---

export function useBlockedSlots(weekDates: Date[]) {
  const [blocked, setBlocked] = useState<BlockedSlot[]>([])

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetch = useCallback(async () => {
    if (!startDate || !endDate) return
    try {
      const { documents } = await db.find<BlockedSlot>('blocked_slots', {
        date: { $gte: startDate, $lte: endDate },
      })
      if (documents) setBlocked(documents)
    } catch (e) {
      console.error('Failed to fetch blocked slots:', e)
    }
  }, [startDate, endDate])

  useEffect(() => { fetch() }, [fetch])

  const toggleBlock = async (date: string, hour: number) => {
    const existing = blocked.find((b) => b.date === date && b.hour === hour)
    if (existing) {
      await db.deleteOne('blocked_slots', { _id: { $oid: existing._id } })
      setBlocked((prev) => prev.filter((b) => b._id !== existing._id))
    } else {
      const { insertedId } = await db.insertOne('blocked_slots', { date, hour })
      if (insertedId) setBlocked((prev) => [...prev, { _id: insertedId, date, hour }])
    }
  }

  const isBlocked = (date: string, hour: number) =>
    blocked.some((b) => b.date === date && b.hour === hour)

  return { blocked, isBlocked, toggleBlock }
}
