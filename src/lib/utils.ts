import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function getDayFromTimestamp(timestamp: number): number {
  const startDate = new Date('2025-01-01')
  const currentDate = new Date(timestamp)
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.min(diffDays, 14)
}

/**
 * Get the correct image path for the current environment
 * In production (GitHub Pages), prepends the basePath
 * In development, returns the path as-is
 */
export function getImagePath(imagePath: string): string {
  // Ensure the path starts with /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  
  // In production, prepend the basePath
  if (process.env.NODE_ENV === 'production') {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/yoga-transformation'
    return `${basePath}${normalizedPath}`
  }
  
  // In development, return as-is
  return normalizedPath
}