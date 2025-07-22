'use client'

import React, { useState, useMemo, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Lock, CheckCircle, Play, Sparkles, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { timelineData, getDifficultyColor, getDurationText } from "@/lib/timeline-data"
import { TimelineDay } from "@/types"
import { useTimeline } from "@/hooks/useTimeline"
import { useTranslations } from "@/contexts/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

interface TimelineProps {
  currentDay?: number
  completedDays?: number[]
  onDayClick?: (day: TimelineDay) => void
  className?: string
}

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

// Simple seeded random number generator for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate consistent floating elements using seeded random
function generateFloatingElements(): FloatingElement[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3 + 1) * 100,
    y: seededRandom(i * 3 + 2) * 100,
    size: 20 + seededRandom(i * 3 + 3) * 40,
    delay: seededRandom(i * 3 + 4) * 2,
    duration: 3 + seededRandom(i * 3 + 5) * 4
  }));
}

const FloatingOrb: React.FC<{ element: FloatingElement; index: number; isClient: boolean }> = ({ element, index, isClient }) => {
  return (
    <motion.div
      key={element.id}
      className="absolute rounded-full opacity-20"
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.size}px`,
        height: `${element.size}px`,
        background: `linear-gradient(135deg, 
          hsla(${(index * 60) % 360}, 70%, 60%, 0.3) 0%, 
          hsla(${(index * 60 + 60) % 360}, 70%, 70%, 0.2) 100%)`
      }}
      animate={isClient ? {
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
      } : false}
      transition={isClient ? {
        duration: element.duration,
        delay: element.delay,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
    />
  )
}

const GlassmorphicContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`
      relative backdrop-blur-xl bg-gradient-to-br 
      from-white/20 via-white/10 to-white/5
      dark:from-gray-800/20 dark:via-gray-900/10 dark:to-gray-900/5
      border border-white/20 dark:border-gray-700/20
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      before:absolute before:inset-0 before:rounded-[inherit]
      before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-50
      before:pointer-events-none
      ${className}
    `}>
      {children}
    </div>
  )
}

const ModernTimelineCard: React.FC<{
  day: TimelineDay
  index: number
  isCompleted: (day: TimelineDay) => boolean
  isCurrent: (day: TimelineDay) => boolean
  isAccessible: (day: TimelineDay) => boolean
  onDayClick?: (day: TimelineDay) => void
  inView: boolean
}> = React.memo(({ day, index, isCompleted, isCurrent, isAccessible, onDayClick, inView }) => {
  const t = useTranslations()
  const [isHovered, setIsHovered] = useState(false)
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: -15,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }

  const glowVariants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 0.6, 
      scale: 1.2,
      transition: { duration: 0.3 }
    }
  }

  const progressPath = useMemo(() => {
    const steps = 20
    let path = `M 0 50`
    for (let i = 1; i <= steps; i++) {
      const x = (i / steps) * 100
      const y = 50 + Math.sin((i / steps) * Math.PI * 2) * 10
      path += ` L ${x} ${y}`
    }
    return path
  }, [])

  return (
    <motion.div
      className="relative group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${day.theme.replace('from-', '').replace('to-', '').split(' ').join(', ')})`
        }}
        variants={glowVariants}
        animate={isHovered ? "hover" : "rest"}
      />

      {/* Main card container */}
      <GlassmorphicContainer className="rounded-3xl p-6 transform-gpu transition-all duration-300 h-full min-h-[380px] flex flex-col">
        
        {/* Floating completion indicator */}
        <AnimatePresence>
          {isCompleted(day) && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-30">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>

        {/* Day number with 3D effect */}
        <div className="relative mb-6 perspective-1000">
          <motion.div
            className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl text-white transform-gpu"
            style={{
              background: `linear-gradient(135deg, ${day.theme.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
              transformStyle: 'preserve-3d',
              transform: 'rotateX(5deg) rotateY(-2deg)',
              boxShadow: `
                0 8px 16px -4px rgba(0, 0, 0, 0.25),
                0 4px 8px -2px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
              ...(isHovered && {
                boxShadow: `
                  0 20px 40px -8px rgba(0, 0, 0, 0.4),
                  0 8px 16px -4px rgba(0, 0, 0, 0.2),
                  inset 0 2px 0 rgba(255, 255, 255, 0.4),
                  inset 0 -2px 0 rgba(0, 0, 0, 0.3)
                `
              })
            }}
            whileHover={{ 
              rotateY: 12,
              rotateX: -8,
              scale: 1.08,
              z: 20
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            animate={{
              rotateX: [5, 3, 5],
              rotateY: [-2, 0, -2]
            }}
            whileInView={{
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Base number with depth */}
            <span className="relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {day.id}
            </span>
            
            {/* 3D depth layers */}
            <div 
              className="absolute inset-0 rounded-2xl -z-10"
              style={{
                background: `linear-gradient(135deg, ${day.theme.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                transform: 'translateZ(-4px)',
                filter: 'brightness(0.8) saturate(1.2)'
              }}
            />
            <div 
              className="absolute inset-0 rounded-2xl -z-20"
              style={{
                background: `linear-gradient(135deg, ${day.theme.replace('from-', '').replace('to-', '').split(' ').join(', ')})`,
                transform: 'translateZ(-8px)',
                filter: 'brightness(0.6) saturate(1.4)'
              }}
            />
            
            {/* Inner highlight for glossy effect */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />
            
            {/* Edge highlight */}
            <div 
              className="absolute inset-0 rounded-2xl border border-white/30" 
              style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)'
              }}
            />
          </motion.div>

          {/* Progress line to next card (except last) */}
          {index < timelineData.length - 1 && (
            <div className="absolute left-full top-1/2 w-20 h-0.5 -translate-y-1/2 hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d={progressPath}
                  stroke={isCompleted(day) ? "#10b981" : "#e5e7eb"}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isCompleted(day) ? 1 : 0.3 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
              layoutId={`title-${day.id}`}
            >
              {t(`timeline.days.day${day.id}.title`)}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
              layoutId={`description-${day.id}`}
            >
              {t(`timeline.days.day${day.id}.description`)}
            </motion.p>
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{getDurationText(day.duration)}</span>
            </div>
            <motion.div 
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getDifficultyColor(day.difficulty)}`}
              whileHover={{ scale: 1.05 }}
            >
              {t(`timeline.difficulty.${day.difficulty}`)}
            </motion.div>
          </div>

          {/* Action button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              className="w-full font-semibold text-base h-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              variant={isCurrent(day) ? "default" : isCompleted(day) ? "outline" : "secondary"}
              disabled={!isAccessible(day)}
              onClick={() => onDayClick?.(day)}
              aria-label={`${isCompleted(day) ? 'Completed' : isCurrent(day) ? 'Start' : isAccessible(day) ? 'Preview' : 'Locked'} Day ${day.id}: ${day.title}`}
            >
              {isCompleted(day) ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('timeline.completed')}
                </>
              ) : isCurrent(day) ? (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {t('timeline.startPractice')}
                </>
              ) : isAccessible(day) ? (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  {t('timeline.preview')}
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  {t('timeline.locked')}
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </GlassmorphicContainer>
    </motion.div>
  )
})

ModernTimelineCard.displayName = 'ModernTimelineCard'

function TimelineContent({ currentDay = 1, completedDays = [], onDayClick, className }: TimelineProps) {
  const t = useTranslations()
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 })
  const { scrollYProgress } = useScroll()
  const [isClient, setIsClient] = useState(false)
  
  // Ensure client-side hydration is complete before enabling animations
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Validation
  if (currentDay < 1 || currentDay > 14) {
    throw new Error(`Invalid currentDay: ${currentDay}. Must be between 1 and 14.`)
  }
  
  if (completedDays.some(day => day < 1 || day > 14)) {
    throw new Error('Invalid completedDays: All days must be between 1 and 14.')
  }

  const { isCompleted, isCurrent, isAccessible } = useTimeline({
    currentDay,
    completedDays
  })

  // Floating elements for background animation - consistent across SSR/client
  const floatingElements = useMemo(() => generateFloatingElements(), [])

  // Smooth scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.8])

  return (
    <section 
      ref={ref}
      className={`relative py-24 overflow-hidden ${className || ''}`}
      style={{
        background: `
          radial-gradient(ellipse 100% 100% at 50% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 100% 100% at 0% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 100% 100% at 100% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
          linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => (
          <FloatingOrb key={element.id} element={element} index={index} isClient={isClient} />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        {/* Header section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            14-Day Transformation Journey
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {t('timeline.title')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('timeline.subtitle')}
          </p>

          {/* Progress indicator */}
          <motion.div 
            className="mt-8 max-w-md mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedDays.length / 14) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedDays.length / 14) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {timelineData.map((day, index) => (
            <ModernTimelineCard
              key={day.id}
              day={day}
              index={index}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isAccessible={isAccessible}
              onDayClick={onDayClick}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to transform your life in just 14 days?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl">
              Start Your Journey Today
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export function Timeline(props: TimelineProps) {
  return (
    <ErrorBoundary>
      <TimelineContent {...props} />
    </ErrorBoundary>
  )
}