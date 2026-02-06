'use client'

import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store/ui-store'
import { ThemeOption } from './ThemeOption'
import { useState, useEffect } from 'react'

export function ColorThemeSettings() {
  const colorTheme = useUIStore((state) => state.colorTheme)
  const setColorTheme = useUIStore((state) => state.setColorTheme)
  const [selectedTheme, setSelectedTheme] = useState(colorTheme)

  useEffect(() => {
    setSelectedTheme(colorTheme)
  }, [colorTheme])

  const handleApply = () => {
    setColorTheme(selectedTheme)
    
    // Apply theme to DOM
    const root = document.documentElement
    
    if (selectedTheme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemPrefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    } else if (selectedTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold leading-tight tracking-[-0.3px] text-foreground">
          Color Theme
        </h2>
        <p className="text-sm font-normal tracking-[-0.2px] text-muted-foreground">
          Choose your color theme:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ThemeOption
          icon="/icons/sun.svg"
          title="Light Mode"
          description="Pick a clean and classic light theme"
          selected={selectedTheme === 'light'}
          onClick={() => setSelectedTheme('light')}
        />
        <ThemeOption
          icon="/icons/moon.svg"
          title="Dark Mode"
          description="Select a sleek and modern dark theme"
          selected={selectedTheme === 'dark'}
          onClick={() => setSelectedTheme('dark')}
        />
        <ThemeOption
          icon="/icons/monitor.svg"
          title="System"
          description="Adapts to your device's theme"
          selected={selectedTheme === 'system'}
          onClick={() => setSelectedTheme('system')}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleApply}
          className="bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  )
}
