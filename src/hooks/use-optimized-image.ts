'use client'

import { useState, useEffect, useCallback } from 'react'

interface ImageFormatSupport {
  webp: boolean
  avif: boolean
}

interface OptimizedImageHookOptions {
  src: string
  fallbackFormats?: string[]
  enableFormatDetection?: boolean
  preloadCritical?: boolean
}

interface OptimizedImageResult {
  optimizedSrc: string
  isLoading: boolean
  hasError: boolean
  formatSupport: ImageFormatSupport
  retryLoad: () => void
  preloadImage: () => void
}

/**
 * Custom hook for optimized image loading with format detection and fallback
 */
export function useOptimizedImage({
  src,
  fallbackFormats = ['webp', 'png', 'jpg'],
  enableFormatDetection = true,
  preloadCritical = false
}: OptimizedImageHookOptions): OptimizedImageResult {
  const [formatSupport, setFormatSupport] = useState<ImageFormatSupport>({
    webp: false,
    avif: false
  })
  const [optimizedSrc, setOptimizedSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [fallbackIndex, setFallbackIndex] = useState(0)

  // Detect browser format support
  const detectFormatSupport = useCallback(async (): Promise<ImageFormatSupport> => {
    const checkFormat = (format: 'webp' | 'avif'): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img.width > 0 && img.height > 0)
        img.onerror = () => resolve(false)
        
        if (format === 'webp') {
          img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
        } else {
          img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
        }
      })
    }

    try {
      const [webpSupported, avifSupported] = await Promise.all([
        checkFormat('webp'),
        checkFormat('avif')
      ])

      return {
        webp: webpSupported,
        avif: avifSupported
      }
    } catch {
      return { webp: false, avif: false }
    }
  }, [])

  // Generate optimized image source based on format support
  const generateOptimizedSrc = useCallback((originalSrc: string, support: ImageFormatSupport): string => {
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '')
    const extension = originalSrc.split('.').pop()?.toLowerCase()

    // Only optimize PNG, JPG, JPEG files
    if (!extension || !['png', 'jpg', 'jpeg'].includes(extension)) {
      return originalSrc
    }

    // Try formats in order of preference: AVIF > WebP > Original
    if (support.avif && fallbackFormats.includes('avif')) {
      return `${baseUrl}.avif`
    } else if (support.webp && fallbackFormats.includes('webp')) {
      return `${baseUrl}.webp`
    }

    return originalSrc
  }, [fallbackFormats])

  // Preload image for critical resources
  const preloadImage = useCallback(() => {
    if (typeof window === 'undefined') return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = optimizedSrc
    document.head.appendChild(link)
  }, [optimizedSrc])

  // Test if image loads successfully
  const testImageLoad = useCallback((testSrc: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = testSrc
    })
  }, [])

  // Handle load retry with fallback formats
  const retryLoad = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)

    // Try next fallback format
    if (fallbackIndex < fallbackFormats.length - 1) {
      const nextFormat = fallbackFormats[fallbackIndex + 1]
      const baseUrl = src.replace(/\.[^/.]+$/, '')
      const testSrc = nextFormat === 'original' ? src : `${baseUrl}.${nextFormat}`
      
      const canLoad = await testImageLoad(testSrc)
      if (canLoad) {
        setOptimizedSrc(testSrc)
        setFallbackIndex(prev => prev + 1)
        setIsLoading(false)
      } else {
        setFallbackIndex(prev => prev + 1)
        // Continue trying other formats
        if (fallbackIndex + 1 < fallbackFormats.length - 1) {
          retryLoad()
        } else {
          setHasError(true)
          setIsLoading(false)
        }
      }
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }, [src, fallbackIndex, fallbackFormats, testImageLoad])

  // Initialize format detection and optimal source
  useEffect(() => {
    if (!enableFormatDetection) {
      setOptimizedSrc(src)
      setIsLoading(false)
      return
    }

    detectFormatSupport().then((support) => {
      setFormatSupport(support)
      const optimalSrc = generateOptimizedSrc(src, support)
      setOptimizedSrc(optimalSrc)
      
      // Test if the optimal source loads
      testImageLoad(optimalSrc).then((canLoad) => {
        if (canLoad) {
          setIsLoading(false)
        } else {
          // Try original source as fallback
          testImageLoad(src).then((originalCanLoad) => {
            if (originalCanLoad) {
              setOptimizedSrc(src)
              setIsLoading(false)
            } else {
              setHasError(true)
              setIsLoading(false)
            }
          })
        }
      })
    })
  }, [src, enableFormatDetection, detectFormatSupport, generateOptimizedSrc, testImageLoad])

  // Preload critical images
  useEffect(() => {
    if (preloadCritical && !isLoading && !hasError) {
      preloadImage()
    }
  }, [preloadCritical, isLoading, hasError, preloadImage])

  return {
    optimizedSrc,
    isLoading,
    hasError,
    formatSupport,
    retryLoad,
    preloadImage
  }
}

/**
 * Hook for batch image preloading
 */
export function useImagePreloader(imageSources: string[], critical = false) {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  useEffect(() => {
    if (!critical || imageSources.length === 0) return

    let loaded = 0
    const total = imageSources.length

    imageSources.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === total) {
          setIsAllLoaded(true)
        }
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === total) {
          setIsAllLoaded(true)
        }
      }
      img.src = src
    })
  }, [imageSources, critical])

  return {
    loadedCount,
    totalCount: imageSources.length,
    isAllLoaded,
    progress: imageSources.length > 0 ? (loadedCount / imageSources.length) * 100 : 0
  }
}