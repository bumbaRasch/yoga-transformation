'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/contexts/language-context'

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
  const t = useTranslations()
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
      aria-label={t('accessibility.readingProgress')}
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
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
      }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 shadow-lg relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.1
        }}
        style={{
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.6), 0 0 50px rgba(236, 72, 153, 0.3)'
        }}
      />
    </motion.div>
  )
})