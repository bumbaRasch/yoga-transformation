'use client'

import * as React from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function ThemeToggle({ variant = 'button', size = 'default', className }: ThemeToggleProps) {
  const { theme, isDarkMode, toggleTheme, setTheme } = useTheme()

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      case 'system':
        return Monitor
      default:
        return isDarkMode ? Moon : Sun
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      case 'system':
        return 'Switch to light mode'
      default:
        return 'Toggle theme'
    }
  }

  const Icon = getIcon()

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'icon'}
        onClick={toggleTheme}
        className={cn(
          'relative overflow-hidden transition-all duration-300 hover:scale-105',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'dark:hover:bg-accent dark:focus-visible:ring-offset-0',
          className
        )}
        aria-label={getLabel()}
        title={getLabel()}
      >
        <div className="relative flex items-center justify-center">
          <Icon 
            className={cn(
              'h-[1.2rem] w-[1.2rem] transition-all duration-300',
              'rotate-0 scale-100 dark:rotate-90 dark:scale-0',
              theme === 'system' && 'rotate-0 scale-100'
            )} 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              'h-2 w-2 rounded-full bg-primary opacity-0 scale-0 transition-all duration-300',
              theme === 'system' && 'opacity-100 scale-100'
            )} />
          </div>
        </div>
        
        {/* Animated background for visual feedback */}
        <div className={cn(
          'absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-orange-400 to-pink-400',
          'opacity-0 transition-opacity duration-300',
          'group-hover:opacity-20'
        )} />
      </Button>
    )
  }

  // Dropdown variant for more control
  return (
    <div className={cn('relative', className)}>
      <div className="flex rounded-lg border border-border bg-card p-1">
        {(['light', 'dark', 'system'] as const).map((themeOption) => {
          const isActive = theme === themeOption
          const IconComponent = themeOption === 'light' ? Sun : themeOption === 'dark' ? Moon : Monitor
          
          return (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={cn(
                'relative flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive && 'bg-primary text-primary-foreground shadow-sm'
              )}
              aria-label={`Set ${themeOption} theme`}
              title={`Set ${themeOption} theme`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="ml-2 capitalize">{themeOption}</span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 rounded-md bg-primary opacity-20 transition-opacity duration-200" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Compact version for navigation bars
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      aria-label="Toggle theme"
    >
      <Icon className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
    </button>
  )
}