'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { useTranslations } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggleCompact } from '@/components/ui/theme-toggle'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { getFocusClasses } from '@/lib/focus-styles'

interface NavigationProps {
  className?: string
}

function NavigationContent({ className }: NavigationProps) {
  const t = useTranslations()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  // Navigation items with translations
  const navigationItems = [
    { id: 'benefits', label: t('navigation.benefits'), href: '#benefits' },
    { id: 'instructor', label: t('navigation.instructor'), href: '#instructor' },
    { id: 'testimonials', label: t('navigation.testimonials'), href: '#testimonials' },
    { id: 'pricing', label: t('navigation.pricing'), href: '#pricing' },
  ]

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev < navigationItems.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : navigationItems.length - 1
          )
          break
        case 'Home':
          e.preventDefault()
          setFocusedIndex(0)
          break
        case 'End':
          e.preventDefault()
          setFocusedIndex(navigationItems.length - 1)
          break
        case 'Escape':
          e.preventDefault()
          setIsMenuOpen(false)
          setFocusedIndex(-1)
          break
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen, navigationItems.length])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        setIsMenuOpen(false)
      }
    }
  }

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      scrollToSection(href)
    }
  }

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        {t('accessibility.skipToContent')}
      </a>
      
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg dark:shadow-gray-900/50' 
            : 'bg-transparent'
          }
          ${className || ''}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        role="navigation"
        aria-label={t('accessibility.mainNavigation')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center space-x-2 rounded-lg px-2 py-1 -ml-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="YogaTransform - Home"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              YogaTransform
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label={t('accessibility.primaryNavigation')}>
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all relative group rounded-md px-3 py-2 ${getFocusClasses('primary')}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -2 }}
                aria-label={`Navigate to ${item.label}`}
                role="link"
              >
                {item.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-purple-600 dark:bg-purple-400 scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggleCompact />

            {/* CTA Button */}
            <Button 
              size="sm"
              onClick={() => scrollToSection('#pricing')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              aria-label={t('navigation.getStartedAria')}
            >
              {t('navigation.getStarted')}
            </Button>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            
            <ThemeToggleCompact />
            
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 shadow-lg border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              role="menu"
              aria-orientation="vertical"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`
                      block w-full text-left py-3 px-2 rounded-lg text-gray-700 dark:text-gray-200 
                      hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 
                      font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset
                      ${focusedIndex === index ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : ''}
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                    ref={el => {
                      if (el && focusedIndex === index && isMenuOpen) {
                        el.focus()
                      }
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-offset-gray-950 dark:focus:ring-offset-gray-950"
                    onClick={() => scrollToSection('#pricing')}
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    {t('navigation.getStarted')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
    </>
  )
}

export function Navigation(props: NavigationProps) {
  return (
    <ErrorBoundary>
      <NavigationContent {...props} />
    </ErrorBoundary>
  )
}