'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { updatePassword } = useAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const { error } = await updatePassword(newPassword)

    if (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-[540px] bg-white rounded-[12px] border border-[#e0e4ea] shadow-[0px_8px_12px_rgba(240,240,240,0.6)] p-8 space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2.5">
        <Image
          src="/assets/feather-logo.svg"
          alt="Notes"
          width={28}
          height={28}
          className="text-[#3b82f6]"
        />
        <h1 className="font-[family-name:var(--font-pacifico)] text-[23px] leading-none tracking-[-0.46px] text-[#0e121b]">
          Notes
        </h1>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-[-0.5px] leading-[28.8px] text-[#0e121b]">
          Reset Your Password
        </h2>
        <p className="text-sm tracking-[-0.2px] text-[#525866]">
          Choose a new password to secure your account.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="new-password"
            className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-[#0e121b]"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="h-11 rounded-[12px] border-[#e0e4ea] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525866] hover:text-[#0e121b]"
            >
              <Image
                src="/assets/eye-icon.svg"
                alt="Toggle password visibility"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Image
              src="/assets/info-icon.svg"
              alt="Info"
              width={16}
              height={16}
              className="text-[#525866]"
            />
            <span className="text-xs text-[#525866]">
              At least 8 characters
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="confirm-password"
            className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-[#0e121b]"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-11 rounded-[12px] border-[#e0e4ea] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#525866] hover:text-[#0e121b]"
            >
              <Image
                src="/assets/eye-icon.svg"
                alt="Toggle password visibility"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-[12px] text-base font-semibold tracking-[-0.3px] leading-[19.2px]"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}
