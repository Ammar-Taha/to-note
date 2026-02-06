// Application types
export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  is_archived: boolean
  created_at: string
  updated_at: string
  user_id: string
}

export interface NoteFormData {
  title: string
  content: string
  tags: string[]
}

export type ViewFilter = 'all' | 'archived'

export interface UIState {
  selectedNoteId: string | null
  viewFilter: ViewFilter
  searchQuery: string
  selectedTags: string[]
  isSidebarOpen: boolean
}
