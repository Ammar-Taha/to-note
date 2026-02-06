'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUIStore } from '@/lib/store/ui-store'
import { SettingsMenu } from './SettingsMenu'
import { ColorThemeSettings } from './ColorThemeSettings'
import { FontThemeSettings } from './FontThemeSettings'
import { ChangePasswordSettings } from './ChangePasswordSettings'

export function SettingsDialog() {
  const isOpen = useUIStore((state) => state.isSettingsOpen)
  const openSettings = useUIStore((state) => state.openSettings)
  const closeSettings = useUIStore((state) => state.closeSettings)
  const activeSection = useUIStore((state) => state.activeSettingSection)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openSettings() : closeSettings())}
    >
      <DialogContent className="max-w-[850px] gap-0 p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="flex min-h-[500px]">
          <SettingsMenu />
          
          <div className="flex-1 p-8">
            {activeSection === 'color' && <ColorThemeSettings />}
            {activeSection === 'font' && <FontThemeSettings />}
            {activeSection === 'password' && <ChangePasswordSettings />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
