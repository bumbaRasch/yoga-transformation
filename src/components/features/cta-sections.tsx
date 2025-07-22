'use client'

import { motion } from "framer-motion"
import { ArrowRight, Clock, Users, Trophy, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Mid-page CTA after benefits
export function MidPageCTA() {
  const t = useTranslations()
  
  return (
    <ErrorBoundary>
      <motion.section
        className="py-16 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('cta.midPage.title')}
            </h3>
            <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
              {t('cta.midPage.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="min-w-48">
                <Heart className="w-5 h-5" />
                {t('cta.midPage.button')}
              </Button>
              <div className="text-purple-100 text-sm">
                {t('cta.midPage.noCommitment')}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </ErrorBoundary>
  )
}

// Urgency CTA after testimonials
export function UrgencyCTA() {
  const t = useTranslations()
  
  return (
    <ErrorBoundary>
      <motion.section
        className="py-20 bg-gradient-to-br from-orange-500 to-red-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">{t('cta.urgency.subtitle')}</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('cta.urgency.title')}
            </h3>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.urgency.description')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">2,500+</div>
                <div className="text-orange-100 text-sm">{t('cta.urgency.stats.successStories')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">94%</div>
                <div className="text-orange-100 text-sm">{t('cta.urgency.stats.successRate')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">14 Days</div>
                <div className="text-orange-100 text-sm">{t('cta.urgency.stats.daysToTransform')}</div>
              </div>
            </div>
            
            <Button size="xl" variant="secondary" className="min-w-64">
              <ArrowRight className="w-5 h-5" />
              {t('cta.urgency.button')}
            </Button>
            
            <div className="mt-4 text-orange-100 text-sm">
              {t('cta.urgency.timer')}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </ErrorBoundary>
  )
}

// Final CTA at bottom of page
export function FinalCTA() {
  const t = useTranslations()
  
  return (
    <ErrorBoundary>
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                  {t('cta.final.badge')}
                </span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {t('cta.final.title')}
              </h3>
              
              <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('cta.final.subtitle')}
              </p>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{t('cta.final.features.proven.title')}</h4>
              <p className="text-gray-400">
                {t('cta.final.features.proven.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{t('cta.final.features.expert.title')}</h4>
              <p className="text-gray-400">
                {t('cta.final.features.expert.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{t('cta.final.features.riskFree.title')}</h4>
              <p className="text-gray-400">
                {t('cta.final.features.riskFree.description')}
              </p>
            </div>
          </motion.div>

          {/* Final CTA Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button size="xl" className="min-w-64 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <ArrowRight className="w-5 h-5" />
                {t('cta.final.button')}
              </Button>
              <Button size="xl" variant="outline" className="min-w-48 border-white text-white hover:bg-white hover:text-gray-900">
                <Users className="w-5 h-5" />
                {t('cta.final.buttonSecondary')}
              </Button>
            </div>
            
            <div className="text-gray-400 text-sm space-y-1">
              <div>{t('cta.final.checklist.instantAccess')}</div>
              <div>{t('cta.final.checklist.allDevices')}</div>
              <div>{t('cta.final.checklist.lifetimeAccess')}</div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </ErrorBoundary>
  )
}