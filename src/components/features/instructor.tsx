'use client'

import { motion } from "framer-motion"
import { Award, Mic, BookOpen, Heart, Star, Users, Calendar, Instagram, Youtube, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { instructorData, achievements } from "@/lib/instructor-data"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Icon mapping
const achievementIcons = {
  award: Award,
  mic: Mic,
  'book-open': BookOpen,
  heart: Heart
}

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  website: Globe
}

function InstructorContent() {
  const t = useTranslations()
  const instructor = instructorData

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
              {t('instructor.title')}
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('instructor.headerTitle')}
          </h2>
        </motion.div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Instructor Image */}
            <div className="relative mb-6">
              <motion.div
                className="w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <picture>
                  {/* AVIF format for best compression */}
                  <source
                    srcSet="
                      /images/serene_yoga_harmony-256w.avif 256w,
                      /images/serene_yoga_harmony-400w.avif 400w,
                      /images/serene_yoga_harmony-600w.avif 600w,
                      /images/serene_yoga_harmony-800w.avif 800w
                    "
                    sizes="(max-width: 400px) 256px, (max-width: 600px) 400px, (max-width: 800px) 600px, 800px"
                    type="image/avif"
                  />
                  
                  {/* WebP format for good compression and compatibility */}
                  <source
                    srcSet="
                      /images/serene_yoga_harmony-256w.webp 256w,
                      /images/serene_yoga_harmony-400w.webp 400w,
                      /images/serene_yoga_harmony-600w.webp 600w,
                      /images/serene_yoga_harmony-800w.webp 800w
                    "
                    sizes="(max-width: 400px) 256px, (max-width: 600px) 400px, (max-width: 800px) 600px, 800px"
                    type="image/webp"
                  />
                  
                  {/* Fallback PNG for older browsers */}
                  <img
                    src="/images/serene_yoga_harmony.png"
                    alt={`Professional photo of ${instructor.name}, certified yoga instructor and wellness expert`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </motion.div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {instructor.stats.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({instructor.stats.reviewCount})
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('instructor.studentsHelped')}
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {instructor.socialLinks && Object.entries(instructor.socialLinks).map(([platform]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                return (
                  <motion.button
                    key={platform}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-green-600" />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Bio and Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Name and Title */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('instructor.name')}
                </h3>
                <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                  {t('instructor.credentials')}
                </p>
              </div>

              {/* Quote */}
              <motion.blockquote
                className="text-lg italic text-gray-700 dark:text-gray-300 border-l-4 border-green-500 pl-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                &ldquo;{t('instructor.quote')}&rdquo;
              </motion.blockquote>

              {/* Bio */}
              <div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t('instructor.bio')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('instructor.experience')}
                </p>
              </div>

              {/* Experience & Student Stats */}
              <motion.section
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                aria-labelledby="instructor-stats"
              >
                <div className="sr-only" id="instructor-stats">
                  Instructor Statistics and Achievements
                </div>
                {/* Experience Card */}
                <motion.article 
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-teal-900/20 p-3 shadow-sm ring-1 ring-green-100 dark:ring-green-800/30 transition-all duration-300 hover:shadow-md hover:shadow-green-100/30 dark:hover:shadow-green-900/20 hover:ring-green-200 dark:hover:ring-green-700/50 hover:-translate-y-0.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="region"
                  aria-labelledby="experience-stat"
                  tabIndex={0}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon & Label */}
                  <div className="relative z-10 flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm shadow-green-500/20">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <span 
                        className="block text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide"
                        id="experience-stat"
                      >
                        {t('instructor.experienceLabel')}
                      </span>
                      <span className="block text-[10px] text-green-600/70 dark:text-green-400/70">
                        Teaching Excellence
                      </span>
                    </div>
                  </div>
                  
                  {/* Value */}
                  <div className="relative z-10">
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                      {t('instructor.experience')} {t('instructor.experienceYears')}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
                      Global teaching across 3 continents
                    </p>
                  </div>
                </motion.article>

                {/* Students Card */}
                <motion.article 
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/20 p-3 shadow-sm ring-1 ring-blue-100 dark:ring-blue-800/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-100/30 dark:hover:shadow-blue-900/20 hover:ring-blue-200 dark:hover:ring-blue-700/50 hover:-translate-y-0.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="region"
                  aria-labelledby="students-stat"
                  tabIndex={0}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon & Label */}
                  <div className="relative z-10 flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/20">
                      <Users className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <span 
                        className="block text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide"
                        id="students-stat"
                      >
                        {t('instructor.studentsLabel')}
                      </span>
                      <span className="block text-[10px] text-blue-600/70 dark:text-blue-400/70">
                        Lives Transformed
                      </span>
                    </div>
                  </div>
                  
                  {/* Value */}
                  <div className="relative z-10">
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                      {instructor.stats.studentsHelped}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
                      Students discovering inner strength
                    </p>
                  </div>
                </motion.article>
              </motion.section>

              {/* CTA Button */}
              <Button size="lg" className="w-full sm:w-auto">
                {t('instructor.cta')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Specializations */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            {t('instructor.specializationsTitle')}
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {instructor.specializations.map((spec, index) => {
              // Map specialization to translation key
              const specKey = spec.toLowerCase().replace(/\s+/g, '').replace(/&/g, '').replace(/-/g, '')
              const specKeys = {
                'therapeuticyoga': 'therapeutic',
                'mindfulnessmeditation': 'mindfulness',
                'breathworkpranayama': 'breathwork',
                'stressreduction': 'stress',
                'flexibilitytraining': 'flexibility',
                'mindbodyconnection': 'connection'
              }
              const translationKey = specKeys[specKey as keyof typeof specKeys] || 'therapeutic'
              
              return (
                <motion.span
                  key={spec}
                  className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {t(`instructor.specializations.${translationKey}`)}
                </motion.span>
              )
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            {t('instructor.achievementsTitle')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons]
              
              return (
                <motion.div
                  key={achievement.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t(`instructor.achievements.${achievement.id}.title`)}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {t(`instructor.achievements.${achievement.id}.description`)}
                  </p>
                  {achievement.year && (
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {achievement.year}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Instructor() {
  return (
    <ErrorBoundary>
      <InstructorContent />
    </ErrorBoundary>
  )
}