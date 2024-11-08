import React from 'react'

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = ({ className, ...props }) => (
  <span className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props} />
)

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => (
  <img className={`aspect-square h-full w-full ${className}`} {...props} />
)

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
  <span className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props} />
)