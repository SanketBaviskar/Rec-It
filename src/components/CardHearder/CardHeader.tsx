// src/components/ui/card/CardHeader.tsx

import React, { ReactNode } from 'react'

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`border-b pb-2 mb-4 ${className}`}>
      {children}
    </div>
  )
}
