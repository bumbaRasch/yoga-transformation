'use client'

import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Instagram, Youtube, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { footerSections, socialLinks } from '@/lib/navigation-data'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { useTranslations } from '@/contexts/language-context'
import { useState, useRef, useEffect } from 'react'

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter
}

interface FooterProps {
  className?: string
}

interface NewsletterFormProps {
  t: (key: string) => string
}

function NewsletterForm({ t }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address.')
      inputRef.current?.focus()
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Simulate API call - replace with actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, just simulate success
      setStatus('success')
      setMessage(t('footer.newsletter.success'))
      setEmail('')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const isDisabled = status === 'loading' || status === 'success'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-lg mx-auto">
        <div className="flex-1 relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletter.placeholder')}
              disabled={isDisabled}
              className={`
                w-full px-4 py-3.5 pr-10 rounded-xl text-gray-900 placeholder-gray-500 
                border-2 transition-all duration-200 shadow-lg backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50
                disabled:opacity-60 disabled:cursor-not-allowed
                ${status === 'error' ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-950/50' : 'border-white/20 bg-white/95 dark:bg-gray-800/95 dark:border-gray-600'}
                hover:border-white/40 dark:hover:border-gray-500 hover:shadow-xl
                dark:text-white dark:placeholder-gray-400
              `}
              aria-label="Email address for newsletter subscription"
              aria-describedby={message ? "newsletter-message" : undefined}
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <Button 
          type="submit"
          size="lg"
          disabled={isDisabled}
          className={`
            min-w-[160px] h-[54px] rounded-xl font-semibold transition-all duration-300
            shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95
            ${status === 'success' 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }
            disabled:transform-none disabled:hover:scale-100
          `}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Subscribed!
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              {t('footer.newsletter.button')}
            </>
          )}
        </Button>
      </div>
      
      {/* Status Message */}
      {message && (
        <motion.div
          id="newsletter-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            flex items-center justify-center gap-2 text-sm max-w-lg mx-auto
            ${status === 'error' ? 'text-red-200' : 'text-green-200'}
          `}
          role={status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {status === 'error' ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </form>
  )
}

function FooterContent({ className }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2025)
  const t = useTranslations()
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <footer className={`bg-gray-900 text-white ${className || ''}`}>
      {/* Newsletter Section */}
      <motion.section
        className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 py-16 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t('footer.newsletter.title')}
              </h3>
              <p className="text-purple-100 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
                {t('footer.newsletter.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-200 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Free weekly content</span>
                <span className="mx-2">•</span>
                <CheckCircle className="w-4 h-4" />
                <span>No spam, ever</span>
              </div>
            </motion.div>

            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <NewsletterForm t={t} />
            </motion.div>

            {/* Privacy Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xs text-purple-200 flex items-center justify-center gap-2"
            >
              <Heart className="w-3 h-3" />
              {t('footer.newsletter.privacy')}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">YogaTransform</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-4">{t('footer.contact.title')}</h4>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{t('footer.contact.address')}</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">{t('footer.social.title')}:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                  return (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </motion.button>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright', { year: currentYear })}
              <span className="mx-2">•</span>
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for your wellness journey.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Emergency CTA Bar */}
      <motion.div
        className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 py-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold">
                🔥 {t('cta.urgency.subtitle')}: 50% OFF All Plans
              </p>
              <p className="text-orange-100 dark:text-orange-200 text-sm">
                {t('cta.urgency.title')}
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white dark:bg-gray-100 text-red-600 dark:text-red-700 hover:bg-gray-100 dark:hover:bg-gray-200 min-w-32"
              onClick={() => scrollToSection('#pricing')}
            >
              {t('cta.urgency.button')}
            </Button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export function Footer(props: FooterProps) {
  return (
    <ErrorBoundary>
      <FooterContent {...props} />
    </ErrorBoundary>
  )
}