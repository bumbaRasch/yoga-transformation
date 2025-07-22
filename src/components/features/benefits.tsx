'use client'

import React from "react"
import { motion } from "framer-motion"
import { Dumbbell, Move, Brain, Scale, Zap, Moon } from "lucide-react"
import { benefitsData, getBenefitIcon } from "@/lib/benefits-data"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Icon component mapping
const iconComponents = {
  Dumbbell,
  Move,
  Brain,
  Scale,
  Zap,
  Moon,
  Circle: () => <div className="w-6 h-6 rounded-full bg-current" />
}

interface BenefitCardProps {
  benefit: typeof benefitsData[0]
  index: number
}

const BenefitCard = React.memo(function BenefitCard({ benefit, index }: BenefitCardProps) {
  const t = useTranslations()
  const IconComponent = iconComponents[getBenefitIcon(benefit.icon) as keyof typeof iconComponents]

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8 }}
    >
      {/* Background Gradient */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
        bg-gradient-to-br ${benefit.gradient} rounded-xl
      `} />
      
      {/* Icon */}
      <motion.div
        className={`
          inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
          bg-gradient-to-r ${benefit.gradient} text-white shadow-lg
        `}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconComponent />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {t(`benefits.${benefit.id}.title`)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {t(`benefits.${benefit.id}.description`)}
        </p>

        {/* Stats */}
        {benefit.stats && (
          <div className="flex items-center gap-2">
            <div className={`
              text-2xl font-bold bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent
            `}>
              {benefit.stats.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {benefit.stats.label}
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 0.6,
          ease: "linear"
        }}
      />
    </motion.div>
  )
})

function BenefitsContent() {
  const t = useTranslations()
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('benefits.title')}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Based on 2,500+ student outcomes
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              94% Success Rate
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">
              Complete transformation in 14 days
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <ErrorBoundary>
      <BenefitsContent />
    </ErrorBoundary>
  )
}