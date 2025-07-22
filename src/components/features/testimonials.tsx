'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, CheckCircle, MapPin, TrendingUp } from "lucide-react"
import { testimonialsData, testimonialStats, getFeaturedTestimonials } from "@/lib/testimonials-data"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SkeletonCard } from "@/components/ui/skeleton"
import { useTranslations } from "@/contexts/language-context"

interface TestimonialCardProps {
  testimonial: typeof testimonialsData[0]
  index: number
  featured?: boolean
}

const TestimonialCard = React.memo(function TestimonialCard({ testimonial, index, featured = false }: TestimonialCardProps) {
  const t = useTranslations()
  return (
    <motion.div
      className={`
        relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
        flex flex-col h-full
        ${featured ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05, // Reduced delay for better performance
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -4 }}
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <Quote className="w-4 h-4 text-white" />
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          {t('testimonials.featured')}
        </div>
      )}

      {/* Header - Fixed Height Section */}
      <div className="flex items-start gap-4 mb-6 flex-shrink-0 min-h-[100px]">
        {/* Avatar */}
        <div 
          className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          role="img"
          aria-label={`Profile photo of ${testimonial.name}, age ${testimonial.age}, from ${testimonial.location}`}
        >
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap">
            <span>{t('testimonials.age', { age: testimonial.age })}</span>
            <span>•</span>
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="w-6 h-6 flex-shrink-0" />
              <span className="truncate">{testimonial.location}</span>
            </div>
            {testimonial.verified && (
              <>
                <span>•</span>
                <span className="text-green-600 whitespace-nowrap">{t('testimonials.verified')}</span>
              </>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content - Flexible Section with Equal Distribution */}
      <div className="flex flex-col flex-1 justify-between space-y-6">
        {/* Title - Fixed Height */}
        <div className="flex-shrink-0">
          <h5 className="font-medium text-gray-900 dark:text-white line-clamp-2 h-[3rem] flex items-center">
            {testimonial.title}
          </h5>
        </div>

        {/* Quote - Fixed Height with Consistent Spacing */}
        <div className="flex-shrink-0">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 h-[5.5rem] overflow-hidden">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </div>

        {/* Transformation - Fixed Height and Structure */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 flex-shrink-0 min-h-[140px] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              {t('testimonials.transformation', { timeframe: testimonial.transformation.timeframe })}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 text-xs flex-1">
            <div className="h-[2.5rem]">
              <div className="text-red-600 dark:text-red-400 font-medium">{t('testimonials.before')}</div>
              <div className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-tight">
                {testimonial.transformation.before}
              </div>
            </div>
            <div className="h-[2.5rem]">
              <div className="text-green-600 dark:text-green-400 font-medium">{t('testimonials.after')}</div>
              <div className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-tight">
                {testimonial.transformation.after}
              </div>
            </div>
          </div>
        </div>

        {/* Tags - Fixed Height at Bottom */}
        <div className="flex flex-wrap gap-2 flex-shrink-0 h-[3rem] content-start">
          {testimonial.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

function TestimonialsContent() {
  const t = useTranslations()
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const featuredTestimonials = getFeaturedTestimonials()
  const displayTestimonials = showAll ? testimonialsData : featuredTestimonials

  // Simulate loading for better UX demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Short delay to show skeleton

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
              {t('testimonials.badge')}
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{testimonialStats.averageRating}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.stats.averageRating')}</div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{testimonialStats.transformationRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.stats.successRate')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{testimonialStats.totalReviews}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.stats.reviews')}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{testimonialStats.recommendationRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.stats.recommend')}</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div 
          id="testimonials"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 auto-rows-fr"
        >
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))
          ) : (
            displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                featured={testimonial.featured}
              />
            ))
          )}
        </div>

        {/* Load More Button */}
        {!showAll && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
            >
              {t('testimonials.viewAll', { count: testimonialsData.length })}
            </button>
          </motion.div>
        )}

        {/* Improvement Categories */}
        <motion.div
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('testimonials.stats.improvementTitle')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {testimonialStats.categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {category.improvement}%
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500">
                  {t('testimonials.stats.studentsLabel', { count: category.count })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <ErrorBoundary>
      <TestimonialsContent />
    </ErrorBoundary>
  )
}