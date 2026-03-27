import { useState, useEffect, useCallback } from 'react'
import { api, IS_API_AVAILABLE } from './api'
import { MOCK_STUDENTS, MOCK_BOOKINGS } from '../data/schedule'
import type { Student, Booking } from '../data/schedule'

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// --- Students ---

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStudents = useCallback(async () => {
    if (IS_API_AVAILABLE) {
      try {
        const data = await api.get<Student[]>('/students')
        setStudents(data)
      } catch (e) {
        console.error('Failed to fetch students:', e)
        setStudents(MOCK_STUDENTS)
      }
    } else {
      setStudents(MOCK_STUDENTS)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchStudents() }, [fetchStudents])

  const addStudent = async (student: Omit<Student, 'id' | 'createdAt'>) => {
    if (IS_API_AVAILABLE) {
      const data = await api.post<Student>('/students', student)
      setStudents((prev) => [data, ...prev])
      return data
    }
    const newStudent = {
      ...student,
      id: `s${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalPaid: 0,
      lessonsCompleted: 0,
    } as Student
    setStudents((prev) => [newStudent, ...prev])
    return newStudent
  }

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    if (IS_API_AVAILABLE) {
      await api.patch('/students', { id, ...updates })
    }
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s))
  }

  return { students, loading, addStudent, updateStudent, refetch: fetchStudents }
}

// --- Bookings ---

export function useBookings(weekDates: Date[]) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetchBookings = useCallback(async () => {
    if (!startDate || !endDate) return
    if (IS_API_AVAILABLE) {
      try {
        const data = await api.get<Booking[]>(`/bookings?start=${startDate}&end=${endDate}`)
        setBookings(data)
      } catch (e) {
        console.error('Failed to fetch bookings:', e)
        setBookings(MOCK_BOOKINGS.filter((b) => b.date >= startDate && b.date <= endDate && b.status !== 'cancelled'))
      }
    } else {
      setBookings(MOCK_BOOKINGS.filter((b) => b.date >= startDate && b.date <= endDate && b.status !== 'cancelled'))
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
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      ...booking,
      status: 'confirmed',
      payments: [],
    }
    if (IS_API_AVAILABLE) {
      const data = await api.post<Booking>('/bookings', booking)
      setBookings((prev) => [...prev, data])
      return data
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  const updateBooking = async (id: string, updates: { status?: string }) => {
    if (IS_API_AVAILABLE) {
      await api.patch('/bookings', { id, ...updates })
    }
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, ...updates } as Booking : b))
  }

  return { bookings, loading, createBooking, updateBooking, refetch: fetchBookings }
}

// --- Upcoming bookings ---

export function useUpcomingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  const fetchUpcoming = useCallback(async () => {
    const today = fmt(new Date())
    if (IS_API_AVAILABLE) {
      try {
        const data = await api.get<Booking[]>('/bookings?upcoming=true')
        setBookings(data)
        return
      } catch (e) {
        console.error('Failed to fetch upcoming:', e)
      }
    }
    setBookings(
      MOCK_BOOKINGS
        .filter((b) => b.date >= today && b.status === 'confirmed')
        .sort((a, b) => a.date.localeCompare(b.date) || a.hour - b.hour)
        .slice(0, 8)
    )
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
    if (IS_API_AVAILABLE) {
      try {
        const data = await api.get<BlockedSlotLocal[]>(`/blocked-slots?start=${startDate}&end=${endDate}`)
        setBlocked(data)
      } catch {
        setBlocked([])
      }
    }
  }, [startDate, endDate])

  useEffect(() => { fetchBlocked() }, [fetchBlocked])

  const toggleBlock = async (date: string, hour: number) => {
    const existing = blocked.find((b) => b.date === date && b.hour === hour)
    if (existing) {
      if (IS_API_AVAILABLE) await api.del('/blocked-slots', { id: existing.id })
      setBlocked((prev) => prev.filter((b) => b.id !== existing.id))
    } else {
      if (IS_API_AVAILABLE) {
        const data = await api.post<BlockedSlotLocal>('/blocked-slots', { date, hour })
        setBlocked((prev) => [...prev, data])
      } else {
        setBlocked((prev) => [...prev, { id: `bl${Date.now()}`, date, hour }])
      }
    }
  }

  const isBlocked = (date: string, hour: number) =>
    blocked.some((b) => b.date === date && b.hour === hour)

  return { blocked, isBlocked, toggleBlock }
}
