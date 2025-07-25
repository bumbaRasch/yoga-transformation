'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  isDarkMode: boolean
  isSystemTheme: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeStorage, setThemeStorage] = useLocalStorage<Theme>('theme', 'system')
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Ensure theme is never null
  const theme = themeStorage || 'system'
  
  // Mark as mounted after hydration
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Detect system preference
  useEffect(() => {
    if (!mounted) return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPrefersDark(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted])

  // Calculate actual dark mode state - use SSR-safe default
  const isDarkMode = mounted 
    ? (theme === 'dark' || (theme === 'system' && systemPrefersDark))
    : false // Default to light mode on server
  
  // Apply theme to document with smooth transitions
  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    
    // Add transition class for smooth theme switching
    root.classList.add('theme-transition')
    
    if (isDarkMode) {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    
    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 300)
    
    return () => clearTimeout(timer)
  }, [isDarkMode, mounted])

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themeOrder.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setThemeStorage(themeOrder[nextIndex])
  }

  const setTheme = (newTheme: Theme) => {
    setThemeStorage(newTheme)
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkMode,
      isSystemTheme: theme === 'system',
      toggleTheme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}