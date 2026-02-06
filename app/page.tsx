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
import { NoteViewer } from '@/components/notes/NoteViewer'
import { NoteEditorHeader } from '@/components/notes/NoteEditorHeader'
import { useNotes } from '@/hooks/use-notes'
import { useUIStore } from '@/lib/store/ui-store'
import { ProtectedRoute } from './protected-route'
import { UserMenu } from '@/components/sidebar/UserMenu'
import { SettingsDialog } from '@/components/settings/SettingsDialog'

export default function Home() {
  return (
    <ProtectedRoute>
      <NotesApp />
      <SettingsDialog />
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
  const isEditing = useUIStore((state) => state.isEditing)
  const setIsEditing = useUIStore((state) => state.setIsEditing)
  const openSettings = useUIStore((state) => state.openSettings)

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
          setIsEditing(false)
        }
      }
    }
  }, [viewFilter, selectedNoteId, notes, setSelectedNoteId, clearDraft, setIsEditing])

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
    setIsEditing(true) // Set to editing mode when creating new note
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-[280px] border-r border-border bg-muted/50 p-4 flex flex-col">
        <div className="flex-1">
          <Logo className="mb-6 border-b-2 border-border pb-4" />

          <div className="mb-4">
            <Navigation />
          </div>

          <Separator className="my-4 bg-border" />

          <TagsPanel />
        </div>

        <UserMenu />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold leading-tight tracking-[-0.5px] text-foreground">
              {viewFilter === 'archived' ? 'Archived Notes' : 'All Notes'}
            </h1>
            <div className="flex items-center gap-4">
              <SearchInput className="w-[450px]" />
              <button
                onClick={openSettings}
                className="flex size-6 items-center justify-center hover:opacity-70 transition-opacity"
              >
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
          <div className="flex flex-col border-r border-border">
            <div className="border-b-2 border-border bg-muted/50 p-4">
              <Button
                onClick={handleCreateNew}
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span className="text-lg">+</span>
                Create New Note
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              {isLoading ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Loading notes...
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
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
            {selectedNoteId !== null || isEditing ? (
              <>
                {selectedNoteId && <NoteEditorHeader />}
                {/* Show viewer in view mode, editor in edit mode */}
                {isEditing ? (
                  <NoteEditor />
                ) : selectedNoteId ? (
                  <NoteViewer />
                ) : (
                  <NoteEditor />
                )}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">
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


