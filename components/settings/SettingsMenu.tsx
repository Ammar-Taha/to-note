'use client'

import Image from 'next/image'
import { useUIStore } from '@/lib/store/ui-store'
import { useAuth } from '@/components/providers/auth-provider'
import { ChevronRight } from 'lucide-react'

export function SettingsMenu() {
  const activeSection = useUIStore((state) => state.activeSettingSection)
  const setActiveSection = useUIStore((state) => state.setActiveSection)
  const closeSettings = useUIStore((state) => state.closeSettings)
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    closeSettings()
  }

  const menuItems = [
    {
      id: 'color' as const,
      icon: '/icons/sun.svg',
      label: 'Color Theme',
      showChevron: true,
    },
    {
      id: 'font' as const,
      icon: '/icons/type.svg',
      label: 'Font Theme',
      showChevron: false,
    },
    {
      id: 'password' as const,
      icon: '/icons/lock.svg',
      label: 'Change Password',
      showChevron: false,
    },
  ]

  return (
    <div className="flex w-[258px] flex-col gap-2 border-r border-border p-8">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex items-center gap-2 rounded-md px-2 py-2.5 transition-colors ${
            activeSection === item.id
              ? 'bg-muted'
              : 'hover:bg-muted'
          }`}
        >
          <div className="relative size-5">
            <Image
              src={item.icon}
              alt={item.label}
              fill
              className="object-contain dark:invert"
            />
          </div>
          <span className="flex-1 text-left text-sm font-medium leading-tight tracking-[-0.2px] text-foreground">
            {item.label}
          </span>
          {item.showChevron && activeSection === item.id && (
            <ChevronRight className="size-3.5 text-foreground" strokeWidth={2.5} />
          )}
        </button>
      ))}

      <div className="my-2 h-px bg-border" />

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-md px-2 py-2.5 transition-colors hover:bg-muted"
      >
        <div className="relative size-5">
          <Image
            src="/icons/logout.svg"
            alt="Logout"
            fill
            className="object-contain dark:invert"
          />
        </div>
        <span className="text-left text-sm font-medium leading-tight tracking-[-0.2px] text-muted-foreground">
          Logout
        </span>
      </button>
    </div>
  )
}
