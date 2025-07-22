'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/contexts/language-context'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                {t('legal.backToHome')}
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {t('legal.lastUpdated')}: {lastUpdated}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Title */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span className="text-sm">{t('legal.availableLanguages')}</span>
            </div>
          </header>

          {/* Content */}
          <article className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
            {children}
          </article>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>{t('legal.footer.disclaimer')}</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                {t('legal.nav.privacy')}
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                {t('legal.nav.terms')}
              </Link>
              <span>•</span>
              <Link href="/cookie-policy" className="hover:text-foreground transition-colors">
                {t('legal.nav.cookies')}
              </Link>
              <span>•</span>
              <Link href="/refund-policy" className="hover:text-foreground transition-colors">
                {t('legal.nav.refund')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}