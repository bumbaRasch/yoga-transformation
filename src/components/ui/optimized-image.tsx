'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getImagePath } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | string
  showSkeleton?: boolean
  webpFallback?: string
  avifFallback?: string
}

// Animation configuration for consistent image loading
const IMAGE_ANIMATION = {
  loading: {
    opacity: 0,
    scale: 1.05
  },
  loaded: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
} as const

// Aspect ratio presets
const ASPECT_RATIOS = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]'
} as const

/**
 * Optimized image component with WebP/AVIF support, loading states, and performance optimization
 * Features:
 * - Automatic WebP/AVIF format optimization
 * - Loading skeleton with smooth animations
 * - Responsive sizes for different breakpoints
 * - Error handling with fallback images
 * - Lazy loading with intersection observer
 * - Progressive enhancement
 */
export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  aspectRatio,
  showSkeleton = true,
  webpFallback,
  avifFallback
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  const [currentSrc, setCurrentSrc] = useState(getImagePath(src))

  // Handle successful image load
  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  // Handle image load error with fallback strategy
  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
    
    // Try fallbacks if provided
    if (webpFallback && currentSrc !== getImagePath(webpFallback)) {
      setCurrentSrc(getImagePath(webpFallback))
      setIsLoading(true)
      setHasError(false)
    } else if (avifFallback && currentSrc !== getImagePath(avifFallback)) {
      setCurrentSrc(getImagePath(avifFallback))
      setIsLoading(true)
      setHasError(false)
    }
  }, [currentSrc, webpFallback, avifFallback])

  // Generate responsive sizes for different breakpoints
  const responsiveSizes = sizes || (() => {
    if (fill) return '100vw'
    if (width && width <= 400) return '(max-width: 768px) 100vw, 400px'
    if (width && width <= 800) return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  })()

  // Build CSS classes
  const aspectRatioClass = aspectRatio 
    ? ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS] || aspectRatio
    : ''
  
  const containerClasses = `
    relative overflow-hidden rounded-lg
    ${aspectRatioClass}
    ${className}
  `.trim()

  const imageClasses = `
    transition-all duration-300 ease-in-out
    ${hasError ? 'opacity-50 grayscale' : ''}
  `.trim()

  // Loading skeleton component
  const Skeleton = () => (
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-600/20 animate-shimmer" />
    </div>
  )

  // Error fallback component
  const ErrorFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Image unavailable</p>
      </div>
    </div>
  )

  return (
    <div className={containerClasses}>
      {/* Loading skeleton */}
      {isLoading && showSkeleton && <Skeleton />}
      
      {/* Error fallback */}
      {hasError && <ErrorFallback />}
      
      {/* Main image with animation */}
      <motion.div
        initial={IMAGE_ANIMATION.loading}
        animate={isLoading ? IMAGE_ANIMATION.loading : IMAGE_ANIMATION.loaded}
        className="relative w-full h-full"
      >
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={responsiveSizes}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </motion.div>
    </div>
  )
})

// Prebuilt responsive image sizes for common use cases
export const RESPONSIVE_SIZES = {
  hero: '100vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  thumbnail: '(max-width: 768px) 50vw, 200px',
  avatar: '(max-width: 768px) 40px, 80px',
  full: '100vw'
} as const

// Helper function to generate WebP/AVIF sources
export function generateImageSources(baseSrc: string) {
  const baseUrl = baseSrc.split('.').slice(0, -1).join('.')
  
  return {
    avif: `${baseUrl}.avif`,
    webp: `${baseUrl}.webp`,
    fallback: baseSrc
  }
}

// Higher-order component for image optimization
export function withImageOptimization<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>
) {
  return React.memo(function OptimizedComponent(props: T) {
    return <Component {...props} />
  })
}