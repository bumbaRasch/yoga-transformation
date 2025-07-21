/**
 * Image optimization utilities for WebP/AVIF support and performance
 */

// Supported modern image formats in order of preference
export const MODERN_IMAGE_FORMATS = ['avif', 'webp', 'jpg', 'jpeg', 'png'] as const
export type ImageFormat = typeof MODERN_IMAGE_FORMATS[number]

// Image quality presets for different use cases
export const IMAGE_QUALITY_PRESETS = {
  thumbnail: 60,
  card: 75,
  hero: 85,
  print: 95
} as const

// Common responsive breakpoints for image sizing
export const IMAGE_BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

/**
 * Check if browser supports modern image formats
 */
export function checkImageFormatSupport(): Promise<{
  webp: boolean
  avif: boolean
}> {
  const webpSupport = new Promise<boolean>((resolve) => {
    const webp = new Image()
    webp.onload = () => resolve(webp.width > 0 && webp.height > 0)
    webp.onerror = () => resolve(false)
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
  })

  const avifSupport = new Promise<boolean>((resolve) => {
    const avif = new Image()
    avif.onload = () => resolve(avif.width > 0 && avif.height > 0)
    avif.onerror = () => resolve(false)
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
  })

  return Promise.all([webpSupport, avifSupport]).then(([webp, avif]) => ({
    webp,
    avif
  }))
}

/**
 * Generate optimized image URLs with different formats and sizes
 */
export function generateResponsiveImageSet(
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): {
  srcSet: string
  webpSrcSet: string
  avifSrcSet: string
  fallbackSrc: string
} {
  const baseUrl = baseSrc.replace(/\.[^/.]+$/, '')
  const extension = baseSrc.split('.').pop()

  // Generate srcSet for different sizes
  const srcSet = sizes
    .map(size => `${baseUrl}-${size}w.${extension} ${size}w`)
    .join(', ')

  const webpSrcSet = sizes
    .map(size => `${baseUrl}-${size}w.webp ${size}w`)
    .join(', ')

  const avifSrcSet = sizes
    .map(size => `${baseUrl}-${size}w.avif ${size}w`)
    .join(', ')

  return {
    srcSet,
    webpSrcSet,
    avifSrcSet,
    fallbackSrc: baseSrc
  }
}

/**
 * Calculate optimal image dimensions based on container and device pixel ratio
 */
export function calculateOptimalImageSize(
  containerWidth: number,
  containerHeight?: number,
  devicePixelRatio: number = 1.5
): { width: number; height?: number } {
  const optimalWidth = Math.ceil(containerWidth * devicePixelRatio)
  const optimalHeight = containerHeight 
    ? Math.ceil(containerHeight * devicePixelRatio)
    : undefined

  return {
    width: optimalWidth,
    height: optimalHeight
  }
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurPlaceholder(
  width: number = 8,
  height: number = 8,
  color: string = '#e5e7eb'
): string {
  // Create a minimal SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="${width}" height="${height}" fill="${color}" filter="url(#blur)" opacity="0.5"/>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = as
    link.href = src
    document.head.appendChild(link)
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyImageLoading(
  selector: string = '[data-lazy-src]',
  rootMargin: string = '50px'
): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const lazySrc = img.getAttribute('data-lazy-src')
          
          if (lazySrc) {
            img.src = lazySrc
            img.removeAttribute('data-lazy-src')
            observer.unobserve(img)
          }
        }
      })
    },
    { rootMargin }
  )

  // Observe all lazy images
  document.querySelectorAll(selector).forEach((img) => {
    observer.observe(img)
  })

  // Return cleanup function
  return () => {
    observer.disconnect()
  }
}

/**
 * Image compression utility for client-side optimization
 */
export function compressImage(
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Image compression failed'))
          }
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => reject(new Error('Image loading failed'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalImageFormat(originalSrc: string): Promise<string> {
  const support = await checkImageFormatSupport()
  const baseUrl = originalSrc.replace(/\.[^/.]+$/, '')
  
  if (support.avif) {
    return `${baseUrl}.avif`
  } else if (support.webp) {
    return `${baseUrl}.webp`
  }
  
  return originalSrc
}

/**
 * Responsive sizes generator for different component types
 */
export const responsiveSizes = {
  hero: () => '100vw',
  card: () => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  thumbnail: () => '(max-width: 768px) 50vw, 200px',
  avatar: (size: number = 40) => `${size}px`,
  gallery: () => '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
}