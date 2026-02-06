'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/providers/auth-provider'
import { Eye, EyeOff } from 'lucide-react'

export function ChangePasswordSettings() {
  const { updatePassword } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const { error: updateError } = await updatePassword(newPassword)

      if (updateError) throw updateError

      setSuccess(true)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base font-semibold leading-tight tracking-[-0.3px] text-foreground">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="oldPassword"
            className="text-sm font-medium leading-tight tracking-[-0.2px] text-foreground"
          >
            Old Password
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="h-11 border-border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showOldPassword ? (
                <EyeOff className="size-5 text-muted-foreground" />
              ) : (
                <Eye className="size-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="newPassword"
            className="text-sm font-medium leading-tight tracking-[-0.2px] text-foreground"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-11 border-border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showNewPassword ? (
                <EyeOff className="size-5 text-muted-foreground" />
              ) : (
                <Eye className="size-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
            <div className="relative size-4">
              <Image
                src="/icons/info-circle.svg"
                alt="Info"
                fill
                className="object-contain dark:invert"
              />
            </div>
            <span>At least 8 characters</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium leading-tight tracking-[-0.2px] text-foreground"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 border-border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-5 text-muted-foreground" />
              ) : (
                <Eye className="size-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
            Password updated successfully!
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? 'Saving...' : 'Save Password'}
          </Button>
        </div>
      </form>
    </div>
  )
}
