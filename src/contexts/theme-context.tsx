'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false)

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const setTheme = (dark: boolean) => {
    setIsDarkMode(dark)
  }

  return (
    <ThemeContext.Provider value={{
      isDarkMode: isDarkMode || false,
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