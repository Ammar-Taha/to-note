'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/lib/store/ui-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorTheme = useUIStore((state) => state.colorTheme)
  const fontTheme = useUIStore((state) => state.fontTheme)

  // Apply theme on mount and when it changes
  useEffect(() => {
    const root = document.documentElement

    // Apply color theme
    if (colorTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemPrefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else if (colorTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [colorTheme])

  // Apply font theme
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('font-sans', 'font-serif', 'font-mono')
    
    if (fontTheme === 'serif') {
      root.classList.add('font-serif')
    } else if (fontTheme === 'mono') {
      root.classList.add('font-mono')
    } else {
      root.classList.add('font-sans')
    }
  }, [fontTheme])

  return <>{children}</>
}
