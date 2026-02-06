'use client'

import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'

interface SearchInputProps {
  className?: string
}

export function SearchInput({ className }: SearchInputProps) {
  const searchQuery = useUIStore((state) => state.searchQuery)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-[#cacfd8] bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_rgba(10,13,20,0.03)]',
        className
      )}
    >
      <div className="relative size-5 flex-shrink-0">
        <Image
          src="/icons/search.svg"
          alt="Search"
          fill
          className="object-contain"
        />
      </div>
      <Input
        type="text"
        placeholder="Search by title, content, or tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-auto border-0 bg-transparent p-0 text-sm text-[#0e121b] placeholder:text-[#717784] focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
