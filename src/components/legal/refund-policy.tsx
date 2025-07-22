'use client'

import { useTranslations } from '@/contexts/language-context'
import { LegalPageLayout } from './legal-page-layout'

export function RefundPolicy() {
  const t = useTranslations()

  return (
    <LegalPageLayout 
      title={t('legal.refund.title')} 
      lastUpdated={t('legal.refund.lastUpdated')}
    >
      {/* Introduction */}
      <section className="mb-8">
        <h2>{t('legal.refund.introduction.title')}</h2>
        <p>{t('legal.refund.introduction.content')}</p>
        <p>{t('legal.refund.introduction.commitment')}</p>
      </section>

      {/* Refund Eligibility */}
      <section className="mb-8">
        <h2>{t('legal.refund.eligibility.title')}</h2>
        <p>{t('legal.refund.eligibility.intro')}</p>
        
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
          <h3 className="text-green-800 dark:text-green-200">{t('legal.refund.eligibility.qualifies.title')}</h3>
          <ul className="mt-2 text-green-700 dark:text-green-300">
            <li>{t('legal.refund.eligibility.qualifies.technical')}</li>
            <li>{t('legal.refund.eligibility.qualifies.satisfaction')}</li>
            <li>{t('legal.refund.eligibility.qualifies.access')}</li>
            <li>{t('legal.refund.eligibility.qualifies.description')}</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="text-red-800 dark:text-red-200">{t('legal.refund.eligibility.noRefund.title')}</h3>
          <ul className="mt-2 text-red-700 dark:text-red-300">
            <li>{t('legal.refund.eligibility.noRefund.completion')}</li>
            <li>{t('legal.refund.eligibility.noRefund.days')}</li>
            <li>{t('legal.refund.eligibility.noRefund.abuse')}</li>
            <li>{t('legal.refund.eligibility.noRefund.digital')}</li>
          </ul>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="mb-8">
        <h2>{t('legal.refund.timeline.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-blue-800 dark:text-blue-200">{t('legal.refund.timeline.guarantee.title')}</h3>
            <p className="text-blue-700 dark:text-blue-300 mt-2">{t('legal.refund.timeline.guarantee.content')}</p>
            <ul className="mt-2 text-blue-600 dark:text-blue-400 text-sm">
              <li>{t('legal.refund.timeline.guarantee.days')}</li>
              <li>{t('legal.refund.timeline.guarantee.conditions')}</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="text-purple-800 dark:text-purple-200">{t('legal.refund.timeline.processing.title')}</h3>
            <p className="text-purple-700 dark:text-purple-300 mt-2">{t('legal.refund.timeline.processing.content')}</p>
            <ul className="mt-2 text-purple-600 dark:text-purple-400 text-sm">
              <li>{t('legal.refund.timeline.processing.review')}</li>
              <li>{t('legal.refund.timeline.processing.payment')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Request a Refund */}
      <section className="mb-8">
        <h2>{t('legal.refund.request.title')}</h2>
        <p>{t('legal.refund.request.intro')}</p>
        
        <h3>{t('legal.refund.request.steps.title')}</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>{t('legal.refund.request.steps.contact')}</li>
          <li>{t('legal.refund.request.steps.provide')}</li>
          <li>{t('legal.refund.request.steps.reason')}</li>
          <li>{t('legal.refund.request.steps.wait')}</li>
        </ol>

        <h3>{t('legal.refund.request.required.title')}</h3>
        <ul className="space-y-1">
          <li>{t('legal.refund.request.required.email')}</li>
          <li>{t('legal.refund.request.required.order')}</li>
          <li>{t('legal.refund.request.required.date')}</li>
          <li>{t('legal.refund.request.required.reason')}</li>
        </ul>
      </section>

      {/* Refund Methods */}
      <section className="mb-8">
        <h2>{t('legal.refund.methods.title')}</h2>
        <p>{t('legal.refund.methods.intro')}</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border rounded-lg">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.refund.methods.table.payment')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.refund.methods.table.method')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.refund.methods.table.timeframe')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.credit')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.creditRefund')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">3-5 {t('legal.refund.methods.table.days')}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.debit')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.debitRefund')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">5-10 {t('legal.refund.methods.table.days')}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">PayPal</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.paypalRefund')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">1-3 {t('legal.refund.methods.table.days')}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.bank')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.refund.methods.table.bankRefund')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">7-14 {t('legal.refund.methods.table.days')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Partial Refunds */}
      <section className="mb-8">
        <h2>{t('legal.refund.partial.title')}</h2>
        <p>{t('legal.refund.partial.intro')}</p>
        
        <h3>{t('legal.refund.partial.situations.title')}</h3>
        <ul>
          <li>{t('legal.refund.partial.situations.progress')}</li>
          <li>{t('legal.refund.partial.situations.promotional')}</li>
          <li>{t('legal.refund.partial.situations.technical')}</li>
        </ul>

        <h3>{t('legal.refund.partial.calculation.title')}</h3>
        <p>{t('legal.refund.partial.calculation.content')}</p>
      </section>

      {/* Subscription Refunds */}
      <section className="mb-8">
        <h2>{t('legal.refund.subscription.title')}</h2>
        <p>{t('legal.refund.subscription.intro')}</p>
        
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="text-orange-800 dark:text-orange-200">{t('legal.refund.subscription.important.title')}</h3>
          <ul className="mt-2 text-orange-700 dark:text-orange-300">
            <li>{t('legal.refund.subscription.important.cancel')}</li>
            <li>{t('legal.refund.subscription.important.prorated')}</li>
            <li>{t('legal.refund.subscription.important.access')}</li>
          </ul>
        </div>
      </section>

      {/* Exchanges */}
      <section className="mb-8">
        <h2>{t('legal.refund.exchanges.title')}</h2>
        <p>{t('legal.refund.exchanges.content')}</p>
        <p>{t('legal.refund.exchanges.alternative')}</p>
      </section>

      {/* Disputes */}
      <section className="mb-8">
        <h2>{t('legal.refund.disputes.title')}</h2>
        <p>{t('legal.refund.disputes.intro')}</p>
        
        <h3>{t('legal.refund.disputes.resolution.title')}</h3>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>{t('legal.refund.disputes.resolution.contact')}</li>
          <li>{t('legal.refund.disputes.resolution.escalate')}</li>
          <li>{t('legal.refund.disputes.resolution.mediation')}</li>
        </ol>
      </section>

      {/* Exceptions */}
      <section className="mb-8">
        <h2>{t('legal.refund.exceptions.title')}</h2>
        <p>{t('legal.refund.exceptions.intro')}</p>
        
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="text-red-800 dark:text-red-200">{t('legal.refund.exceptions.noRefund.title')}</h3>
          <ul className="mt-2 text-red-700 dark:text-red-300">
            <li>{t('legal.refund.exceptions.noRefund.fraud')}</li>
            <li>{t('legal.refund.exceptions.noRefund.violation')}</li>
            <li>{t('legal.refund.exceptions.noRefund.chargeback')}</li>
            <li>{t('legal.refund.exceptions.noRefund.abuse')}</li>
          </ul>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="mb-8">
        <h2>{t('legal.refund.changes.title')}</h2>
        <p>{t('legal.refund.changes.content')}</p>
        <p>{t('legal.refund.changes.notification')}</p>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2>{t('legal.refund.contact.title')}</h2>
        <p>{t('legal.refund.contact.content')}</p>
        <div className="bg-muted p-4 rounded-lg">
          <p><strong>{t('legal.refund.contact.company')}</strong></p>
          <p>{t('legal.refund.contact.email')}: refunds@yogatransform.com</p>
          <p>{t('legal.refund.contact.phone')}: +1 (555) 123-4567</p>
          <p>{t('legal.refund.contact.hours')}: {t('legal.refund.contact.businessHours')}</p>
          <p>{t('legal.refund.contact.address')}: 123 Wellness Street, Health City, HC 12345</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}