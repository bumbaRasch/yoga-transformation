'use client'

import * as React from 'react'
import { useTheme } from '@/contexts/theme-context'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Palette, Sun, Moon, Monitor, Check } from 'lucide-react'

export function ThemeDemo({ className }: { className?: string }) {
  const { theme, isDarkMode, isSystemTheme } = useTheme()

  const themeVariants = [
    {
      name: 'Light',
      key: 'light' as const,
      icon: Sun,
      description: 'Clean and bright appearance',
      preview: 'bg-white text-black border-gray-200'
    },
    {
      name: 'Dark', 
      key: 'dark' as const,
      icon: Moon,
      description: 'Easy on the eyes for low-light',
      preview: 'bg-gray-900 text-white border-gray-700'
    },
    {
      name: 'System',
      key: 'system' as const,
      icon: Monitor,
      description: 'Follows your system preference',
      preview: 'bg-gradient-to-r from-gray-100 to-gray-900 text-black border-gray-400'
    }
  ]

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Palette className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Theme System Demo</h2>
        </div>
        <p className="text-muted-foreground">
          Current theme: <span className="font-semibold capitalize">{theme}</span>
          {isSystemTheme && ` (${isDarkMode ? 'dark' : 'light'} detected)`}
        </p>
      </div>

      {/* Theme Selector */}
      <div className="flex justify-center">
        <ThemeToggle variant="dropdown" />
      </div>

      {/* Theme Previews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themeVariants.map((variant) => {
          const Icon = variant.icon
          const isActive = theme === variant.key
          
          return (
            <Card key={variant.key} className={cn(
              'relative p-6 transition-all duration-200',
              isActive && 'ring-2 ring-primary ring-offset-2'
            )}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-semibold">{variant.name}</h3>
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1 text-primary">
                      <Check className="h-4 w-4" />
                      <span className="text-xs font-medium">Active</span>
                    </div>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {variant.description}
                </p>
                
                {/* Preview */}
                <div className={cn(
                  'rounded-md border p-4 text-center text-sm font-medium',
                  variant.preview
                )}>
                  {variant.name} Theme Preview
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Component Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Component Examples</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Card Example</h4>
            <p className="text-muted-foreground text-sm">
              This card adapts to the current theme automatically.
            </p>
          </Card>
          
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Muted Card</h4>
            <p className="text-muted-foreground text-sm">
              Using semantic color tokens ensures consistency.
            </p>
          </Card>
        </div>
      </div>

      {/* Theme Features */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">✨ Theme Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>🎨 Smooth transitions</div>
            <div>💾 Persistent storage</div>
            <div>🔄 System sync</div>
            <div>♿ Accessible</div>
          </div>
        </div>
      </Card>
    </div>
  )
}