'use client'

import { motion } from "framer-motion"
import { Check, ShieldCheck, Clock, Smartphone, Users, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pricingPlans, additionalFeatures, formatPrice, calculateSavings } from "@/lib/pricing-data"
import { ErrorBoundary } from "@/components/ui/error-boundary"

const featureIcons = {
  'shield-check': ShieldCheck,
  'clock': Clock,
  'smartphone': Smartphone,
  'users': Users
}

interface PricingCardProps {
  plan: typeof pricingPlans[0]
  index: number
}

function PricingCard({ plan, index }: PricingCardProps) {
  const savings = plan.originalPrice ? calculateSavings(plan.originalPrice, plan.price.amount) : 0

  return (
    <motion.div
      className={`
        relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300
        ${plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50 scale-105' : 'hover:shadow-xl hover:scale-102'}
      `}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8 }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className={`
          absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-semibold text-white
          ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}
        `}>
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="space-y-2">
          {plan.originalPrice && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(plan.originalPrice)}
              </span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                Save {savings}%
              </span>
            </div>
          )}
          <div className="flex items-baseline justify-center gap-1">
            <span className={`
              text-4xl font-bold
              ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : 'text-gray-900 dark:text-white'}
            `}>
              {formatPrice(plan.price.amount)}
            </span>
            {plan.price.period !== 'one-time' && (
              <span className="text-gray-500">/{plan.price.period}</span>
            )}
          </div>
          {plan.price.period === 'one-time' && (
            <p className="text-sm text-gray-500">One-time payment</p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + i * 0.1 }}
          >
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
          Key Benefits:
        </h4>
        <div className="flex flex-wrap gap-2">
          {plan.benefits.map((benefit, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        size="lg"
        className={`
          w-full font-semibold
          ${plan.popular 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
            : ''
          }
        `}
        variant={plan.popular ? "default" : "outline"}
      >
        {plan.cta}
      </Button>

      {/* Guarantee */}
      {plan.id === 'vip' && (
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
            <ShieldCheck className="w-4 h-4" />
            <span>60-Day Money-Back Guarantee</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function PricingContent() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">
              Limited Time Offer
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Transformation Plan
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start your 14-day journey today. All plans include lifetime access 
            and are backed by our success guarantee.
          </p>

          {/* Special Offer Banner */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Zap className="w-5 h-5" />
            <span className="font-semibold">50% OFF - Limited Time Only!</span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {additionalFeatures.map((feature, index) => {
            const IconComponent = featureIcons[feature.icon as keyof typeof featureIcons]
            
            return (
              <motion.div
                key={feature.title}
                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Join 2,500+ Happy Students
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            &ldquo;This program exceeded all my expectations. The results speak for themselves!&rdquo; 
            <span className="font-medium">- Sarah M.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <ErrorBoundary>
      <PricingContent />
    </ErrorBoundary>
  )
}