import { getImagePath } from './utils'

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  experience: string
  specializations: string[]
  certifications: string[]
  avatar: string
  stats: {
    studentsHelped: string
    yearsExperience: number
    rating: number
    reviewCount: number
  }
  socialLinks?: {
    instagram?: string
    youtube?: string
    website?: string
  }
  quote: string
}

export const instructorData: Instructor = {
  id: 'maya-chen',
  name: 'Maya Chen',
  title: 'Lead Yoga Instructor & Wellness Expert',
  bio: 'Maya has dedicated over a decade to the transformative practice of yoga, specializing in therapeutic approaches that heal both body and mind. Her unique methodology combines traditional Hatha and Vinyasa flows with modern wellness science.',
  experience: 'With 12 years of teaching experience across 3 continents, Maya has helped thousands of students discover their inner strength and achieve lasting transformation.',
  specializations: [
    'Therapeutic Yoga',
    'Mindfulness Meditation',
    'Breathwork & Pranayama',
    'Stress Reduction',
    'Flexibility Training',
    'Mind-Body Connection'
  ],
  certifications: [
    'E-RYT 500 (Experienced Registered Yoga Teacher)',
    'Therapeutic Yoga Specialist',
    'Mindfulness-Based Stress Reduction (MBSR)',
    'Advanced Pranayama Certification',
    'Yoga Alliance Continuing Education Provider'
  ],
  avatar: getImagePath('/images/instructor-maya.jpg'), // Placeholder path
  stats: {
    studentsHelped: '2.5K+',
    yearsExperience: 12,
    rating: 4.9,
    reviewCount: 847
  },
  socialLinks: {
    instagram: '@mayachen_yoga',
    youtube: 'Maya Chen Yoga',
    website: 'mayachenyoga.com'
  },
  quote: 'Yoga is not about perfecting poses—it\'s about discovering the perfect version of yourself that already exists within.'
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  year?: number
}

export const achievements: ReadonlyArray<Achievement> = [
  {
    id: 'top-instructor',
    title: 'Top Yoga Instructor 2023',
    description: 'Recognized by Yoga Alliance for outstanding teaching and student transformation',
    icon: 'award',
    year: 2023
  },
  {
    id: 'wellness-expert',
    title: 'Wellness Conference Speaker',
    description: 'Featured speaker at International Wellness Summit on therapeutic yoga',
    icon: 'mic',
    year: 2023
  },
  {
    id: 'published-author',
    title: 'Published Author',
    description: 'Co-authored "Mindful Movement: A Guide to Therapeutic Yoga Practice"',
    icon: 'book-open',
    year: 2022
  },
  {
    id: 'community-impact',
    title: 'Community Impact Award',
    description: 'Honored for bringing yoga to underserved communities worldwide',
    icon: 'heart',
    year: 2021
  }
] as const