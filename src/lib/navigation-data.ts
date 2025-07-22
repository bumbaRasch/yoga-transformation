export interface NavigationItem {
  id: string
  label: string
  href: string
  external?: boolean
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
}

export const navigationItems: ReadonlyArray<NavigationItem> = [
  {
    id: 'benefits',
    label: 'Benefits',
    href: '#benefits'
  },
  {
    id: 'instructor',
    label: 'Instructor',
    href: '#instructor'
  },
  {
    id: 'testimonials',
    label: 'Reviews',
    href: '#testimonials'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '#pricing'
  }
] as const

export const socialLinks: ReadonlyArray<SocialLink> = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/mayachen_yoga',
    icon: 'instagram'
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://youtube.com/@mayachenyoga',
    icon: 'youtube'
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/mayachenyoga',
    icon: 'twitter'
  }
] as const

export const footerSections = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' }
    ]
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Community', href: '/community' }
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Refund Policy', href: '/refund-policy' }
    ]
  }
} as const