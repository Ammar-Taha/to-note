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
          ? 'border-[#0e121b] bg-[#f3f5f8]'
          : 'border-[#e0e4ea] bg-white hover:bg-[#f9f9f9]'
      )}
    >
      <div className="relative size-5">
        <Image
          src={icon}
          alt={label}
          fill
          className="object-contain"
          style={{ color: isActive ? '#0e121b' : '#525866' }}
        />
      </div>
      <span className={cn(isActive ? 'text-[#0e121b]' : 'text-[#2b303b]')}>
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
