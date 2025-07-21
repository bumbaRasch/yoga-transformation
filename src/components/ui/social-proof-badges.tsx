'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Users, Award, ShieldCheck } from 'lucide-react'

// Style configuration constants
const BADGE_STYLES = {
  sizes: {
    minimal: { icon: 'w-3 h-3', container: 'w-6 h-6', text: 'text-xs' },
    compact: { icon: 'w-4 h-4', container: 'w-8 h-8', text: 'text-sm' },
    default: { icon: 'w-4 h-4', container: 'w-8 h-8', text: 'text-sm' }
  },
  colors: {
    rating: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    students: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', 
    success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    guarantee: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    default: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
  },
  animation: {
    duration: 0.5,
    stagger: 0.1,
    spring: { stiffness: 200, damping: 20 },
    hover: { y: -2, duration: 0.2 }
  }
} as const

type BadgeType = 'rating' | 'students' | 'success' | 'guarantee' | 'default'

interface SocialProofBadge {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}

const socialProofData: SocialProofBadge[] = [
  {
    id: 'students',
    icon: Users,
    label: 'Happy Students',
    value: '2,500+',
    description: 'Worldwide community'
  },
  {
    id: 'rating',
    icon: Star,
    label: 'Average Rating',
    value: '4.9/5',
    description: 'From 500+ reviews'
  },
  {
    id: 'success-rate',
    icon: Award,
    label: 'Success Rate',
    value: '94%',
    description: 'Complete programs'
  },
  {
    id: 'guarantee',
    icon: ShieldCheck,
    label: 'Money-Back',
    value: '60 Days',
    description: 'Risk-free guarantee'
  }
]

const compactSocialProofData: SocialProofBadge[] = [
  {
    id: 'students-compact',
    icon: Users,
    label: 'Students',
    value: '2.5K+',
    description: 'Global community'
  },
  {
    id: 'rating-compact',
    icon: Star,
    label: 'Rating',
    value: '4.9★',
    description: '500+ reviews'
  },
  {
    id: 'guarantee-compact',
    icon: ShieldCheck,
    label: 'Guarantee',
    value: '60d',
    description: 'Money back'
  }
]

interface SocialProofBadgesProps {
  variant?: 'default' | 'compact' | 'minimal'
  layout?: 'horizontal' | 'grid' | 'stacked'
  className?: string
  animate?: boolean
}

export const SocialProofBadges = React.memo(function SocialProofBadges({
  variant = 'default',
  layout = 'horizontal',
  className = '',
  animate = true
}: SocialProofBadgesProps) {
  const badges = variant === 'compact' ? compactSocialProofData : socialProofData
  const visibleBadges = variant === 'minimal' ? badges.slice(0, 2) : badges

  const containerClasses = {
    horizontal: 'flex flex-wrap justify-center gap-4 sm:gap-6',
    grid: 'grid grid-cols-2 lg:grid-cols-4 gap-4', 
    stacked: 'flex flex-col space-y-3'
  }

  const badgeClasses = {
    default: `
      bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
      border border-gray-200/50 dark:border-gray-700/50
      rounded-lg px-4 py-3 shadow-sm
    `.replace(/\s+/g, ' ').trim(),
    compact: `
      bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
      border border-gray-200/30 dark:border-gray-700/30  
      rounded-md px-3 py-2 shadow-sm
    `.replace(/\s+/g, ' ').trim(),
    minimal: `
      bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm
      border border-gray-200/20 dark:border-gray-700/20
      rounded px-2 py-1 shadow-sm
    `.replace(/\s+/g, ' ').trim()
  }

  const getBadgeType = (badgeId: string): BadgeType => {
    if (badgeId.includes('rating')) return 'rating'
    if (badgeId.includes('students')) return 'students'
    if (badgeId.includes('success')) return 'success'
    if (badgeId.includes('guarantee')) return 'guarantee'
    return 'default'
  }

  return (
    <div className={`${containerClasses[layout]} ${className}`}>
      {visibleBadges.map((badge, index) => {
        const Icon = badge.icon
        
        const badgeType = getBadgeType(badge.id)
        const sizeConfig = BADGE_STYLES.sizes[variant]
        const colorConfig = BADGE_STYLES.colors[badgeType]

        const BadgeContent = () => (
          <div className={`
            flex items-center gap-3 transition-all duration-300
            hover:shadow-md hover:scale-105 cursor-default
            ${badgeClasses[variant]}
          `.replace(/\s+/g, ' ').trim()}>
            <div className="flex-shrink-0">
              <div className={`
                inline-flex items-center justify-center rounded-full
                ${sizeConfig.container} ${colorConfig}
              `.replace(/\s+/g, ' ').trim()}>
                <Icon className={sizeConfig.icon} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`
                font-semibold text-gray-900 dark:text-white
                ${sizeConfig.text}
              `.replace(/\s+/g, ' ').trim()}>
                {badge.value}
              </div>
              {variant !== 'minimal' && (
                <>
                  <div className={`
                    text-gray-600 dark:text-gray-400 font-medium
                    ${variant === 'compact' ? 'text-xs' : 'text-xs'}
                  `}>
                    {badge.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {badge.description}
                  </div>
                </>
              )}
              {variant === 'minimal' && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {badge.label}
                </div>
              )}
            </div>
          </div>
        )

        if (!animate) {
          return <div key={badge.id}><BadgeContent /></div>
        }

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: BADGE_STYLES.animation.duration,
              delay: index * BADGE_STYLES.animation.stagger,
              type: 'spring',
              ...BADGE_STYLES.animation.spring
            }}
            whileHover={{
              ...BADGE_STYLES.animation.hover,
              transition: { duration: BADGE_STYLES.animation.hover.duration }
            }}
          >
            <BadgeContent />
          </motion.div>
        )
      })}
    </div>
  )
})

// Preset configurations for common use cases
export const HeroSocialProof = React.memo(function HeroSocialProof({
  className = ''
}: {
  className?: string
}) {
  return (
    <SocialProofBadges
      variant="compact"
      layout="horizontal"
      className={`justify-center ${className}`}
      animate={true}
    />
  )
})

export const FooterSocialProof = React.memo(function FooterSocialProof({
  className = ''
}: {
  className?: string
}) {
  return (
    <SocialProofBadges
      variant="minimal"
      layout="horizontal"
      className={`justify-center ${className}`}
      animate={false}
    />
  )
})