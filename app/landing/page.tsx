"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, Search, Archive } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to the app
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <Image
            src="/tonote.png"
            alt="ToNote"
            width={64}
            height={64}
            className="object-contain"
            unoptimized
          />
          <h1 className="font-[family-name:var(--font-pacifico)] text-[32px] leading-none tracking-[-0.64px] text-[#0e121b]">
            ToNote
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold tracking-[-1px] leading-tight text-[#0e121b] mb-6">
          Your thoughts,
          <br />
          beautifully organized
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#525866] mb-10 max-w-2xl mx-auto leading-relaxed">
          A modern, minimal note-taking app that helps you capture ideas,
          organize with tags, and find what matters—instantly.
        </p>

        {/* CTA Button */}
        <Link href="/signup">
          <Button className="h-14 px-12 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-[12px] text-lg font-semibold tracking-[-0.3px] shadow-lg">
            Get Started Free →
          </Button>
        </Link>

        {/* Small Print */}
        <p className="text-sm text-[#717784] mt-4">
          No credit card required • Free forever
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold tracking-[-0.5px] text-[#0e121b] mb-4">
            Everything you need to stay organized
          </h3>
          <p className="text-base md:text-lg text-[#525866]">
            Simple, powerful features that make note-taking effortless
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Smart Tags */}
          <Card className="bg-white border-[#e0e4ea] rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#3b82f6]/10 rounded-[12px] flex items-center justify-center">
                <Tag className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <h4 className="text-xl font-bold text-[#0e121b] mb-3">
                Smart Tags
              </h4>
              <p className="text-[#525866] leading-relaxed">
                Organize your notes with flexible tags. Filter and find what you
                need in seconds.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2: Instant Search */}
          <Card className="bg-white border-[#e0e4ea] rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#3b82f6]/10 rounded-[12px] flex items-center justify-center">
                <Search className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <h4 className="text-xl font-bold text-[#0e121b] mb-3">
                Instant Search
              </h4>
              <p className="text-[#525866] leading-relaxed">
                Lightning-fast search across all your notes. Find exactly what
                you&apos;re looking for.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3: Archive & Organize */}
          <Card className="bg-white border-[#e0e4ea] rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#3b82f6]/10 rounded-[12px] flex items-center justify-center">
                <Archive className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <h4 className="text-xl font-bold text-[#0e121b] mb-3">
                Archive & Organize
              </h4>
              <p className="text-[#525866] leading-relaxed">
                Keep your workspace clean. Archive old notes without losing
                them.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white border-2 border-[#e0e4ea] rounded-[16px] shadow-lg p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold tracking-[-0.5px] text-[#0e121b] mb-4">
            Ready to get organized?
          </h3>
          <p className="text-lg text-[#525866] mb-8">
            Join thousands of users who&apos;ve simplified their note-taking.
          </p>
          <Link href="/signup">
            <Button className="h-14 px-12 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-[12px] text-lg font-semibold tracking-[-0.3px] shadow-lg">
              Start Taking Notes →
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-[#e0e4ea]">
        <p className="text-center text-sm text-[#525866]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#0e121b] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
