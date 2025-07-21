'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
  height?: number
  showThreshold?: number
  hideWhenComplete?: boolean
}

export const ScrollProgress = React.memo(function ScrollProgress({ 
  className = '',
  height = 3,
  showThreshold = 5,
  hideWhenComplete = false
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    const clampedProgress = Math.min(Math.max(scrollPercent, 0), 100)
    
    setScrollProgress(clampedProgress)
    
    // Show/hide logic for better visibility
    const shouldShow = clampedProgress >= showThreshold && 
                      (!hideWhenComplete || clampedProgress < 98)
    setIsVisible(shouldShow)
  }, [showThreshold, hideWhenComplete])

  useEffect(() => {
    const throttledUpdateScrollProgress = () => {
      requestAnimationFrame(updateScrollProgress)
    }

    window.addEventListener('scroll', throttledUpdateScrollProgress, { passive: true })
    
    // Initial calculation
    updateScrollProgress()
    
    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollProgress)
    }
  }, [updateScrollProgress])

  return (
    <motion.div 
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      aria-hidden={!isVisible}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scaleY: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        height: `${height}px`,
        transformOrigin: 'top',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-lg"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.1
        }}
        style={{
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)'
        }}
      />
    </motion.div>
  )
})