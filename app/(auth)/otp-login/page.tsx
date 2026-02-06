'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { OtpInput } from '@/components/ui/otp-input'
import { Mail, ArrowLeft, Check } from 'lucide-react'

type Step = 'email' | 'verify' | 'success'

export default function OtpLoginPage() {
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get('email') || ''
  
  const [step, setStep] = useState<Step>(initialEmail ? 'verify' : 'email')
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [maskedEmail, setMaskedEmail] = useState('')
  
  const { signInWithOtp, verifyOtp, resendOtp, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Mask email for security display
  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@')
    if (username.length <= 2) {
      return `${username[0]}***@${domain}`
    }
    return `${username[0]}${username[1]}***@${domain}`
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const { error } = await signInWithOtp(email)

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setMaskedEmail(maskEmail(email))
      setStep('verify')
      setCountdown(60) // 60 second cooldown
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (code: string) => {
    setError('')
    setIsLoading(true)

    const { error } = await verifyOtp(email, code)

    if (error) {
      setError(error.message)
      setOtp('') // Clear OTP on error
      setIsLoading(false)
    } else {
      setStep('success')
      // Router will redirect in useEffect when user state updates
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return
    
    setError('')
    setIsLoading(true)

    const { error } = await resendOtp(email)

    if (error) {
      setError(error.message)
    } else {
      setCountdown(60)
      setOtp('')
    }

    setIsLoading(false)
  }

  const handleBack = () => {
    setStep('email')
    setOtp('')
    setError('')
  }

  return (
    <div className="w-full max-w-[540px] bg-white rounded-[12px] border border-[#e0e4ea] shadow-[0px_8px_12px_rgba(240,240,240,0.6)] p-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2.5 mb-6">
        <Image
          src="/assets/tonote-logo.png"
          alt="ToNote"
          width={28}
          height={28}
          className="object-contain"
          unoptimized
        />
        <h1 className="font-[family-name:var(--font-pacifico)] text-[23px] leading-none tracking-[-0.46px] text-[#0e121b]">
          ToNote
        </h1>
      </div>

      {/* Step 1: Email Input */}
      {step === 'email' && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-16 h-16 mx-auto bg-[#f0f7ff] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <h2 className="text-2xl font-bold tracking-[-0.5px] leading-[28.8px] text-[#0e121b]">
              Sign in with Email
            </h2>
            <p className="text-sm tracking-[-0.2px] text-[#525866]">
              We'll send you a 6-digit code to verify your email
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSendOtp} className="space-y-4">
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
                disabled={isLoading}
                className="h-11 px-4 border-[#e0e4ea] rounded-[8px] text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full h-11 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-[8px] font-semibold"
            >
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e0e4ea]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#717784]">or</span>
            </div>
          </div>

          <Link
            href="/login"
            className="block text-center text-sm text-[#3b82f6] hover:underline"
          >
            Sign in with password instead
          </Link>
        </div>
      )}

      {/* Step 2: OTP Verification */}
      {step === 'verify' && (
        <div className="space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-[#525866] hover:text-[#0e121b] transition-colors"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="space-y-2 text-center">
            <div className="w-16 h-16 mx-auto bg-[#f0f7ff] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <h2 className="text-2xl font-bold tracking-[-0.5px] leading-[28.8px] text-[#0e121b]">
              Check Your Email
            </h2>
            <p className="text-sm tracking-[-0.2px] text-[#525866]">
              We sent a 6-digit code to
            </p>
            <p className="text-sm font-semibold text-[#0e121b]">{maskedEmail}</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium tracking-[-0.2px] text-[#0e121b] text-center block">
                Enter Verification Code
              </Label>
              <OtpInput
                length={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyOtp}
                disabled={isLoading}
                error={!!error}
              />
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-[#717784]">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOtp}
                disabled={countdown > 0 || isLoading}
                className="text-sm font-medium text-[#3b82f6] hover:underline disabled:text-[#717784] disabled:no-underline disabled:cursor-not-allowed"
              >
                {countdown > 0
                  ? `Resend code in ${countdown}s`
                  : 'Resend code'}
              </button>
            </div>
          </div>

          <div className="bg-[#f3f5f8] border border-[#e0e4ea] rounded-lg p-4">
            <p className="text-xs text-[#525866] text-center">
              💡 <strong>Tip:</strong> Check your spam folder if you don't see the email
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 'success' && (
        <div className="space-y-6 text-center py-8">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 animate-[scale-in_0.3s_ease-out]">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-[-0.5px] text-[#0e121b]">
              Verified Successfully! ✨
            </h2>
            <p className="text-sm text-[#525866]">
              Redirecting you to your notes...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[#e0e4ea] text-center">
        <p className="text-xs text-[#717784]">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#3b82f6] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
