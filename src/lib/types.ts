export type LessonType = 'automatic' | 'manual' | 'intensive' | 'test-prep' | 'motorway' | 'refresher'

export interface Student {
  _id: string
  name: string
  phone: string
  email: string
  area: string
  lesson_type: LessonType
  status: 'active' | 'completed' | 'paused'
  created_at: string
}

export interface Booking {
  _id: string
  student_id: string
  student_name: string
  student_phone: string
  student_area: string
  date: string
  hour: number
  lesson_type: LessonType
  status: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
  rate: number
  created_at: string
}

export interface BlockedSlot {
  _id: string
  date: string
  hour: number
}
