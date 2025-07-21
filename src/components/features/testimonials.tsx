'use client'

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, CheckCircle, MapPin, TrendingUp } from "lucide-react"
import { testimonialsData, testimonialStats, getFeaturedTestimonials } from "@/lib/testimonials-data"
import { ErrorBoundary } from "@/components/ui/error-boundary"

interface TestimonialCardProps {
  testimonial: typeof testimonialsData[0]
  index: number
  featured?: boolean
}

const TestimonialCard = React.memo(function TestimonialCard({ testimonial, index, featured = false }: TestimonialCardProps) {
  return (
    <motion.div
      className={`
        relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
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
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div 
          className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          role="img"
          aria-label={`Profile photo of ${testimonial.name}, age ${testimonial.age}, from ${testimonial.location}`}
        >
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Age {testimonial.age}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{testimonial.location}</span>
            </div>
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

      {/* Content */}
      <div className="space-y-4">
        <h5 className="font-medium text-gray-900 dark:text-white">
          {testimonial.title}
        </h5>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Transformation */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              {testimonial.transformation.timeframe} Transformation
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-red-600 dark:text-red-400 font-medium">Before: </span>
              <span className="text-gray-600 dark:text-gray-300">
                {testimonial.transformation.before}
              </span>
            </div>
            <div>
              <span className="text-green-600 dark:text-green-400 font-medium">After: </span>
              <span className="text-gray-600 dark:text-gray-300">
                {testimonial.transformation.after}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
  const [showAll, setShowAll] = useState(false)
  const featuredTestimonials = getFeaturedTestimonials()
  const displayTestimonials = showAll ? testimonialsData : featuredTestimonials

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
              Real Results
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stories of{' '}
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands who have transformed their lives in just 14 days. 
            Here are their authentic stories and real results.
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
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{testimonialStats.transformationRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{testimonialStats.totalReviews}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{testimonialStats.recommendationRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Recommend</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              featured={testimonial.featured}
            />
          ))}
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
              View All {testimonialsData.length} Reviews
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
            Average Improvement by Category
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
                  {category.count} students
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