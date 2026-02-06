'use client'

import Image from 'next/image'

interface ThemeOptionProps {
  icon: string
  title: string
  description: string
  selected: boolean
  onClick: () => void
  iconBgColor?: string
}

export function ThemeOption({
  icon,
  title,
  description,
  selected,
  onClick,
  iconBgColor,
}: ThemeOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
        selected
          ? 'border-border bg-muted'
          : 'border-border bg-card hover:bg-muted'
      }`}
    >
      <div
        className={`flex size-12 items-center justify-center rounded-lg ${
          iconBgColor || 'bg-muted'
        }`}
      >
        <div className="relative size-6">
          <Image src={icon} alt={title} fill className="object-contain dark:invert" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium leading-tight tracking-[-0.2px] text-foreground">
          {title}
        </div>
        <div className="mt-1.5 text-xs font-normal leading-tight tracking-[-0.2px] text-muted-foreground">
          {description}
        </div>
      </div>
      <div className="flex size-4 items-center justify-center">
        {selected ? (
          <div className="size-4 rounded-full border-4 border-primary" />
        ) : (
          <div className="size-4 rounded-full border-2 border-border" />
        )}
      </div>
    </button>
  )
}
