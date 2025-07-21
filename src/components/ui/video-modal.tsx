'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Button } from './button'
import { getFocusClasses } from '@/lib/focus-styles'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
  description?: string
  thumbnailUrl?: string
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title, 
  description,
  thumbnailUrl 
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    if (!modalRef.current) return

    try {
      if (!document.fullscreenElement) {
        await modalRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.warn('Fullscreen not supported:', error)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case ' ':
        case 'k':
          event.preventDefault()
          togglePlay()
          break
        case 'm':
          event.preventDefault()
          toggleMute()
          break
        case 'f':
          event.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, togglePlay, toggleMute, toggleFullscreen])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isOpen])

  // Reset video when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }, [isOpen])


  const handleSeek = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [])

  const progress = useMemo(() => 
    duration > 0 ? (currentTime / duration) * 100 : 0, 
    [currentTime, duration]
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            role="dialog"
            aria-labelledby="video-modal-title"
            aria-describedby="video-modal-description"
            aria-modal="true"
          >
            {/* Modal Container */}
            <motion.div
              ref={modalRef}
              className={`
                relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl
                ${isFullscreen ? 'max-w-none w-screen h-screen rounded-none' : ''}
              `}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white ${getFocusClasses('primary')}`}
                onClick={onClose}
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Video Container */}
              <div className="relative group">
                <video
                  ref={videoRef}
                  className="w-full aspect-video bg-black"
                  poster={thumbnailUrl}
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                >
                  <source src={videoUrl} type="video/mp4" />
                  <p>Your browser does not support the video element.</p>
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Play/Pause Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </Button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Progress Bar */}
                    <div 
                      className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-3"
                      onClick={handleSeek}
                      role="slider"
                      aria-label="Video progress"
                      aria-valuenow={Math.round(progress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      tabIndex={0}
                    >
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                          onClick={togglePlay}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>

                        <span className="text-white text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10"
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      >
                        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              {!isFullscreen && (
                <div className="p-6 bg-gray-900 text-white">
                  <h3 id="video-modal-title" className="text-xl font-semibold mb-2">
                    {title}
                  </h3>
                  {description && (
                    <p id="video-modal-description" className="text-gray-300 text-sm leading-relaxed">
                      {description}
                    </p>
                  )}
                  
                  {/* Keyboard Shortcuts */}
                  <div className="mt-4 text-xs text-gray-400">
                    <p>Keyboard shortcuts: Space/K = Play/Pause, M = Mute, F = Fullscreen, Esc = Close</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}