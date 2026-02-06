'use client'

import { Button } from '@/components/ui/button'
import { useUIStore } from '@/lib/store/ui-store'
import { ThemeOption } from './ThemeOption'
import { useState, useEffect } from 'react'

export function FontThemeSettings() {
  const fontTheme = useUIStore((state) => state.fontTheme)
  const setFontTheme = useUIStore((state) => state.setFontTheme)
  const [selectedFont, setSelectedFont] = useState(fontTheme)

  useEffect(() => {
    setSelectedFont(fontTheme)
  }, [fontTheme])

  const handleApply = () => {
    setFontTheme(selectedFont)
    
    // Apply font theme to DOM
    const root = document.documentElement
    root.classList.remove('font-sans', 'font-serif', 'font-mono')
    
    if (selectedFont === 'serif') {
      root.classList.add('font-serif')
    } else if (selectedFont === 'mono') {
      root.classList.add('font-mono')
    } else {
      root.classList.add('font-sans')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold leading-tight tracking-[-0.3px] text-foreground">
          Font Theme
        </h2>
        <p className="text-sm font-normal tracking-[-0.2px] text-muted-foreground">
          Choose your font theme:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ThemeOption
          icon="/icons/font-sans.svg"
          title="Sans-serif"
          description="Clean and modern, easy to read."
          selected={selectedFont === 'sans'}
          onClick={() => setSelectedFont('sans')}
          iconBgColor="bg-primary"
        />
        <ThemeOption
          icon="/icons/font-serif.svg"
          title="Serif"
          description="Classic and elegant for a timeless feel."
          selected={selectedFont === 'serif'}
          onClick={() => setSelectedFont('serif')}
          iconBgColor="bg-primary"
        />
        <ThemeOption
          icon="/icons/font-mono.svg"
          title="Monospace"
          description="Code-like, great for a technical vibe."
          selected={selectedFont === 'mono'}
          onClick={() => setSelectedFont('mono')}
          iconBgColor="bg-primary"
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
