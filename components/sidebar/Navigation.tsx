'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store/ui-store'
import type { ViewFilter } from '@/types'

interface NavItemProps {
  icon: string
  label: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'border-primary bg-muted'
          : 'border-border bg-card hover:bg-muted'
      )}
    >
      <div className={cn('relative size-5', isActive ? 'text-foreground' : 'text-muted-foreground')}>
        <Image
          src={icon}
          alt={label}
          fill
          className="object-contain"
        />
      </div>
      <span className={cn(isActive ? 'text-foreground' : 'text-muted-foreground')}>
        {label}
      </span>
    </button>
  )
}

export function Navigation() {
  const viewFilter = useUIStore((state) => state.viewFilter)
  const setViewFilter = useUIStore((state) => state.setViewFilter)

  const handleFilterChange = (filter: ViewFilter) => {
    setViewFilter(filter)
  }

  return (
    <div className="flex flex-col gap-1">
      <NavItem
        icon="/icons/home.svg"
        label="All Notes"
        isActive={viewFilter === 'all'}
        onClick={() => handleFilterChange('all')}
      />
      <NavItem
        icon="/icons/archive.svg"
        label="Archived Notes"
        isActive={viewFilter === 'archived'}
        onClick={() => handleFilterChange('archived')}
      />
    </div>
  )
}
