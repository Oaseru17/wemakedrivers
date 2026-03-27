import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { Student, Booking, BlockedSlot } from './database.types'

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setStudents(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetch()
    const channel = supabase
      .channel('students-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => fetch())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetch])

  const addStudent = async (student: Omit<Student, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from('students').insert(student as never).select().single()
    if (error) throw error
    return data
  }

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    const { error } = await supabase.from('students').update(updates as never).eq('id', id)
    if (error) throw error
  }

  return { students, loading, addStudent, updateStudent, refetch: fetch }
}

export function useBookings(weekDates: Date[]) {
  const [bookings, setBookings] = useState<(Booking & { students: Student })[]>([])
  const [loading, setLoading] = useState(true)

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetch = useCallback(async () => {
    if (!startDate || !endDate) return
    const { data } = await supabase
      .from('bookings')
      .select('*, students(*)')
      .gte('date', startDate)
      .lte('date', endDate)
    if (data) setBookings(data as (Booking & { students: Student })[])
    setLoading(false)
  }, [startDate, endDate])

  useEffect(() => {
    fetch()
    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetch())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetch])

  const createBooking = async (booking: {
    student_id: string
    date: string
    hour: number
    lesson_type: string
    rate: number
  }) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert({ ...booking, status: 'confirmed' } as never)
      .select('*, students(*)')
      .single()
    if (error) throw error
    return data
  }

  const updateBooking = async (id: string, updates: { status?: string }) => {
    const { error } = await supabase.from('bookings').update(updates as never).eq('id', id)
    if (error) throw error
  }

  return { bookings, loading, createBooking, updateBooking, refetch: fetch }
}

export function useUpcomingBookings() {
  const [bookings, setBookings] = useState<(Booking & { students: Student })[]>([])

  const fetch = useCallback(async () => {
    const today = fmt(new Date())
    const { data } = await supabase
      .from('bookings')
      .select('*, students(*)')
      .gte('date', today)
      .eq('status', 'confirmed')
      .order('date')
      .order('hour')
      .limit(8)
    if (data) setBookings(data as (Booking & { students: Student })[])
  }, [])

  useEffect(() => {
    fetch()
    const channel = supabase
      .channel('upcoming-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetch())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetch])

  return { bookings }
}

export function useBlockedSlots(weekDates: Date[]) {
  const [blocked, setBlocked] = useState<BlockedSlot[]>([])

  const startDate = weekDates.length > 0 ? fmt(weekDates[0]) : ''
  const endDate = weekDates.length > 0 ? fmt(weekDates[6]) : ''

  const fetch = useCallback(async () => {
    if (!startDate || !endDate) return
    const { data } = await supabase
      .from('blocked_slots')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
    if (data) setBlocked(data)
  }, [startDate, endDate])

  useEffect(() => {
    fetch()
  }, [fetch])

  const toggleBlock = async (date: string, hour: number) => {
    const existing = blocked.find((b) => b.date === date && b.hour === hour)
    if (existing) {
      await supabase.from('blocked_slots').delete().eq('id', existing.id)
      setBlocked((prev) => prev.filter((b) => b.id !== existing.id))
    } else {
      const { data } = await supabase.from('blocked_slots').insert({ date, hour } as never).select().single()
      if (data) setBlocked((prev) => [...prev, data])
    }
  }

  const isBlocked = (date: string, hour: number) =>
    blocked.some((b) => b.date === date && b.hour === hour)

  return { blocked, isBlocked, toggleBlock }
}
