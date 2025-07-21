'use client'

import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Instagram, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { footerSections, socialLinks } from '@/lib/navigation-data'
import { ErrorBoundary } from '@/components/ui/error-boundary'

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter
}

interface FooterProps {
  className?: string
}

function FooterContent({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

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
        className="bg-gradient-to-r from-purple-600 to-pink-600 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Connected with Your Yoga Journey
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Get weekly wellness tips, new pose tutorials, and exclusive content 
              delivered to your inbox. Join our community of mindful practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                className="min-w-32 bg-white text-purple-600 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-purple-200 mt-3">
              No spam, unsubscribe anytime. Your privacy is protected.
            </p>
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
              Transform your mind, body, and spirit with our expertly crafted 
              14-day yoga journey. Join thousands who have discovered their inner 
              strength and achieved lasting wellness.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@yogatransform.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-YOGA</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
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
              <span className="text-gray-400 text-sm">Follow us:</span>
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
              © {currentYear} YogaTransform. All rights reserved. 
              <span className="mx-2">•</span>
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for your wellness journey.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Emergency CTA Bar */}
      <motion.div
        className="bg-gradient-to-r from-red-600 to-orange-600 py-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold">
                🔥 Limited Time: 50% OFF All Plans
              </p>
              <p className="text-orange-100 text-sm">
                Don&apos;t miss out - transform your life today!
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100 min-w-32"
              onClick={() => scrollToSection('#pricing')}
            >
              Claim Discount
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