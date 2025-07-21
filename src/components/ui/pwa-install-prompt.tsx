'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Monitor, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/contexts/language-context'

// Animation configuration for consistent motion design
const ANIMATION_CONFIG = {
  prompt: {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 100, scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }
  },
  button: {
    hover: { scale: 1.02, boxShadow: '0 8px 25px rgba(139, 92, 246, 0.25)' },
    tap: { scale: 0.98 }
  },
  icon: {
    hover: { rotate: 15, scale: 1.1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
} as const

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface PWAInstallPromptProps {
  className?: string
}

export const PWAInstallPrompt = React.memo(function PWAInstallPrompt({
  className = ''
}: PWAInstallPromptProps) {
  const t = useTranslations()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    const isIOSInstalled = (window.navigator as { standalone?: boolean }).standalone === true
    setIsInstalled(isInStandaloneMode || isIOSInstalled)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      
      // Show prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        if (!isInStandaloneMode && !isIOSInstalled) {
          setShowPrompt(true)
        }
      }, 10000) // Wait 10 seconds before showing
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])


  const handleDismiss = useCallback(() => {
    setShowPrompt(false)
    // Don't show again for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pwa-prompt-dismissed', 'true')
    }
  }, [])

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null)
          setShowPrompt(false)
        }
      } catch (error) {
        console.warn('PWA install prompt failed:', error)
      }
    }
  }, [deferredPrompt])

  // Don't show if already installed or dismissed this session
  if (isInstalled || (typeof window !== 'undefined' && sessionStorage.getItem('pwa-prompt-dismissed'))) {
    return null
  }

  // iOS manual install instructions with improved styling
  const IOSInstructions = () => (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3 text-blue-600 dark:text-blue-400">
        <motion.div
          className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full"
          whileHover={ANIMATION_CONFIG.icon.hover}
          transition={ANIMATION_CONFIG.icon.transition}
        >
          <Smartphone className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold text-base">{t('pwa.ios.title')}</span>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 space-y-3">
        <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
          <p dangerouslySetInnerHTML={{ __html: t('pwa.ios.step1') }} />
        </div>
        <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
          <p dangerouslySetInnerHTML={{ __html: t('pwa.ios.step2') }} />
        </div>
        <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
          <p dangerouslySetInnerHTML={{ __html: t('pwa.ios.step3') }} />
        </div>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className={`fixed bottom-4 left-4 right-4 z-50 ${className}`}
          {...ANIMATION_CONFIG.prompt}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 mx-auto max-w-sm relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 pointer-events-none" />
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 p-3 rounded-2xl shadow-lg"
                    whileHover={ANIMATION_CONFIG.icon.hover}
                    transition={ANIMATION_CONFIG.icon.transition}
                  >
                    <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">
                        {t('pwa.installTitle')}
                      </h3>
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {t('pwa.installSubtitle')}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label={t('pwa.dismissLabel')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

            {isIOS ? (
              <IOSInstructions />
              ) : deferredPrompt ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                        <Monitor className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="font-medium">{t('pwa.installDescription')}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={ANIMATION_CONFIG.button.hover}
                    whileTap={ANIMATION_CONFIG.button.tap}
                  >
                    <Button
                      onClick={handleInstallClick}
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 hover:from-purple-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg border-0 transition-all duration-200"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {t('pwa.installButton')}
                    </Button>
                  </motion.div>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})