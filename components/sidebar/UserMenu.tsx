'use client'

import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'

export function UserMenu() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div className="mt-auto pt-4 border-t border-border">
      <div className="space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground mb-1">Signed in as</p>
          <p className="text-sm font-medium text-foreground truncate">
            {user.email}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={signOut}
          className="w-full justify-start text-sm font-medium border-border hover:bg-muted"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}


