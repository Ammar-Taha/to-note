'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store/ui-store'
import { useToggleArchive, useDeleteNote } from '@/hooks/use-notes'
import { useNotes } from '@/hooks/use-notes'

export function NoteEditorHeader() {
  const selectedNoteId = useUIStore((state) => state.selectedNoteId)
  const setSelectedNoteId = useUIStore((state) => state.setSelectedNoteId)
  const clearDraft = useUIStore((state) => state.clearDraft)
  
  const { data: notes = [] } = useNotes()
  const selectedNote = notes.find((n) => n.id === selectedNoteId)
  
  const toggleArchive = useToggleArchive()
  const deleteNote = useDeleteNote()

  const handleArchive = async () => {
    if (!selectedNote) return

    try {
      await toggleArchive.mutateAsync({
        id: selectedNote.id,
        isArchived: !selectedNote.is_archived,
      })
      // Clear editor pane after archiving
      setSelectedNoteId(null)
      clearDraft()
    } catch (error) {
      console.error('Failed to toggle archive:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedNote) return
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      await deleteNote.mutateAsync(selectedNote.id)
      setSelectedNoteId(null)
      clearDraft()
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  if (!selectedNote) return null

  return (
    <div className="flex items-center justify-end gap-2 border-b-2 border-[#e0e4ea] bg-[#f9f9f9] px-6 py-3">
      <Button
        variant="outline"
        onClick={handleArchive}
        disabled={toggleArchive.isPending}
        className="gap-2 border-[#cacfd8] px-3 py-2 text-sm font-medium"
      >
        <div className="relative size-4">
          <Image
            src="/icons/archive-action.svg"
            alt="Archive"
            fill
            className="object-contain"
          />
        </div>
        {selectedNote.is_archived ? 'Unarchive' : 'Archive'}
      </Button>
      <Button
        variant="outline"
        onClick={handleDelete}
        disabled={deleteNote.isPending}
        className="gap-2 border-[#cacfd8] px-3 py-2 text-sm font-medium text-[#525866]"
      >
        <div className="relative size-4">
          <Image
            src="/icons/delete.svg"
            alt="Delete"
            fill
            className="object-contain"
          />
        </div>
        Delete
      </Button>
    </div>
  )
}


