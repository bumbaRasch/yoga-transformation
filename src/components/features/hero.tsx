'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/ui/video-modal"
import { getGreeting } from "@/lib/utils"
import { Heart, Play } from "lucide-react"

export function Hero() {
  const greeting = getGreeting()
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const scrollToTimeline = () => {
    const timelineElement = document.getElementById('timeline')
    if (timelineElement) {
      timelineElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
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
            {greeting}! Ready for transformation?
          </motion.p>
          
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              14-Day Yoga
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Transformation
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Join thousands on a journey to transform your mind and body. 
            Expert-guided sessions, personalized progressions, and mindful practices 
            designed for every level.
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
              onClick={scrollToTimeline}
            >
              <Heart className="w-5 h-5" />
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="min-w-48"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5" />
              Watch Preview
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">14</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days of Practice</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-pink-600">2.5K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Students</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">All Levels</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Beginner to Advanced</div>
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