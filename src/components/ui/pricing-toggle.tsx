'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PricingToggleProps {
  isAnnual: boolean
  onToggle: (isAnnual: boolean) => void
  className?: string
}

export const PricingToggle = React.memo(function PricingToggle({ 
  isAnnual, 
  onToggle, 
  className = '' 
}: PricingToggleProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className={`text-sm font-medium transition-colors ${
        !isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
      }`}>
        Monthly
      </span>
      
      <div className="relative">
        <motion.button
          className="relative w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          onClick={() => onToggle(!isAnnual)}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
          role="switch"
          aria-checked={isAnnual}
        >
          <motion.div
            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
            animate={{
              x: isAnnual ? 24 : 2,
              backgroundColor: isAnnual ? '#8B5CF6' : '#FFFFFF'
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium transition-colors ${
          isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
        }`}>
          Annual
        </span>
        <div className="w-16 h-6 flex items-center">
          <motion.span 
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isAnnual ? 1 : 0, 
              opacity: isAnnual ? 1 : 0 
            }}
            transition={{ 
              duration: 0.2,
              type: 'spring',
              stiffness: 400
            }}
          >
            Save 20%
          </motion.span>
        </div>
      </div>
    </div>
  )
})