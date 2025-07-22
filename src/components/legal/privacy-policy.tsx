'use client'

import { useTranslations } from '@/contexts/language-context'
import { LegalPageLayout } from './legal-page-layout'

export function PrivacyPolicy() {
  const t = useTranslations()

  return (
    <LegalPageLayout 
      title={t('legal.privacy.title')} 
      lastUpdated={t('legal.privacy.lastUpdated')}
    >
      {/* Introduction */}
      <section className="mb-8">
        <h2>{t('legal.privacy.introduction.title')}</h2>
        <p>{t('legal.privacy.introduction.content')}</p>
        <p>{t('legal.privacy.introduction.contact')}</p>
      </section>

      {/* Information We Collect */}
      <section className="mb-8">
        <h2>{t('legal.privacy.dataCollection.title')}</h2>
        <p>{t('legal.privacy.dataCollection.intro')}</p>
        
        <h3>{t('legal.privacy.dataCollection.personalInfo.title')}</h3>
        <ul>
          <li>{t('legal.privacy.dataCollection.personalInfo.name')}</li>
          <li>{t('legal.privacy.dataCollection.personalInfo.email')}</li>
          <li>{t('legal.privacy.dataCollection.personalInfo.payment')}</li>
          <li>{t('legal.privacy.dataCollection.personalInfo.preferences')}</li>
        </ul>

        <h3>{t('legal.privacy.dataCollection.technicalInfo.title')}</h3>
        <ul>
          <li>{t('legal.privacy.dataCollection.technicalInfo.ip')}</li>
          <li>{t('legal.privacy.dataCollection.technicalInfo.browser')}</li>
          <li>{t('legal.privacy.dataCollection.technicalInfo.device')}</li>
          <li>{t('legal.privacy.dataCollection.technicalInfo.usage')}</li>
        </ul>
      </section>

      {/* How We Use Information */}
      <section className="mb-8">
        <h2>{t('legal.privacy.dataUse.title')}</h2>
        <ul>
          <li>{t('legal.privacy.dataUse.service')}</li>
          <li>{t('legal.privacy.dataUse.communication')}</li>
          <li>{t('legal.privacy.dataUse.improvement')}</li>
          <li>{t('legal.privacy.dataUse.legal')}</li>
          <li>{t('legal.privacy.dataUse.marketing')}</li>
        </ul>
      </section>

      {/* Data Sharing */}
      <section className="mb-8">
        <h2>{t('legal.privacy.dataSharing.title')}</h2>
        <p>{t('legal.privacy.dataSharing.intro')}</p>
        
        <h3>{t('legal.privacy.dataSharing.thirdParties.title')}</h3>
        <ul>
          <li><strong>{t('legal.privacy.dataSharing.thirdParties.payment.title')}:</strong> {t('legal.privacy.dataSharing.thirdParties.payment.content')}</li>
          <li><strong>{t('legal.privacy.dataSharing.thirdParties.analytics.title')}:</strong> {t('legal.privacy.dataSharing.thirdParties.analytics.content')}</li>
          <li><strong>{t('legal.privacy.dataSharing.thirdParties.email.title')}:</strong> {t('legal.privacy.dataSharing.thirdParties.email.content')}</li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="mb-8">
        <h2>{t('legal.privacy.security.title')}</h2>
        <p>{t('legal.privacy.security.content')}</p>
        <ul>
          <li>{t('legal.privacy.security.encryption')}</li>
          <li>{t('legal.privacy.security.access')}</li>
          <li>{t('legal.privacy.security.monitoring')}</li>
          <li>{t('legal.privacy.security.updates')}</li>
        </ul>
      </section>

      {/* Your Rights */}
      <section className="mb-8">
        <h2>{t('legal.privacy.rights.title')}</h2>
        <p>{t('legal.privacy.rights.intro')}</p>
        <ul>
          <li><strong>{t('legal.privacy.rights.access.title')}:</strong> {t('legal.privacy.rights.access.content')}</li>
          <li><strong>{t('legal.privacy.rights.rectification.title')}:</strong> {t('legal.privacy.rights.rectification.content')}</li>
          <li><strong>{t('legal.privacy.rights.erasure.title')}:</strong> {t('legal.privacy.rights.erasure.content')}</li>
          <li><strong>{t('legal.privacy.rights.portability.title')}:</strong> {t('legal.privacy.rights.portability.content')}</li>
          <li><strong>{t('legal.privacy.rights.objection.title')}:</strong> {t('legal.privacy.rights.objection.content')}</li>
        </ul>
      </section>

      {/* Cookies */}
      <section className="mb-8">
        <h2>{t('legal.privacy.cookies.title')}</h2>
        <p>{t('legal.privacy.cookies.content')}</p>
        <p>{t('legal.privacy.cookies.reference')}</p>
      </section>

      {/* Data Retention */}
      <section className="mb-8">
        <h2>{t('legal.privacy.retention.title')}</h2>
        <p>{t('legal.privacy.retention.content')}</p>
        <ul>
          <li>{t('legal.privacy.retention.account')}</li>
          <li>{t('legal.privacy.retention.marketing')}</li>
          <li>{t('legal.privacy.retention.legal')}</li>
        </ul>
      </section>

      {/* International Transfers */}
      <section className="mb-8">
        <h2>{t('legal.privacy.transfers.title')}</h2>
        <p>{t('legal.privacy.transfers.content')}</p>
      </section>

      {/* Children's Privacy */}
      <section className="mb-8">
        <h2>{t('legal.privacy.children.title')}</h2>
        <p>{t('legal.privacy.children.content')}</p>
      </section>

      {/* Changes to Policy */}
      <section className="mb-8">
        <h2>{t('legal.privacy.changes.title')}</h2>
        <p>{t('legal.privacy.changes.content')}</p>
      </section>

      {/* Contact Information */}
      <section className="mb-8">
        <h2>{t('legal.privacy.contact.title')}</h2>
        <p>{t('legal.privacy.contact.content')}</p>
        <div className="bg-muted p-4 rounded-lg">
          <p><strong>{t('legal.privacy.contact.company')}</strong></p>
          <p>{t('legal.privacy.contact.email')}: privacy@yogatransform.com</p>
          <p>{t('legal.privacy.contact.address')}: 123 Wellness Street, Health City, HC 12345</p>
        </div>
      </section>
    </LegalPageLayout>
  )
}