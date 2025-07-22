'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { OptimizedImage, RESPONSIVE_SIZES } from '@/components/ui/optimized-image'
import { useTranslations } from '@/contexts/language-context'

// Sample yoga poses and benefits images - keys for translation
const GALLERY_IMAGE_KEYS = [
  {
    src: '/images/yoga-pose-tree.png',
    altKey: 'Tree pose for balance and focus',
    titleKey: 'balance',
    descriptionKey: 'balance'
  },
  {
    src: '/images/yoga-pose-warrior.png',
    altKey: 'Warrior pose for strength and confidence',
    titleKey: 'strength',
    descriptionKey: 'strength'
  },
  {
    src: '/images/yoga-pose-meditation.png',
    altKey: 'Meditation pose for mindfulness and peace',
    titleKey: 'mindfulness',
    descriptionKey: 'mindfulness'
  },
  {
    src: '/images/yoga-pose-stretch.png',
    altKey: 'Stretching pose for flexibility and relaxation',
    titleKey: 'flexibility',
    descriptionKey: 'flexibility'
  }
]

interface ImageGalleryProps {
  className?: string
}

export const ImageGallery = React.memo(function ImageGallery({
  className = ''
}: ImageGalleryProps) {
  const t = useTranslations()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {GALLERY_IMAGE_KEYS.map((image, index) => (
            <motion.div
              key={image.src}
              variants={itemVariants}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                {/* Image container */}
                <div className="relative h-78 overflow-hidden">
                  <OptimizedImage
                    src={image.src}
                    alt={image.altKey}
                    fill
                    sizes={RESPONSIVE_SIZES.card}
                    quality={85}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    aspectRatio="square"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {t(`gallery.poses.${image.titleKey}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-tight">
                    {t(`gallery.poses.${image.descriptionKey}.description`)}
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((index + 1) / GALLERY_IMAGE_KEYS.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance note */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full text-sm text-green-700 dark:text-green-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{t('gallery.optimized')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
})
