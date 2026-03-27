import { useState, useEffect, useCallback } from 'react'
import { api } from './api'
import type { Student, Booking } from '../data/schedule'

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// --- Students ---

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = useCallback(async () => {
    try {
      const data = await api.get<Student[]>('/students')
      setStudents(data)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load students')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const addStudent = async (student: Omit<Student, 'id' | 'createdAt'>) => {
    const data = await api.post<Student>('/students', student)
    setStudents((prev) => [data, ...prev])
    return data
  }

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    await api.patch('/students', { id, ...updates })
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s))
  }

  return { students, loading, error, addStudent, updateStudent, refetch: fetchStudents }
}

// --- Bookings ---

export function useBookings(weekDates: Date[]) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetchBookings = useCallback(async () => {
    if (!startDate || !endDate) return
    try {
      const data = await api.get<Booking[]>(`/bookings?start=${startDate}&end=${endDate}`)
      setBookings(data)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load bookings')
    }
    setLoading(false)
  }, [startDate, endDate])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const createBooking = async (booking: {
    studentId: string
    studentName: string
    phone: string
    email: string
    area: string
    lessonType: Booking['lessonType']
    lessonRate: number
    date: string
    hour: number
  }) => {
    const data = await api.post<Booking>('/bookings', booking)
    setBookings((prev) => [...prev, data])
    return data
  }

  const updateBooking = async (id: string, updates: { status?: string }) => {
    await api.patch('/bookings', { id, ...updates })
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...updates } as Booking : b))
  }

  return { bookings, loading, error, createBooking, updateBooking, refetch: fetchBookings }
}

// --- Upcoming bookings ---

export function useUpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  const fetchUpcoming = useCallback(async () => {
    try {
      const data = await api.get<Booking[]>('/bookings?upcoming=true')
      setBookings(data)
    } catch {
      setBookings([])
    }
  }, [])

  useEffect(() => { fetchUpcoming() }, [fetchUpcoming])

  return { bookings, refetch: fetchUpcoming }
}

// --- Blocked Slots ---

export interface BlockedSlotLocal {
  id: string
  date: string
  hour: number
}

export function useBlockedSlots(weekDates: Date[]) {
  const [blocked, setBlocked] = useState<BlockedSlotLocal[]>([])

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetchBlocked = useCallback(async () => {
    if (!startDate || !endDate) return
    try {
      const data = await api.get<BlockedSlotLocal[]>(`/blocked-slots?start=${startDate}&end=${endDate}`)
      setBlocked(data)
    } catch {
      setBlocked([])
    }
  }, [startDate, endDate])

  useEffect(() => { fetchBlocked() }, [fetchBlocked])

  const toggleBlock = async (date: string, hour: number) => {
    const existing = blocked.find((b) => b.date === date && b.hour === hour)
    if (existing) {
      await api.del('/blocked-slots', { id: existing.id })
      setBlocked((prev) => prev.filter((b) => b.id !== existing.id))
    } else {
      const data = await api.post<BlockedSlotLocal>('/blocked-slots', { date, hour })
      setBlocked((prev) => [...prev, data])
    }
  }

  const isBlocked = (date: string, hour: number) =>
    blocked.some((b) => b.date === date && b.hour === hour)

  return { blocked, isBlocked, toggleBlock }
}
