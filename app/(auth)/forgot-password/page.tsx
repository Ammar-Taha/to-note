"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

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
          Forgotten your password?
        </h2>
        <p className="text-sm tracking-[-0.2px] text-[#525866]">
          Enter your email below, and we will send you a link to reset it.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Password reset link sent! Please check your email.
          </AlertDescription>
        </Alert>
      )}

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

        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full h-12 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-[12px] text-base font-semibold tracking-[-0.3px] leading-[19.2px]"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      {/* Back to Login */}
      <div className="pt-4 text-center">
        <Link
          href="/login"
          className="text-sm text-[#525866] hover:text-[#0e121b] hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

