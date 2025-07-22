'use client'

import { useTranslations } from '@/contexts/language-context'
import { LegalPageLayout } from './legal-page-layout'

export function CookiePolicy() {
  const t = useTranslations()

  return (
    <LegalPageLayout 
      title={t('legal.cookies.title')} 
      lastUpdated={t('legal.cookies.lastUpdated')}
    >
      {/* Introduction */}
      <section className="mb-8">
        <h2>{t('legal.cookies.introduction.title')}</h2>
        <p>{t('legal.cookies.introduction.content')}</p>
        <p>{t('legal.cookies.introduction.control')}</p>
      </section>

      {/* What are Cookies */}
      <section className="mb-8">
        <h2>{t('legal.cookies.whatAre.title')}</h2>
        <p>{t('legal.cookies.whatAre.definition')}</p>
        <p>{t('legal.cookies.whatAre.purpose')}</p>
      </section>

      {/* Types of Cookies */}
      <section className="mb-8">
        <h2>{t('legal.cookies.types.title')}</h2>
        
        <h3>{t('legal.cookies.types.essential.title')}</h3>
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
          <p className="text-blue-800 dark:text-blue-200">{t('legal.cookies.types.essential.description')}</p>
          <ul className="mt-2 text-blue-700 dark:text-blue-300">
            <li>{t('legal.cookies.types.essential.authentication')}</li>
            <li>{t('legal.cookies.types.essential.preferences')}</li>
            <li>{t('legal.cookies.types.essential.security')}</li>
            <li>{t('legal.cookies.types.essential.functionality')}</li>
          </ul>
        </div>

        <h3>{t('legal.cookies.types.analytics.title')}</h3>
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
          <p className="text-green-800 dark:text-green-200">{t('legal.cookies.types.analytics.description')}</p>
          <ul className="mt-2 text-green-700 dark:text-green-300">
            <li>{t('legal.cookies.types.analytics.usage')}</li>
            <li>{t('legal.cookies.types.analytics.performance')}</li>
            <li>{t('legal.cookies.types.analytics.errors')}</li>
            <li>{t('legal.cookies.types.analytics.improvements')}</li>
          </ul>
        </div>

        <h3>{t('legal.cookies.types.marketing.title')}</h3>
        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mb-4">
          <p className="text-purple-800 dark:text-purple-200">{t('legal.cookies.types.marketing.description')}</p>
          <ul className="mt-2 text-purple-700 dark:text-purple-300">
            <li>{t('legal.cookies.types.marketing.targeting')}</li>
            <li>{t('legal.cookies.types.marketing.social')}</li>
            <li>{t('legal.cookies.types.marketing.personalization')}</li>
            <li>{t('legal.cookies.types.marketing.retargeting')}</li>
          </ul>
        </div>

        <h3>{t('legal.cookies.types.preferences.title')}</h3>
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800 mb-4">
          <p className="text-orange-800 dark:text-orange-200">{t('legal.cookies.types.preferences.description')}</p>
          <ul className="mt-2 text-orange-700 dark:text-orange-300">
            <li>{t('legal.cookies.types.preferences.language')}</li>
            <li>{t('legal.cookies.types.preferences.theme')}</li>
            <li>{t('legal.cookies.types.preferences.layout')}</li>
            <li>{t('legal.cookies.types.preferences.accessibility')}</li>
          </ul>
        </div>
      </section>

      {/* Specific Cookies We Use */}
      <section className="mb-8">
        <h2>{t('legal.cookies.specific.title')}</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border rounded-lg">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.cookies.table.name')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.cookies.table.purpose')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.cookies.table.duration')}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">
                  {t('legal.cookies.table.type')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">auth-token</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.cookies.table.auth')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">7 {t('legal.cookies.table.days')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                    {t('legal.cookies.types.essential.title')}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">theme</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.cookies.table.theme')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">1 {t('legal.cookies.table.year')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <span className="px-2 py-1 text-xs rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                    {t('legal.cookies.types.preferences.title')}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">language</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.cookies.table.language')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">1 {t('legal.cookies.table.year')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <span className="px-2 py-1 text-xs rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                    {t('legal.cookies.types.preferences.title')}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-muted-foreground">_ga</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{t('legal.cookies.table.analytics')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">2 {t('legal.cookies.table.years')}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                    {t('legal.cookies.types.analytics.title')}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="mb-8">
        <h2>{t('legal.cookies.thirdParty.title')}</h2>
        <p>{t('legal.cookies.thirdParty.intro')}</p>
        
        <h3>Google Analytics</h3>
        <p>{t('legal.cookies.thirdParty.analytics')}</p>
        
        <h3>Stripe</h3>
        <p>{t('legal.cookies.thirdParty.payment')}</p>
        
        <h3>Social Media</h3>
        <p>{t('legal.cookies.thirdParty.social')}</p>
      </section>

      {/* Managing Cookies */}
      <section className="mb-8">
        <h2>{t('legal.cookies.management.title')}</h2>
        <p>{t('legal.cookies.management.intro')}</p>
        
        <h3>{t('legal.cookies.management.browser.title')}</h3>
        <ul>
          <li><strong>Chrome:</strong> {t('legal.cookies.management.browser.chrome')}</li>
          <li><strong>Firefox:</strong> {t('legal.cookies.management.browser.firefox')}</li>
          <li><strong>Safari:</strong> {t('legal.cookies.management.browser.safari')}</li>
          <li><strong>Edge:</strong> {t('legal.cookies.management.browser.edge')}</li>
        </ul>
        
        <h3>{t('legal.cookies.management.optOut.title')}</h3>
        <p>{t('legal.cookies.management.optOut.content')}</p>
        <ul>
          <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
          <li><strong>Facebook:</strong> <a href="https://www.facebook.com/help/568137493302217" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Facebook Cookie Settings</a></li>
        </ul>
      </section>

      {/* Cookie Consent */}
      <section className="mb-8">
        <h2>{t('legal.cookies.consent.title')}</h2>
        <p>{t('legal.cookies.consent.required')}</p>
        <p>{t('legal.cookies.consent.withdrawal')}</p>
        <p>{t('legal.cookies.consent.preferences')}</p>
      </section>

      {/* Updates */}
      <section className="mb-8">
        <h2>{t('legal.cookies.updates.title')}</h2>
        <p>{t('legal.cookies.updates.content')}</p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2>{t('legal.cookies.contact.title')}</h2>
        <p>{t('legal.cookies.contact.content')}</p>
        <div className="bg-muted p-4 rounded-lg">
          <p><strong>{t('legal.cookies.contact.company')}</strong></p>
          <p>{t('legal.cookies.contact.email')}: privacy@yogatransform.com</p>
          <p>{t('legal.cookies.contact.address')}: 123 Wellness Street, Health City, HC 12345</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}