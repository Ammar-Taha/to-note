'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store/ui-store'
import { useUpdateNote, useCreateNote } from '@/hooks/use-notes'
import { Plus, X } from 'lucide-react'

export function NoteEditor() {
  const selectedNoteId = useUIStore((state) => state.selectedNoteId)
  const draftTitle = useUIStore((state) => state.draftTitle)
  const draftContent = useUIStore((state) => state.draftContent)
  const draftTags = useUIStore((state) => state.draftTags)
  const setDraftTitle = useUIStore((state) => state.setDraftTitle)
  const setDraftContent = useUIStore((state) => state.setDraftContent)
  const setDraftTags = useUIStore((state) => state.setDraftTags)
  const clearDraft = useUIStore((state) => state.clearDraft)
  const setSelectedNoteId = useUIStore((state) => state.setSelectedNoteId)

  const [tagInputs, setTagInputs] = useState<string[]>([''])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const updateNote = useUpdateNote()
  const createNote = useCreateNote()

  const isNewNote = !selectedNoteId

  // Sync tagInputs with draftTags when note is loaded (deferred to avoid cascading renders)
  useEffect(() => {
    const next = draftTags.length > 0 ? draftTags : ['']
    const id = setTimeout(() => setTagInputs(next), 0)
    return () => clearTimeout(id)
  }, [selectedNoteId, draftTags])

  const handleSave = async () => {
    if (!draftTitle.trim()) {
      alert('Please enter a title')
      return
    }

    try {
      if (isNewNote) {
        const newNote = await createNote.mutateAsync({
          title: draftTitle,
          content: draftContent,
          tags: draftTags,
        })
        setSelectedNoteId(newNote.id)
      } else {
        await updateNote.mutateAsync({
          id: selectedNoteId,
          data: {
            title: draftTitle,
            content: draftContent,
            tags: draftTags,
          },
        })
      }
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save note:', error)
      alert('Failed to save note. Please try again.')
    }
  }

  const handleCancel = () => {
    clearDraft()
    setSelectedNoteId(null)
    setTagInputs([''])
  }

  const handleTagChange = (index: number, value: string) => {
    const newInputs = [...tagInputs]
    newInputs[index] = value
    setTagInputs(newInputs)
    
    // Update draftTags with non-empty values
    const nonEmptyTags = newInputs.filter((tag) => tag.trim() !== '')
    setDraftTags(nonEmptyTags)
  }

  const handleAddTagField = () => {
    // Only add new field if all current fields have values
    const allFieldsFilled = tagInputs.every((tag) => tag.trim() !== '')
    if (allFieldsFilled) {
      setTagInputs([...tagInputs, ''])
    }
  }

  const handleRemoveTagField = (index: number) => {
    const newInputs = tagInputs.filter((_, i) => i !== index)
    // Always keep at least one field
    if (newInputs.length === 0) {
      newInputs.push('')
    }
    setTagInputs(newInputs)
    
    // Update draftTags
    const nonEmptyTags = newInputs.filter((tag) => tag.trim() !== '')
    setDraftTags(nonEmptyTags)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <Input
          type="text"
          placeholder="Note title..."
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          className="mb-4 border-0 border-b-2 border-dashed border-[#e0e4ea] px-0 text-2xl font-bold leading-tight tracking-[-0.5px] placeholder:text-[#cacfd8] focus-visible:border-[#0e121b] focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="mb-5 rounded-md border-2 border-[#e0e4ea] bg-[#f9f9f9] p-3">
          <div className="mb-2">
            <div className="mb-2 flex items-center gap-2">
              <div className="relative size-4">
                <Image
                  src="/icons/tag.svg"
                  alt="Tags"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-[#2b303b]">Tags:</span>
            </div>
            
            <div className="flex flex-wrap items-start gap-2">
              {tagInputs.map((tag, index) => (
                <div key={index} className="relative">
                  <Input
                    type="text"
                    placeholder="Enter tag..."
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="h-8 w-32 border border-[#cacfd8] bg-white px-2 py-1 text-xs focus-visible:border-[#3b82f6] focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
                  />
                  {tagInputs.length > 1 && (
                    <button
                      onClick={() => handleRemoveTagField(index)}
                      className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      title="Remove tag field"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={handleAddTagField}
                disabled={!tagInputs.every((tag) => tag.trim() !== '')}
                className="flex size-8 items-center justify-center rounded border border-dashed border-[#cacfd8] bg-white text-[#717784] hover:border-[#3b82f6] hover:bg-[#f0f7ff] hover:text-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#cacfd8] disabled:hover:bg-white disabled:hover:text-[#717784] transition-colors"
                title="Add tag field"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {selectedNoteId && (
            <div className="flex items-center gap-2 text-sm text-[#717784]">
              <div className="relative size-4">
                <Image
                  src="/icons/clock.svg"
                  alt="Last edited"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium">Last edited:</span>
              <span>
                {lastSaved
                  ? lastSaved.toLocaleString()
                  : new Date().toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Textarea
          placeholder="Start writing..."
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          className="min-h-[400px] resize-y border-2 border-dashed border-[#e0e4ea] text-sm leading-relaxed tracking-[-0.2px] placeholder:text-[#cacfd8] focus-visible:border-[#0e121b]"
        />
      </div>

      <div className="flex items-center justify-between border-t-2 border-[#e0e4ea] bg-[#f9f9f9] px-6 py-4">
        <div className="text-xs text-[#717784]">
          {lastSaved && (
            <span>Auto-saved at {lastSaved.toLocaleTimeString()}</span>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-[#cacfd8]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateNote.isPending || createNote.isPending}
          >
            {updateNote.isPending || createNote.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}


