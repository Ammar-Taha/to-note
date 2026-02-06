'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import type { Note } from '@/types'
import { format } from 'date-fns'

interface NoteListItemProps {
  note: Note
  isActive: boolean
}

export function NoteListItem({ note, isActive }: NoteListItemProps) {
  const setSelectedNoteId = useUIStore((state) => state.setSelectedNoteId)
  const setIsEditing = useUIStore((state) => state.setIsEditing)

  const handleClick = () => {
    setSelectedNoteId(note.id)
    setIsEditing(false) // Always open in view mode
  }

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'cursor-pointer rounded-md border-2 p-4 transition-all hover:bg-[#f9f9f9]',
        isActive
          ? 'border-[#0e121b] bg-[#f3f5f8]'
          : 'border-[#e0e4ea] bg-white hover:shadow-[2px_2px_0_#e0e4ea]'
      )}
    >
      <h3 className="mb-2 text-sm font-semibold leading-tight tracking-[-0.3px] text-[#0e121b]">
        {note.title}
      </h3>
      <div className="mb-1.5 flex flex-wrap gap-1">
        {note.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-sm border border-[#cacfd8] bg-[#f3f5f8] px-1.5 py-0.5 text-[10px] font-normal leading-none tracking-[-0.2px] text-[#0e121b]"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-[11px] leading-none tracking-[-0.2px] text-[#717784]">
        {format(new Date(note.updated_at), 'dd MMM yyyy')}
      </p>
    </Card>
  )
}
