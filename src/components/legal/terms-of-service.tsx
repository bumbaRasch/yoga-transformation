'use client'

import { useTranslations } from '@/contexts/language-context'
import { LegalPageLayout } from './legal-page-layout'

export function TermsOfService() {
  const t = useTranslations()

  return (
    <LegalPageLayout 
      title={t('legal.terms.title')} 
      lastUpdated={t('legal.terms.lastUpdated')}
    >
      {/* Introduction */}
      <section className="mb-8">
        <h2>{t('legal.terms.introduction.title')}</h2>
        <p>{t('legal.terms.introduction.content')}</p>
        <p>{t('legal.terms.introduction.agreement')}</p>
      </section>

      {/* Definitions */}
      <section className="mb-8">
        <h2>{t('legal.terms.definitions.title')}</h2>
        <ul>
          <li><strong>"{t('legal.terms.definitions.service.title')}"</strong> {t('legal.terms.definitions.service.content')}</li>
          <li><strong>"{t('legal.terms.definitions.user.title')}"</strong> {t('legal.terms.definitions.user.content')}</li>
          <li><strong>"{t('legal.terms.definitions.content.title')}"</strong> {t('legal.terms.definitions.content.content')}</li>
          <li><strong>"{t('legal.terms.definitions.account.title')}"</strong> {t('legal.terms.definitions.account.content')}</li>
        </ul>
      </section>

      {/* Acceptance of Terms */}
      <section className="mb-8">
        <h2>{t('legal.terms.acceptance.title')}</h2>
        <p>{t('legal.terms.acceptance.content')}</p>
        <p>{t('legal.terms.acceptance.changes')}</p>
      </section>

      {/* Use of Service */}
      <section className="mb-8">
        <h2>{t('legal.terms.usage.title')}</h2>
        <p>{t('legal.terms.usage.intro')}</p>
        
        <h3>{t('legal.terms.usage.permitted.title')}</h3>
        <ul>
          <li>{t('legal.terms.usage.permitted.personal')}</li>
          <li>{t('legal.terms.usage.permitted.classes')}</li>
          <li>{t('legal.terms.usage.permitted.progress')}</li>
          <li>{t('legal.terms.usage.permitted.community')}</li>
        </ul>

        <h3>{t('legal.terms.usage.prohibited.title')}</h3>
        <ul>
          <li>{t('legal.terms.usage.prohibited.commercial')}</li>
          <li>{t('legal.terms.usage.prohibited.sharing')}</li>
          <li>{t('legal.terms.usage.prohibited.reverse')}</li>
          <li>{t('legal.terms.usage.prohibited.harm')}</li>
          <li>{t('legal.terms.usage.prohibited.illegal')}</li>
        </ul>
      </section>

      {/* Account Registration */}
      <section className="mb-8">
        <h2>{t('legal.terms.account.title')}</h2>
        <p>{t('legal.terms.account.registration')}</p>
        <p>{t('legal.terms.account.responsibility')}</p>
        <p>{t('legal.terms.account.security')}</p>
      </section>

      {/* Payment and Billing */}
      <section className="mb-8">
        <h2>{t('legal.terms.payment.title')}</h2>
        <p>{t('legal.terms.payment.intro')}</p>
        
        <h3>{t('legal.terms.payment.fees.title')}</h3>
        <ul>
          <li>{t('legal.terms.payment.fees.upfront')}</li>
          <li>{t('legal.terms.payment.fees.currency')}</li>
          <li>{t('legal.terms.payment.fees.taxes')}</li>
          <li>{t('legal.terms.payment.fees.changes')}</li>
        </ul>

        <h3>{t('legal.terms.payment.methods.title')}</h3>
        <p>{t('legal.terms.payment.methods.content')}</p>

        <h3>{t('legal.terms.payment.refunds.title')}</h3>
        <p>{t('legal.terms.payment.refunds.content')}</p>
      </section>

      {/* Subscription and Cancellation */}
      <section className="mb-8">
        <h2>{t('legal.terms.subscription.title')}</h2>
        <p>{t('legal.terms.subscription.auto')}</p>
        <p>{t('legal.terms.subscription.cancel')}</p>
        <p>{t('legal.terms.subscription.access')}</p>
      </section>

      {/* Intellectual Property */}
      <section className="mb-8">
        <h2>{t('legal.terms.ip.title')}</h2>
        <p>{t('legal.terms.ip.ownership')}</p>
        <p>{t('legal.terms.ip.license')}</p>
        <p>{t('legal.terms.ip.restrictions')}</p>
      </section>

      {/* User Content */}
      <section className="mb-8">
        <h2>{t('legal.terms.userContent.title')}</h2>
        <p>{t('legal.terms.userContent.responsibility')}</p>
        <p>{t('legal.terms.userContent.license')}</p>
        <p>{t('legal.terms.userContent.removal')}</p>
      </section>

      {/* Health and Safety Disclaimer */}
      <section className="mb-8 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
        <h2 className="text-amber-800 dark:text-amber-200">{t('legal.terms.health.title')}</h2>
        <p className="text-amber-700 dark:text-amber-300">{t('legal.terms.health.disclaimer')}</p>
        <p className="text-amber-700 dark:text-amber-300">{t('legal.terms.health.consultation')}</p>
        <p className="text-amber-700 dark:text-amber-300">{t('legal.terms.health.responsibility')}</p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-8">
        <h2>{t('legal.terms.privacy.title')}</h2>
        <p>{t('legal.terms.privacy.content')}</p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-8">
        <h2>{t('legal.terms.liability.title')}</h2>
        <p>{t('legal.terms.liability.disclaimer')}</p>
        <p>{t('legal.terms.liability.limitation')}</p>
        <p>{t('legal.terms.liability.indemnification')}</p>
      </section>

      {/* Termination */}
      <section className="mb-8">
        <h2>{t('legal.terms.termination.title')}</h2>
        <p>{t('legal.terms.termination.user')}</p>
        <p>{t('legal.terms.termination.company')}</p>
        <p>{t('legal.terms.termination.effect')}</p>
      </section>

      {/* Governing Law */}
      <section className="mb-8">
        <h2>{t('legal.terms.law.title')}</h2>
        <p>{t('legal.terms.law.governing')}</p>
        <p>{t('legal.terms.law.disputes')}</p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-8">
        <h2>{t('legal.terms.changes.title')}</h2>
        <p>{t('legal.terms.changes.content')}</p>
        <p>{t('legal.terms.changes.notification')}</p>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2>{t('legal.terms.contact.title')}</h2>
        <p>{t('legal.terms.contact.content')}</p>
        <div className="bg-muted p-4 rounded-lg">
          <p><strong>{t('legal.terms.contact.company')}</strong></p>
          <p>{t('legal.terms.contact.email')}: legal@yogatransform.com</p>
          <p>{t('legal.terms.contact.address')}: 123 Wellness Street, Health City, HC 12345</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}