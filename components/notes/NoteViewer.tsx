'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { useNotes } from '@/hooks/use-notes'
import { useUIStore } from '@/lib/store/ui-store'

export function NoteViewer() {
  const selectedNoteId = useUIStore((state) => state.selectedNoteId)
  const { data: notes = [] } = useNotes()
  
  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  if (!selectedNote) {
    return null
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold leading-tight tracking-[-0.5px] text-[#0e121b]">
          {selectedNote.title}
        </h1>

        {/* Metadata and Tags */}
        <div className="mb-5 rounded-md border-2 border-[#e0e4ea] bg-[#f9f9f9] p-3">
          {/* Tags */}
          {selectedNote.tags.length > 0 && (
            <div className="mb-3">
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
              <div className="flex flex-wrap gap-2">
                {selectedNote.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white border border-[#cacfd8] text-[#2b303b] hover:bg-[#f0f7ff]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Last edited */}
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
              {new Date(selectedNote.updated_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content - Rendered as HTML */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none note-viewer-content"
          dangerouslySetInnerHTML={{ __html: selectedNote.content || '<p class="text-[#717784] italic">No content</p>' }}
        />
      </div>
    </div>
  )
}
