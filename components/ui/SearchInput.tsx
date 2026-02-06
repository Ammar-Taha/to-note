'use client'

import { useState, useEffect } from 'react'
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
  
  // Local state for immediate input updates
  const [localValue, setLocalValue] = useState(searchQuery)

  // Sync local value when store value changes externally
  useEffect(() => {
    setLocalValue(searchQuery)
  }, [searchQuery])

  // Debounce: Update store after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, setSearchQuery])

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2.5 shadow-sm',
        className
      )}
    >
      <div className="relative size-5 flex-shrink-0">
        <Image
          src="/icons/search.svg"
          alt="Search"
          fill
          className="object-contain dark:invert"
        />
      </div>
      <Input
        type="text"
        placeholder="Search by title, content, or tags..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="h-auto border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
