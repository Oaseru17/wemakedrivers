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
          lesson_type: 'automatic' | 'manual' | 'intensive' | 'test-prep' | 'motorway' | 'refresher'
          status: 'active' | 'completed' | 'paused'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['students']['Insert']>
      }
      bookings: {
        Row: {
          id: string
          student_id: string
          date: string
          hour: number
          lesson_type: 'automatic' | 'manual' | 'intensive' | 'test-prep' | 'motorway' | 'refresher'
          status: 'confirmed' | 'cancelled' | 'no-show' | 'completed'
          rate: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>
      }
      blocked_slots: {
        Row: {
          id: string
          date: string
          hour: number
        }
        Insert: Omit<Database['public']['Tables']['blocked_slots']['Row'], 'id'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['blocked_slots']['Insert']>
      }
    }
  }
}

export type Student = Database['public']['Tables']['students']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row'] & {
  students?: Student
}
export type BlockedSlot = Database['public']['Tables']['blocked_slots']['Row']
