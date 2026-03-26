export interface Payment {
  amount: number
  date: string
  note: string
}

export interface Booking {
  id: string
  studentName: string
  phone: string
  email: string
  area: string
  lessonType: 'automatic' | 'manual' | 'intensive' | 'test-prep' | 'motorway' | 'refresher'
  status: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
  date: string
  hour: number
  lessonRate: number
  payments: Payment[]
}

export type SlotState = 'available' | 'blocked'

export interface DaySlots {
  [hour: number]: SlotState
}

export interface WeekAvailability {
  [dateStr: string]: DaySlots
}

const today = new Date()
const fmt = (d: Date) => d.toISOString().split('T')[0]
const addDays = (d: Date, n: number) => {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    studentName: 'Sarah Mitchell',
    phone: '07700 900123',
    email: 'sarah.m@email.com',
    area: 'North London',
    lessonType: 'automatic',
    status: 'confirmed',
    date: fmt(today),
    hour: 9,
    lessonRate: 40,
    payments: [{ amount: 40, date: fmt(addDays(today, -3)), note: 'Paid in advance' }],
  },
  {
    id: 'b2',
    studentName: 'James Okonkwo',
    phone: '07700 900456',
    email: 'james.o@email.com',
    area: 'East London',
    lessonType: 'manual',
    status: 'confirmed',
    date: fmt(today),
    hour: 11,
    lessonRate: 40,
    payments: [{ amount: 20, date: fmt(addDays(today, -2)), note: 'Deposit' }],
  },
  {
    id: 'b3',
    studentName: 'Priya Sharma',
    phone: '07700 900789',
    email: 'priya.s@email.com',
    area: 'Central London',
    lessonType: 'test-prep',
    status: 'confirmed',
    date: fmt(today),
    hour: 14,
    lessonRate: 45,
    payments: [{ amount: 45, date: fmt(addDays(today, -1)), note: 'Full payment' }],
  },
  {
    id: 'b4',
    studentName: 'Tom Williams',
    phone: '07700 900321',
    email: 'tom.w@email.com',
    area: 'South London',
    lessonType: 'intensive',
    status: 'confirmed',
    date: fmt(addDays(today, 1)),
    hour: 10,
    lessonRate: 50,
    payments: [],
  },
  {
    id: 'b5',
    studentName: 'Amara Johnson',
    phone: '07700 900654',
    email: 'amara.j@email.com',
    area: 'West London',
    lessonType: 'automatic',
    status: 'confirmed',
    date: fmt(addDays(today, 1)),
    hour: 13,
    lessonRate: 40,
    payments: [{ amount: 40, date: fmt(today), note: 'Bank transfer' }],
  },
  {
    id: 'b6',
    studentName: 'Ryan Chen',
    phone: '07700 900987',
    email: 'ryan.c@email.com',
    area: 'Croydon',
    lessonType: 'motorway',
    status: 'confirmed',
    date: fmt(addDays(today, 2)),
    hour: 9,
    lessonRate: 45,
    payments: [{ amount: 25, date: fmt(today), note: 'Partial payment' }],
  },
  {
    id: 'b7',
    studentName: 'Fatima Ali',
    phone: '07700 900111',
    email: 'fatima.a@email.com',
    area: 'Islington',
    lessonType: 'refresher',
    status: 'confirmed',
    date: fmt(addDays(today, 3)),
    hour: 15,
    lessonRate: 40,
    payments: [{ amount: 40, date: fmt(addDays(today, -1)), note: 'Cash' }],
  },
  {
    id: 'b8',
    studentName: 'Daniel Brown',
    phone: '07700 900222',
    email: 'daniel.b@email.com',
    area: 'Camden',
    lessonType: 'manual',
    status: 'cancelled',
    date: fmt(addDays(today, -1)),
    hour: 10,
    lessonRate: 40,
    payments: [{ amount: 40, date: fmt(addDays(today, -5)), note: 'Refunded' }],
  },
]

export const HOURS = Array.from({ length: 13 }, (_, i) => i + 7)

export const LESSON_TYPE_LABELS: Record<string, string> = {
  'automatic': 'Automatic',
  'manual': 'Manual',
  'intensive': 'Intensive',
  'test-prep': 'Test Prep',
  'motorway': 'Motorway',
  'refresher': 'Refresher',
}

export const ACCESS_CODE = 'drive2026'
