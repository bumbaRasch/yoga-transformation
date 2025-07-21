'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Animation and style constants
const SKELETON_CONFIG = {
  animation: {
    duration: 1.5,
    ease: 'linear' as const,
    backgroundPosition: ['200% 0', '-200% 0']
  },
  backgroundSize: '200% 100%',
  defaultHeight: '1rem',
  staggerDelay: 0.1
} as const

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animate?: boolean
}

export const Skeleton = React.memo(function Skeleton({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = 'md',
  animate = true
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  const baseClasses = `
    bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
    dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
    animate-pulse
    ${roundedClasses[rounded]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  const ariaProps = {
    role: 'status',
    'aria-label': 'Loading content',
    'aria-live': 'polite' as const
  }

  if (!animate) {
    return <div className={baseClasses} style={style} {...ariaProps} />
  }

  return (
    <motion.div
      className={baseClasses}
      style={{
        ...style,
        backgroundSize: SKELETON_CONFIG.backgroundSize
      }}
      animate={{
        backgroundPosition: [...SKELETON_CONFIG.animation.backgroundPosition]
      }}
      transition={{
        duration: SKELETON_CONFIG.animation.duration,
        repeat: Infinity,
        ease: SKELETON_CONFIG.animation.ease
      }}
      {...ariaProps}
    />
  )
})

// Preset skeleton components for common use cases
export const SkeletonText = React.memo(function SkeletonText({
  lines = 1,
  className = ''
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`.trim()} role="group" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * SKELETON_CONFIG.staggerDelay }}
        >
          <Skeleton
            height={SKELETON_CONFIG.defaultHeight}
            width={i === lines - 1 ? '75%' : '100%'}
            className={i === lines - 1 ? 'mr-auto' : ''}
            animate={false} // Use CSS animation for better performance
          />
        </motion.div>
      ))}
    </div>
  )
})

export const SkeletonCard = React.memo(function SkeletonCard({
  className = ''
}: {
  className?: string
}) {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg
        border border-gray-100 dark:border-gray-700
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="status"
      aria-label="Loading testimonial"
    >
      <div className="flex items-start space-x-4">
        <Skeleton width={40} height={40} rounded="full" animate={false} />
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Skeleton height={SKELETON_CONFIG.defaultHeight} width="40%" animate={false} />
            <Skeleton height="0.75rem" width="60%" animate={false} />
          </div>
          <SkeletonText lines={2} />
          <div className="flex space-x-2" role="group" aria-label="Loading rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton 
                key={i} 
                width={16} 
                height={16} 
                rounded="sm" 
                animate={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})