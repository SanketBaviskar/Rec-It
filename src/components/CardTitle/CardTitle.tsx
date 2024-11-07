// src/components/ui/card/CardTitle.tsx

import React from 'react'

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h2 className={`text-lg font-bold ${className}`}>
      {children}
    </h2>
  )
}
