import { createClient } from '@/lib/supabase/client'
import type { Note, NoteFormData } from '@/types'
import type { Database } from '@/types/database.types'

export const notesApi = {
  // Fetch all notes for the authenticated user
  async getNotes(userId: string): Promise<Note[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Fetch a single note for the authenticated user
  async getNote(id: string, userId: string): Promise<Note | null> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Create a new note for the authenticated user
  async createNote(noteData: NoteFormData, userId: string): Promise<Note> {
    if (!userId) {
      throw new Error('User must be authenticated to create notes')
    }

    const supabase = createClient()
    
    const insertData: Database['public']['Tables']['notes']['Insert'] = {
      ...noteData,
      user_id: userId,
    }
    
    const { data, error } = await supabase
      .from('notes')
      // @ts-expect-error - Supabase TypeScript SDK has strict type inference limitations with Database generics
      .insert(insertData)
      .select()
      .single()

    if (error) throw error
    return data as Note
  },

  // Update a note (only if user owns it)
  async updateNote(
    id: string,
    noteData: Partial<NoteFormData>,
    userId: string
  ): Promise<Note> {
    if (!userId) {
      throw new Error('User must be authenticated to update notes')
    }

    const supabase = createClient()
    
    const updateData: Database['public']['Tables']['notes']['Update'] = {
      ...noteData,
      updated_at: new Date().toISOString(),
    }
    
    const { data, error } = await supabase
      .from('notes')
      // @ts-expect-error - Supabase TypeScript SDK has strict type inference limitations with Database generics
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data as Note
  },

  // Archive/unarchive a note (only if user owns it)
  async toggleArchive(
    id: string,
    isArchived: boolean,
    userId: string
  ): Promise<Note> {
    if (!userId) {
      throw new Error('User must be authenticated to archive notes')
    }

    const supabase = createClient()
    
    const updateData: Database['public']['Tables']['notes']['Update'] = {
      is_archived: isArchived,
      updated_at: new Date().toISOString(),
    }
    
    const { data, error } = await supabase
      .from('notes')
      // @ts-expect-error - Supabase TypeScript SDK has strict type inference limitations with Database generics
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data as Note
  },

  // Delete a note (only if user owns it)
  async deleteNote(id: string, userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to delete notes')
    }

    const supabase = createClient()
    
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Get all unique tags for the authenticated user
  async getAllTags(userId: string): Promise<string[]> {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('notes')
      .select('tags')
      .eq('user_id', userId)

    if (error) throw error

    const allTags: string[] = (data as { tags: string[] }[])?.flatMap((note) => note.tags || []) || []
    return Array.from(new Set(allTags)).sort()
  },
}
