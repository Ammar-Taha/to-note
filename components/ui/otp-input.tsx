'use client'

import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from 'react'
import { cn } from '@/lib/utils'

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  error?: boolean
  className?: string
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputsRef.current[0] && !disabled) {
      inputsRef.current[0].focus()
    }
  }, [disabled])

  // Check if complete and trigger callback
  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value)
    }
  }, [value, length, onComplete])

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    const digit = inputValue.replace(/\D/g, '').slice(0, 1)
    
    const newValue = value.split('')
    newValue[index] = digit
    const newValueString = newValue.join('').slice(0, length)
    
    onChange(newValueString)

    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
      setActiveIndex(index + 1)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Backspace: clear current and move to previous
    if (e.key === 'Backspace') {
      e.preventDefault()
      
      const newValue = value.split('')
      
      if (newValue[index]) {
        // Clear current digit
        newValue[index] = ''
        onChange(newValue.join(''))
      } else if (index > 0) {
        // Move to previous and clear
        newValue[index - 1] = ''
        onChange(newValue.join(''))
        inputsRef.current[index - 1]?.focus()
        setActiveIndex(index - 1)
      }
    }
    
    // Arrow Left
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputsRef.current[index - 1]?.focus()
      setActiveIndex(index - 1)
    }
    
    // Arrow Right
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      inputsRef.current[index + 1]?.focus()
      setActiveIndex(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length)
    
    if (pastedData) {
      onChange(pastedData)
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputsRef.current[nextIndex]?.focus()
      setActiveIndex(nextIndex)
    }
  }

  const handleFocus = (index: number) => {
    setActiveIndex(index)
    // Select the content on focus for easy replacement
    inputsRef.current[index]?.select()
  }

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={cn(
            'w-12 h-14 text-center text-2xl font-bold',
            'border-2 rounded-lg',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            // Default state
            'border-[#e0e4ea] bg-white text-[#0e121b]',
            // Focus state
            'focus:border-[#3b82f6] focus:ring-[#3b82f6]/20',
            // Filled state
            value[index] && 'border-[#3b82f6] bg-[#f0f7ff]',
            // Active state
            activeIndex === index && !disabled && 'border-[#3b82f6] ring-2 ring-[#3b82f6]/20',
            // Error state
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            // Disabled state
            disabled && 'bg-[#f3f5f8] text-[#717784] cursor-not-allowed opacity-50',
            // Hover state
            !disabled && 'hover:border-[#3b82f6]/50'
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
