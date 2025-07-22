'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/ui/video-modal"
import { HeroSocialProof } from "@/components/ui/social-proof-badges"
import { OptimizedImage, RESPONSIVE_SIZES } from "@/components/ui/optimized-image"
import { useTranslations } from "@/contexts/language-context"
import { getGreeting } from "@/lib/utils"
import { Heart, Play } from "lucide-react"

export function Hero() {
  const greeting = getGreeting()
  const t = useTranslations()
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const scrollToBenefits = () => {
    const benefitsElement = document.getElementById('benefits')
    if (benefitsElement) {
      benefitsElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Optimized background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/images/hero-yoga.png"
          alt="Serene yoga meditation scene with mountains and peaceful sky"
          fill
          priority
          quality={95}
          sizes={RESPONSIVE_SIZES.hero}
          className="object-cover object-center"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-purple-50/70 to-pink-50/60 dark:from-gray-900/80 dark:via-purple-900/60 dark:to-pink-900/50" />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-orange-300/20 to-yellow-300/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm font-medium text-purple-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
{greeting}! {t('hero.greeting')}
          </motion.p>
          
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              {t('hero.titleSecond')}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
{t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              size="xl" 
              className="min-w-48"
              onClick={scrollToBenefits}
            >
              <Heart className="w-5 h-5" />
{t('hero.ctaPrimary')}
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="min-w-48"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5" />
{t('hero.ctaSecondary')}
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <HeroSocialProof className="mb-6" />
            
            {/* Program highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{t('hero.stats.days')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.daysLabel')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-600">{t('hero.stats.levels')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.levelsLabel')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">{t('hero.stats.access')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.accessLabel')}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-gray-600 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Video Preview Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="14-Day Yoga Transformation Preview"
        description="Get a glimpse of what awaits you in our comprehensive yoga program. This preview showcases the gentle yet transformative approach we use to guide you through your 14-day journey to better health, flexibility, and inner peace."
        thumbnailUrl="/images/yoga-preview-thumbnail.jpg"
      />
    </section>
  )
}