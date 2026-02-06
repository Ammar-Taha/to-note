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
          ? 'border-[#e0e4ea] bg-[#f3f5f8]'
          : 'border-[#e0e4ea] bg-white hover:bg-[#f9f9f9]'
      }`}
    >
      <div
        className={`flex size-12 items-center justify-center rounded-lg ${
          iconBgColor || 'bg-white'
        }`}
      >
        <div className="relative size-6">
          <Image src={icon} alt={title} fill className="object-contain" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium leading-tight tracking-[-0.2px] text-[#0e121b]">
          {title}
        </div>
        <div className="mt-1.5 text-xs font-normal leading-tight tracking-[-0.2px] text-[#2b303b]">
          {description}
        </div>
      </div>
      <div className="flex size-4 items-center justify-center">
        {selected ? (
          <div className="size-4 rounded-full border-4 border-[#3b82f6]" />
        ) : (
          <div className="size-4 rounded-full border-2 border-[#cacfd8]" />
        )}
      </div>
    </button>
  )
}
