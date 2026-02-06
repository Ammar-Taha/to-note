import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative size-7">
        <Image
          src="/tonote.png"
          alt="ToNote"
          fill
          sizes="28px"
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="font-['Pacifico'] text-[23px] leading-none tracking-[-0.46px]">
        ToNote
      </span>
    </div>
  )
}


