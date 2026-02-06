'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store/ui-store'
import { useUpdateNote, useCreateNote } from '@/hooks/use-notes'

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

  const [newTag, setNewTag] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const updateNote = useUpdateNote()
  const createNote = useCreateNote()

  const isNewNote = !selectedNoteId

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
  }

  const handleAddTag = () => {
    if (newTag.trim() && !draftTags.includes(newTag.trim())) {
      setDraftTags([...draftTags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setDraftTags(draftTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
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
            <div className="flex flex-wrap gap-1">
              {draftTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 rounded-sm border border-[#cacfd8] bg-white px-1.5 py-0.5 text-xs"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-0.5 text-[#717784] hover:text-[#0e121b]"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Input
                type="text"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-6 w-24 border-0 bg-transparent px-1 py-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
              />
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


