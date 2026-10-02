import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isAxiosError } from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefer the backend's error message (sendErrorResponse puts it in `message`)
export function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message || fallback
  }
  return fallback
}
