import { create } from 'zustand'
import type { ViewFilter } from '@/types'

interface UIStore {
  // Selected note
  selectedNoteId: string | null
  setSelectedNoteId: (id: string | null) => void
  
  // View filter (all/archived)
  viewFilter: ViewFilter
  setViewFilter: (filter: ViewFilter) => void
  
  // Search query
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Selected tags for filtering
  selectedTags: string[]
  toggleTag: (tag: string) => void
  clearSelectedTags: () => void
  
  // Sidebar state
  isSidebarOpen: boolean
  toggleSidebar: () => void
  
  // Draft note state
  draftTitle: string
  draftContent: string
  draftTags: string[]
  setDraftTitle: (title: string) => void
  setDraftContent: (content: string) => void
  setDraftTags: (tags: string[]) => void
  clearDraft: () => void
  loadDraft: (title: string, content: string, tags: string[]) => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Selected note
  selectedNoteId: null,
  setSelectedNoteId: (id) => set({ selectedNoteId: id }),
  
  // View filter
  viewFilter: 'all',
  setViewFilter: (filter) => set({ viewFilter: filter }),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Tag filtering
  selectedTags: [],
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
  clearSelectedTags: () => set({ selectedTags: [] }),
  
  // Sidebar
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  // Draft state
  draftTitle: '',
  draftContent: '',
  draftTags: [],
  setDraftTitle: (title) => set({ draftTitle: title }),
  setDraftContent: (content) => set({ draftContent: content }),
  setDraftTags: (tags) => set({ draftTags: tags }),
  clearDraft: () => set({ draftTitle: '', draftContent: '', draftTags: [] }),
  loadDraft: (title, content, tags) =>
    set({ draftTitle: title, draftContent: content, draftTags: tags }),
}))
