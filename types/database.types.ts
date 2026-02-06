// Database types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          title: string
          content: string
          tags: string[]
          is_archived: boolean
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          content?: string
          tags?: string[]
          is_archived?: boolean
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          tags?: string[]
          is_archived?: boolean
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
  }
}
