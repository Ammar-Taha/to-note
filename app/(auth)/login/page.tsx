'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signInWithGoogle, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError('')
    const { error } = await signInWithGoogle()

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="w-full max-w-[540px] bg-white rounded-[12px] border border-[#e0e4ea] shadow-[0px_8px_12px_rgba(240,240,240,0.6)] p-8 space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2.5">
        <Image
          src="/assets/feather-logo.svg"
          alt="ToNote"
          width={28}
          height={28}
          className="text-[#3b82f6]"
        />
        <h1 className="font-[family-name:var(--font-pacifico)] text-[23px] leading-none tracking-[-0.46px] text-[#0e121b]">
          ToNote
        </h1>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-[-0.5px] leading-[28.8px] text-[#0e121b]">
          Welcome to ToNote
        </h2>
        <p className="text-sm tracking-[-0.2px] text-[#525866]">
          Please log in to continue
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-[#0e121b]"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-[12px] border-[#e0e4ea] placeholder:text-[#717784]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-[#0e121b]"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#525866] underline hover:text-[#0e121b]"
            >
              Forgot
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-[12px] border-[#e0e4ea] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {/* Divider with Google OAuth */}
      <div className="space-y-4 pt-4 border-t border-[#e0e4ea]">
        <p className="text-sm text-center tracking-[-0.2px] text-[#525866]">
          Or log in with:
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full h-12 rounded-[12px] border-[#cacfd8] hover:bg-gray-50"
        >
          <Image
            src="/assets/google-icon.svg"
            alt="Google"
            width={18}
            height={18}
            className="mr-2"
          />
          <span className="text-base font-medium tracking-[0.5px] leading-4 text-[#0e121b]">
            Google
          </span>
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="pt-4 border-t border-[#e0e4ea]">
        <p className="text-sm text-center tracking-[-0.2px] text-[#525866]">
          No account yet?{' '}
          <Link
            href="/signup"
            className="text-[#0e121b] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}


