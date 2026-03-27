type LessonType = 'automatic' | 'manual' | 'intensive' | 'test-prep' | 'motorway' | 'refresher'

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          phone: string
          email: string
          area: string
          lesson_type: LessonType
          status: 'active' | 'completed' | 'paused'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string
          email?: string
          area?: string
          lesson_type?: LessonType
          status?: 'active' | 'completed' | 'paused'
          created_at?: string
        }
        Update: {
          name?: string
          phone?: string
          email?: string
          area?: string
          lesson_type?: LessonType
          status?: 'active' | 'completed' | 'paused'
        }
      }
      bookings: {
        Row: {
          id: string
          student_id: string
          date: string
          hour: number
          lesson_type: LessonType
          status: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
          rate: number
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          date: string
          hour: number
          lesson_type?: LessonType
          status?: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
          rate?: number
          created_at?: string
        }
        Update: {
          student_id?: string
          date?: string
          hour?: number
          lesson_type?: LessonType
          status?: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
          rate?: number
        }
      }
      blocked_slots: {
        Row: {
          id: string
          date: string
          hour: number
        }
        Insert: {
          id?: string
          date: string
          hour: number
        }
        Update: {
          date?: string
          hour?: number
        }
      }
    }
  }
}

export type Student = Database['public']['Tables']['students']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row'] & {
  students?: Student
}
export type BlockedSlot = Database['public']['Tables']['blocked_slots']['Row']
