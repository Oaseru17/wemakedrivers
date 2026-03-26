import { useState, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  X,
  Calendar,
  Clock,
  Users,
  Ban,
  CheckCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react'
import {
  MOCK_BOOKINGS,
  MOCK_STUDENTS,
  HOURS,
  LESSON_TYPE_LABELS,
  ACCESS_CODE,
} from '../data/schedule'
import type { Booking, Student } from '../data/schedule'
import SEO from '../components/shared/SEO'

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function getWeekDates(baseDate: Date): Date[] {
  const day = baseDate.getDay()
  const monday = new Date(baseDate)
  monday.setDate(baseDate.getDate() - ((day + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const LESSON_COLORS: Record<string, string> = {
  'automatic': '#3b82f6',
  'manual': '#10b981',
  'intensive': '#f97316',
  'test-prep': '#8b5cf6',
  'motorway': '#06b6d4',
  'refresher': '#f59e0b',
}

function CodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === ACCESS_CODE) {
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-light">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-secondary" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">Instructor Access</h1>
        <p className="text-gray-500 mb-8">Enter your access code to view your schedule.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter access code"
            className={`w-full border rounded-lg px-4 py-3 text-center text-lg tracking-widest mb-4 focus:outline-none transition-colors ${
              error ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-secondary'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">Incorrect code. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
          >
            View My Schedule
          </button>
        </form>
      </div>
    </div>
  )
}

function BookingDetail({
  booking,
  onClose,
  onCancel,
  onNoShow,
  onAddPayment,
}: {
  booking: Booking
  onClose: () => void
  onCancel: (id: string) => void
  onNoShow: (id: string) => void
  onAddPayment: (id: string, amount: number, note: string) => void
}) {
  const [showPayForm, setShowPayForm] = useState(false)
  const [payAmount, setPayAmount] = useState('')
  const [payNote, setPayNote] = useState('')

  const totalPaid = booking.payments.reduce((sum, p) => sum + p.amount, 0)
  const balance = booking.lessonRate - totalPaid

  const handleAddPayment = () => {
    const amount = parseFloat(payAmount)
    if (amount > 0) {
      onAddPayment(booking.id, amount, payNote || 'Payment')
      setPayAmount('')
      setPayNote('')
      setShowPayForm(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: LESSON_COLORS[booking.lessonType] }} />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {LESSON_TYPE_LABELS[booking.lessonType]} Lesson
          </span>
          <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
            booking.status === 'no-show' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {booking.status}
          </span>
        </div>

        <h2 className="text-xl font-bold text-primary mb-4">{booking.studentName}</h2>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Calendar size={16} className="text-secondary shrink-0" />
            {new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Clock size={16} className="text-secondary shrink-0" />
            {booking.hour}:00 — {booking.hour + 1}:00
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <MapPin size={16} className="text-secondary shrink-0" />
            {booking.area}
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Mail size={16} className="text-secondary shrink-0" />
            {booking.email}
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Phone size={16} className="text-secondary shrink-0" />
            {booking.phone}
          </div>
        </div>

        {/* Payment section */}
        <div className="border-t pt-4 mb-6">
          <h3 className="font-semibold text-primary text-sm mb-3 flex items-center gap-2">
            <CheckCircle size={14} className="text-secondary" /> Payment
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-light rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Lesson Rate</p>
              <p className="font-bold text-primary">£{booking.lessonRate}</p>
            </div>
            <div className="bg-light rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Paid</p>
              <p className="font-bold text-green-600">£{totalPaid}</p>
            </div>
            <div className={`rounded-lg p-3 text-center ${balance > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
              <p className="text-xs text-gray-500">Balance</p>
              <p className={`font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {balance > 0 ? `£${balance} due` : 'Paid'}
              </p>
            </div>
          </div>

          {booking.payments.length > 0 && (
            <div className="space-y-1.5 mb-3">
              {booking.payments.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded px-3 py-1.5">
                  <span>{p.note}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">{new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    <span className="font-semibold text-green-600">+£{p.amount}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {showPayForm ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="Amount (£)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                  min="0"
                  step="0.01"
                  autoFocus
                />
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="Note (e.g. Cash)"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddPayment}
                  className="flex-1 bg-secondary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                >
                  Add Payment
                </button>
                <button
                  onClick={() => setShowPayForm(false)}
                  className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPayForm(true)}
              className="w-full border border-dashed border-secondary/40 text-secondary py-2 rounded-lg text-sm font-medium hover:bg-secondary/5 transition-colors"
            >
              + Record a Payment
            </button>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-4">
          <a
            href={`tel:${booking.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            <Phone size={14} /> Call
          </a>
          <a
            href={`https://wa.me/${booking.phone.replace(/\s/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#1ebe57] transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>

        {booking.status === 'confirmed' && (
          <div className="flex gap-2">
            <button
              onClick={() => onCancel(booking.id)}
              className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <Ban size={14} /> Cancel
            </button>
            <button
              onClick={() => onNoShow(booking.id)}
              className="flex-1 flex items-center justify-center gap-2 border border-yellow-300 text-yellow-600 py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors"
            >
              <AlertTriangle size={14} /> No-Show
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function NewBookingModal({
  date,
  hour,
  hours,
  weekDates,
  students,
  existingBookings,
  onClose,
  onCreate,
  onChangeSlot,
}: {
  date: string
  hour: number
  hours: number[]
  weekDates: Date[]
  students: Student[]
  existingBookings: Booking[]
  onClose: () => void
  onCreate: (data: {
    studentId: string; studentName: string; phone: string; email: string; area: string;
    lessonType: Booking['lessonType']; lessonRate: number;
  }) => void
  onChangeSlot: (date: string, hour: number) => void
}) {
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [rate, setRate] = useState('40')

  const activeStudents = students.filter((s) => s.status === 'active')
  const filtered = search.trim()
    ? activeStudents.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.area.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search)
      )
    : activeStudents

  const isSlotTaken = (d: string, h: number) =>
    existingBookings.some((b) => b.date === d && b.hour === h && b.status !== 'cancelled')

  const handleSubmit = () => {
    if (!selectedStudent) return
    onCreate({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      phone: selectedStudent.phone,
      email: selectedStudent.email,
      area: selectedStudent.area,
      lessonType: selectedStudent.lessonType,
      lessonRate: parseFloat(rate) || 40,
    })
  }

  const dateObj = new Date(date)
  const dateLabel = dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-primary mb-1">Book a Lesson</h2>
        <p className="text-gray-500 text-sm mb-6">{dateLabel} at {hour}:00</p>

        {/* Slot picker */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Date</label>
            <select
              value={date}
              onChange={(e) => onChangeSlot(e.target.value, hour)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary"
            >
              {weekDates.map((d) => {
                const ds = fmt(d)
                return (
                  <option key={ds} value={ds}>
                    {d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Time</label>
            <select
              value={hour}
              onChange={(e) => onChangeSlot(date, parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary"
            >
              {hours.map((h) => {
                const taken = isSlotTaken(date, h)
                return (
                  <option key={h} value={h} disabled={taken}>
                    {h}:00 — {h + 1}:00 {taken ? '(booked)' : ''}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Student selection */}
        {selectedStudent ? (
          <div className="border border-secondary/30 bg-secondary/5 rounded-lg p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-primary">{selectedStudent.name}</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600 text-xs">
                Change
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>{selectedStudent.area}</span>
              <span>{LESSON_TYPE_LABELS[selectedStudent.lessonType]}</span>
              <span>{selectedStudent.lessonsCompleted} lessons done</span>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Select Student</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, area, or phone..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary mb-2"
              autoFocus
            />
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
              {filtered.length === 0 ? (
                <p className="text-gray-400 text-sm p-3 text-center">No active students found</p>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setSelectedStudent(s); setSearch('') }}
                    className="w-full text-left p-3 border-b border-gray-100 last:border-b-0 hover:bg-light transition-colors"
                  >
                    <p className="font-semibold text-primary text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.area} &middot; {LESSON_TYPE_LABELS[s.lessonType]} &middot; {s.lessonsCompleted} lessons</p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div className="mb-5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Lesson Rate (£)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary"
            min="0"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedStudent}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              selectedStudent
                ? 'bg-secondary text-white hover:bg-secondary/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Book Lesson
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [blockedSlots, setBlockedSlots] = useState<Record<string, boolean>>({})
  const [newBookingSlot, setNewBookingSlot] = useState<{ date: string; hour: number } | null>(null)
  const [showStudents, setShowStudents] = useState(false)
  const [showAddStudent, setShowAddStudent] = useState(false)

  const baseDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  }, [weekOffset])

  const weekDates = useMemo(() => getWeekDates(baseDate), [baseDate])
  const todayStr = fmt(new Date())

  const weekBookings = useMemo(() => {
    const dateStrs = weekDates.map(fmt)
    return bookings.filter((b) => dateStrs.includes(b.date) && b.status !== 'cancelled')
  }, [bookings, weekDates])

  const upcomingBookings = useMemo(() => {
    return bookings
      .filter((b) => b.date >= todayStr && b.status === 'confirmed')
      .sort((a, b) => a.date.localeCompare(b.date) || a.hour - b.hour)
      .slice(0, 6)
  }, [bookings, todayStr])

  const weekStats = useMemo(() => {
    const confirmed = weekBookings.filter((b) => b.status === 'confirmed').length
    const total = weekDates.length * HOURS.length
    const blocked = Object.keys(blockedSlots).filter((k) => {
      const [date] = k.split('-h')
      return weekDates.map(fmt).includes(date) && blockedSlots[k]
    }).length
    return { confirmed, available: total - confirmed - blocked, blocked }
  }, [weekBookings, weekDates, blockedSlots])

  const getBookingAt = (date: string, hour: number) =>
    weekBookings.find((b) => b.date === date && b.hour === hour)

  const isBlocked = (date: string, hour: number) =>
    blockedSlots[`${date}-h${hour}`] === true

  const toggleBlock = (date: string, hour: number) => {
    const key = `${date}-h${hour}`
    setBlockedSlots((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleCancel = (id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'cancelled' as const } : b))
    setSelectedBooking(null)
  }

  const handleNoShow = (id: string) => {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'no-show' as const } : b))
    setSelectedBooking(null)
  }

  const handleCreateBooking = (data: {
    studentId: string; studentName: string; phone: string; email: string; area: string;
    lessonType: Booking['lessonType']; lessonRate: number;
  }) => {
    if (!newBookingSlot) return
    const newBooking: Booking = {
      id: `b${Date.now()}`,
      ...data,
      status: 'confirmed',
      date: newBookingSlot.date,
      hour: newBookingSlot.hour,
      payments: [],
    }
    setBookings((prev) => [...prev, newBooking])
    setNewBookingSlot(null)
  }

  const handleAddStudent = (data: Omit<Student, 'id' | 'totalPaid' | 'lessonsCompleted' | 'createdAt'>) => {
    const newStudent: Student = {
      ...data,
      id: `s${Date.now()}`,
      totalPaid: 0,
      lessonsCompleted: 0,
      createdAt: fmt(new Date()),
    }
    setStudents((prev) => [...prev, newStudent])
    setShowAddStudent(false)
  }

  const handleAddPayment = (id: string, amount: number, note: string) => {
    setBookings((prev) => prev.map((b) => {
      if (b.id !== id) return b
      const updated = {
        ...b,
        payments: [...b.payments, { amount, date: fmt(new Date()), note }],
      }
      setSelectedBooking(updated)
      return updated
    }))
  }

  const weekLabel = `${weekDates[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — ${weekDates[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  return (
    <div className="bg-light min-h-screen">
      <SEO title="My Schedule" path="/my-schedule" />

      {/* Top bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">My Schedule</h1>
            <p className="text-gray-500 text-sm">Manage your lessons and availability</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary" /> {weekStats.confirmed} booked
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-300" /> {weekStats.blocked} blocked
              </span>
            </div>
            <button
              onClick={() => setShowStudents(true)}
              className="flex items-center gap-2 border border-gray-300 text-primary px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-light transition-colors"
            >
              <Users size={16} /> Students ({students.filter(s => s.status === 'active').length})
            </button>
            <button
              onClick={() => setNewBookingSlot({ date: todayStr, hour: 9 })}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors"
            >
              + Book Lesson
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Calendar — main area */}
          <div className="xl:col-span-3">
            {/* Week navigation */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between">
              <button
                onClick={() => setWeekOffset((o) => o - 1)}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-light transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="text-center">
                <p className="font-semibold text-primary">{weekLabel}</p>
                <button
                  onClick={() => setWeekOffset(0)}
                  className="text-secondary text-xs font-medium hover:underline mt-1"
                >
                  Go to today
                </button>
              </div>
              <button
                onClick={() => setWeekOffset((o) => o + 1)}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-light transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Day headers */}
              <div className="grid border-b" style={{gridTemplateColumns:'60px repeat(7,1fr)'}}>
                <div className="p-2" />
                {weekDates.map((date, i) => {
                  const dateStr = fmt(date)
                  const isToday = dateStr === todayStr
                  return (
                    <div
                      key={dateStr}
                      className={`p-3 text-center border-l ${isToday ? 'bg-secondary/5' : ''}`}
                    >
                      <p className="text-xs text-gray-500 uppercase">{DAY_NAMES[i]}</p>
                      <p className={`text-lg font-bold mt-0.5 ${isToday ? 'text-secondary' : 'text-primary'}`}>
                        {date.getDate()}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Hour rows */}
              {HOURS.map((hour) => (
                <div key={hour} className="grid border-b last:border-b-0" style={{gridTemplateColumns:'60px repeat(7,1fr)'}}>
                  <div className="p-2 text-xs text-gray-400 text-right pr-3 pt-3">
                    {hour}:00
                  </div>
                  {weekDates.map((date) => {
                    const dateStr = fmt(date)
                    const booking = getBookingAt(dateStr, hour)
                    const blocked = isBlocked(dateStr, hour)
                    const isToday = dateStr === todayStr

                    return (
                      <div
                        key={`${dateStr}-${hour}`}
                        className={`border-l min-h-[64px] p-1.5 cursor-pointer transition-colors ${
                          isToday ? 'bg-secondary/5' : ''
                        } ${!booking && !blocked ? 'hover:bg-green-50' : ''}`}
                        onClick={() => {
                          if (booking) {
                            setSelectedBooking(booking)
                          } else if (blocked) {
                            toggleBlock(dateStr, hour)
                          } else {
                            setNewBookingSlot({ date: dateStr, hour })
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          if (!booking) toggleBlock(dateStr, hour)
                        }}
                      >
                        {booking ? (
                          <div
                            className="text-white rounded-md px-2 py-2 text-xs"
                            style={{ backgroundColor: LESSON_COLORS[booking.lessonType], minHeight: 48 }}
                          >
                            <p className="font-semibold truncate">{booking.studentName}</p>
                            <p className="opacity-80 truncate text-[11px]">{booking.area} &middot; {LESSON_TYPE_LABELS[booking.lessonType]}</p>
                          </div>
                        ) : blocked ? (
                          <div className="bg-gray-200 rounded-md px-2 py-2 text-xs h-full flex items-center justify-center text-gray-500">
                            Blocked
                          </div>
                        ) : (
                          <div className="w-full h-full rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-gray-400 text-[10px]">+ Book</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
              {Object.entries(LESSON_TYPE_LABELS).map(([key, label]) => (
                <span key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: LESSON_COLORS[key] }} /> {label}
                </span>
              ))}
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: '#d1d5db' }} /> Blocked</span>
              <span className="text-gray-400 ml-2">Click slot to book &middot; Right-click to block</span>
            </div>
          </div>

          {/* Sidebar — upcoming bookings */}
          <div className="xl:col-span-1">
            {/* Day summary */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
              <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-secondary" />
                Today
              </h3>
              {(() => {
                const todayBookings = bookings.filter((b) => b.date === todayStr && b.status === 'confirmed')
                if (todayBookings.length === 0) {
                  return <p className="text-gray-400 text-sm">No lessons today</p>
                }
                return (
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-primary">{todayBookings.length}</p>
                    <p className="text-gray-500 text-sm">
                      {todayBookings.length} lesson{todayBookings.length > 1 ? 's' : ''} &middot; {todayBookings.length}h booked
                    </p>
                    <div className="flex gap-1 mt-2">
                      {HOURS.map((h) => {
                        const hasBooking = todayBookings.some((b) => b.hour === h)
                        return (
                          <div
                            key={h}
                            className={`flex-1 h-2 rounded-full ${hasBooking ? 'bg-secondary' : 'bg-gray-100'}`}
                            title={`${h}:00`}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Users size={16} className="text-secondary" />
                Upcoming Bookings
              </h3>
              {upcomingBookings.length === 0 ? (
                <p className="text-gray-400 text-sm">No upcoming bookings</p>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-secondary/30 hover:bg-secondary/5 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LESSON_COLORS[b.lessonType] }} />
                        <span className="font-semibold text-primary text-sm truncate">{b.studentName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{new Date(b.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        <span>{b.hour}:00</span>
                        <span className="truncate">{b.area}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking detail modal */}
      {selectedBooking && (
        <BookingDetail
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={handleCancel}
          onNoShow={handleNoShow}
          onAddPayment={handleAddPayment}
        />
      )}

      {newBookingSlot && (
        <NewBookingModal
          date={newBookingSlot.date}
          hour={newBookingSlot.hour}
          hours={HOURS}
          weekDates={weekDates}
          students={students}
          existingBookings={bookings}
          onClose={() => setNewBookingSlot(null)}
          onCreate={handleCreateBooking}
          onChangeSlot={(date, hour) => setNewBookingSlot({ date, hour })}
        />
      )}

      {/* Students panel */}
      {showStudents && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowStudents(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowStudents(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Students</h2>
              <button
                onClick={() => { setShowStudents(false); setShowAddStudent(true) }}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors"
              >
                + Add Student
              </button>
            </div>

            <div className="space-y-2">
              {students.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-light transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary">{s.name}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        s.status === 'active' ? 'bg-green-100 text-green-700' :
                        s.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{s.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{s.area} &middot; {LESSON_TYPE_LABELS[s.lessonType]} &middot; {s.lessonsCompleted} lessons &middot; £{s.totalPaid} paid</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.status === 'active' && (
                      <button
                        onClick={() => setStudents((prev) => prev.map((st) => st.id === s.id ? { ...st, status: 'completed' as const } : st))}
                        className="text-xs text-gray-500 hover:text-secondary border border-gray-200 px-3 py-1.5 rounded-lg"
                      >
                        Mark Complete
                      </button>
                    )}
                    {s.status !== 'active' && (
                      <button
                        onClick={() => setStudents((prev) => prev.map((st) => st.id === s.id ? { ...st, status: 'active' as const } : st))}
                        className="text-xs text-gray-500 hover:text-secondary border border-gray-200 px-3 py-1.5 rounded-lg"
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Student modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddStudent(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowAddStudent(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h2 className="text-xl font-bold text-primary mb-6">Add New Student</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              handleAddStudent({
                name: fd.get('name') as string,
                phone: fd.get('phone') as string,
                email: fd.get('email') as string,
                area: fd.get('area') as string,
                lessonType: fd.get('lessonType') as Booking['lessonType'],
                status: 'active',
              })
            }} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Full Name *</label>
                <input name="name" type="text" required placeholder="Student's full name" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Phone</label>
                  <input name="phone" type="tel" placeholder="07700 000000" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Email</label>
                  <input name="email" type="email" placeholder="student@email.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Area</label>
                <select name="area" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary">
                  <option value="">Select area</option>
                  {['North London', 'South London', 'East London', 'West London', 'Central London',
                    'Croydon', 'Enfield', 'Bromley', 'Greenwich', 'Hackney', 'Lewisham',
                    'Islington', 'Camden', 'Wandsworth', 'Barnet'].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Lesson Type</label>
                <select name="lessonType" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-secondary">
                  {Object.entries(LESSON_TYPE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function MySchedule() {
  const [unlocked, setUnlocked] = useState(false)

  return unlocked ? <Dashboard /> : <CodeGate onUnlock={() => setUnlocked(true)} />
}

export { MySchedule as default }
