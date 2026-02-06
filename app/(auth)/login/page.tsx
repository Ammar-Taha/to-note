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
import { Mail } from 'lucide-react'

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
    <div className="w-full max-w-[540px] bg-card rounded-[12px] border border-border shadow-[0px_8px_12px_rgba(240,240,240,0.6)] p-8 space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2.5">
        <Image
          src="/tonote.png"
          alt="ToNote"
          width={28}
          height={28}
          className="object-contain"
          unoptimized
        />
        <h1 className="font-[family-name:var(--font-pacifico)] text-[23px] leading-none tracking-[-0.46px] text-foreground">
          ToNote
        </h1>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-[-0.5px] leading-[28.8px] text-foreground">
          Welcome to ToNote
        </h2>
        <p className="text-sm tracking-[-0.2px] text-muted-foreground">
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
            className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-foreground"
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
            className="h-11 rounded-[12px] border-border placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium tracking-[-0.2px] leading-[16.8px] text-foreground"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground underline hover:text-foreground"
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
              className="h-11 rounded-[12px] border-border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Image
                src="/assets/eye-icon.svg"
                alt="Toggle password visibility"
                width={20}
                height={20}
                className="dark:invert"
              />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-[12px] text-base font-semibold tracking-[-0.3px] leading-[19.2px]"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or continue with</span>
        </div>
      </div>

      {/* Alternative Login Methods */}
      <div className="space-y-3">
        {/* Email OTP */}
        <Link href="/otp-login">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-[12px] border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span className="text-base font-semibold tracking-[-0.3px]">
              Sign in with Email Code
            </span>
          </Button>
        </Link>

        {/* Google OAuth */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full h-12 rounded-[12px] border-border hover:bg-muted"
        >
          <Image
            src="/assets/google-icon.svg"
            alt="Google"
            width={18}
            height={18}
            className="mr-2 dark:invert"
          />
          <span className="text-base font-medium tracking-[0.5px] leading-4 text-foreground">
            Continue with Google
          </span>
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-center tracking-[-0.2px] text-muted-foreground">
          No account yet?{' '}
          <Link
            href="/signup"
            className="text-foreground font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}




