'use client'

import { useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/layout/Logo'
import { Navigation } from '@/components/sidebar/Navigation'
import { TagsPanel } from '@/components/sidebar/TagsPanel'
import { SearchInput } from '@/components/ui/SearchInput'
import { NoteListItem } from '@/components/notes/NoteListItem'
import { NoteEditor } from '@/components/notes/NoteEditor'
import { NoteEditorHeader } from '@/components/notes/NoteEditorHeader'
import { useNotes } from '@/hooks/use-notes'
import { useUIStore } from '@/lib/store/ui-store'
import { ProtectedRoute } from './protected-route'
import { UserMenu } from '@/components/sidebar/UserMenu'

export default function Home() {
  return (
    <ProtectedRoute>
      <NotesApp />
    </ProtectedRoute>
  )
}

function NotesApp() {
  const { data: notes = [], isLoading } = useNotes()

  const selectedNoteId = useUIStore((state) => state.selectedNoteId)
  const setSelectedNoteId = useUIStore((state) => state.setSelectedNoteId)
  const viewFilter = useUIStore((state) => state.viewFilter)
  const searchQuery = useUIStore((state) => state.searchQuery)
  const selectedTags = useUIStore((state) => state.selectedTags)
  const clearDraft = useUIStore((state) => state.clearDraft)

  // Clear editor when switching views if selected note doesn't belong to current view
  useEffect(() => {
    if (selectedNoteId && notes.length > 0) {
      const selectedNote = notes.find((note) => note.id === selectedNoteId)
      
      if (selectedNote) {
        const noteIsArchived = selectedNote.is_archived
        const viewingArchived = viewFilter === 'archived'
        
        // If note's archived status doesn't match the current view, clear the editor
        if (noteIsArchived !== viewingArchived) {
          setSelectedNoteId(null)
          clearDraft()
        }
      }
    }
  }, [viewFilter, selectedNoteId, notes, setSelectedNoteId, clearDraft])

  // Filter notes based on view filter, search, and tags
  const filteredNotes = useMemo(() => {
    let filtered = notes

    // Filter by archived status
    filtered = filtered.filter((note) =>
      viewFilter === 'archived' ? note.is_archived : !note.is_archived
    )

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((note) =>
        selectedTags.some((tag) => note.tags.includes(tag))
      )
    }

    return filtered
  }, [notes, viewFilter, searchQuery, selectedTags])

  const handleCreateNew = () => {
    setSelectedNoteId(null)
    clearDraft()
  }

  return (
    <div className="flex h-screen bg-[#f3f5f8]">
      {/* Sidebar */}
      <div className="w-[280px] border-r border-[#e0e4ea] bg-[#fafafa] p-4 flex flex-col">
        <div className="flex-1">
          <Logo className="mb-6 border-b-2 border-[#e0e4ea] pb-4" />

          <div className="mb-4">
            <Navigation />
          </div>

          <Separator className="my-4 bg-[#e0e4ea]" />

          <TagsPanel />
        </div>

        <UserMenu />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-[#e0e4ea] bg-white px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold leading-tight tracking-[-0.5px] text-[#0e121b]">
              {viewFilter === 'archived' ? 'Archived Notes' : 'All Notes'}
            </h1>
            <div className="flex items-center gap-4">
              <SearchInput className="w-[450px]" />
              <button className="flex size-6 items-center justify-center">
                <div className="relative size-5">
                  <Image
                    src="/icons/settings.svg"
                    alt="Settings"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid flex-1 grid-cols-[320px_1fr] overflow-hidden">
          {/* Notes Panel */}
          <div className="flex flex-col border-r border-[#e0e4ea]">
            <div className="border-b-2 border-[#e0e4ea] bg-[#f9f9f9] p-4">
              <Button
                onClick={handleCreateNew}
                className="w-full gap-2 bg-[#0e121b] text-white hover:bg-[#2b303b]"
              >
                <span className="text-lg">+</span>
                Create New Note
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              {isLoading ? (
                <div className="py-8 text-center text-sm text-[#717784]">
                  Loading notes...
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#717784]">
                  {searchQuery || selectedTags.length > 0
                    ? 'No notes match your filters'
                    : 'No notes yet. Create your first note!'}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredNotes.map((note) => (
                    <NoteListItem
                      key={note.id}
                      note={note}
                      isActive={note.id === selectedNoteId}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Note Workspace */}
          <div className="flex flex-col">
            {selectedNoteId !== null || !selectedNoteId ? (
              <>
                {selectedNoteId && <NoteEditorHeader />}
                <NoteEditor />
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-[#717784]">
                    Select a note or create a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


