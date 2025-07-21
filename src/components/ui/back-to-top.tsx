'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useTranslations } from '@/contexts/language-context'

interface BackToTopProps {
  showThreshold?: number
  className?: string
}

// Animation constants
const ANIMATION_CONFIG = {
  spring: { stiffness: 400, damping: 25 },
  float: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  hover: { scale: 1.1, boxShadow: '0 10px 25px rgba(147, 51, 234, 0.4)' },
  tap: { scale: 0.95 }
} as const

export const BackToTop = React.memo(function BackToTop({
  showThreshold = 300,
  className = ''
}: BackToTopProps) {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled > showThreshold)
    }

    const throttledToggleVisibility = () => {
      requestAnimationFrame(toggleVisibility)
    }

    window.addEventListener('scroll', throttledToggleVisibility, { passive: true })
    
    // Initial check
    toggleVisibility()

    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility)
    }
  }, [showThreshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`
            fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 
            p-3 rounded-full shadow-lg backdrop-blur-sm
            bg-gradient-to-r from-purple-600 to-pink-600 
            hover:from-purple-700 hover:to-pink-700
            text-white transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-purple-500/50
            border border-white/20
            ${className}
          `}
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={ANIMATION_CONFIG.spring}
          whileHover={ANIMATION_CONFIG.hover}
          whileTap={ANIMATION_CONFIG.tap}
          aria-label={t('accessibility.scrollToTop')}
          title={t('common.backToTop')}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={ANIMATION_CONFIG.float}
          >
            <ChevronUp className="w-6 h-6 drop-shadow-sm" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
})