'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import { useAllTags } from '@/hooks/use-notes'

export function TagsPanel() {
  const { data: tags = [], isLoading } = useAllTags()
  const selectedTags = useUIStore((state) => state.selectedTags)
  const toggleTag = useUIStore((state) => state.toggleTag)

  if (isLoading) {
    return (
      <div>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.5px] text-muted-foreground">
          Tags
        </div>
        <div className="text-sm text-muted-foreground">Loading tags...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.5px] text-muted-foreground">
        Tags
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-[20px] border px-2.5 py-1.5 text-xs transition-colors',
                isSelected
                  ? 'border-primary bg-accent text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-border hover:bg-muted'
              )}
            >
              <div className="relative size-3">
                <Image
                  src="/icons/tag.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span>{tag}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
