'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

type PasswordInputProps = {
  id: string
  name: string
  required?: boolean
  minLength?: number
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  className?: string
  'aria-describedby'?: string
}

export function PasswordInput({
  id,
  name,
  required,
  minLength,
  placeholder,
  autoComplete,
  disabled,
  className,
  'aria-describedby': ariaDescribedby,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={isVisible ? 'text' : 'password'}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-describedby={ariaDescribedby}
        className={`pr-10 ${className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setIsVisible((v) => !v)}
        disabled={disabled}
        tabIndex={0}
        aria-label={
          isVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
        }
        aria-pressed={isVisible}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-zinc-400 transition-colors hover:text-rc-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-rc-yellow disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isVisible ? (
          <EyeOff size={20} aria-hidden="true" />
        ) : (
          <Eye size={20} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
