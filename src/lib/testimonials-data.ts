import { getImagePath } from './utils'

export interface Testimonial {
  id: string
  name: string
  age: number
  location: string
  avatar: string
  rating: number
  title: string
  content: string
  transformation: {
    before: string
    after: string
    timeframe: string
  }
  tags: string[]
  verified: boolean
  featured?: boolean
}

export const testimonialsData: ReadonlyArray<Testimonial> = [
  {
    id: 'sarah-m',
    name: 'Sarah Mitchell',
    age: 34,
    location: 'Seattle, WA',
    avatar: getImagePath('/images/testimonial-sarah.jpg'),
    rating: 5,
    title: 'Life-changing transformation',
    content: 'I was skeptical at first, but Maya\'s 14-day program completely transformed how I feel about my body and mind. The progression is perfect for beginners like me, and I actually look forward to my daily practice now!',
    transformation: {
      before: 'Chronic back pain, high stress levels',
      after: 'Pain-free, sleeping 8+ hours, feeling confident',
      timeframe: '14 days'
    },
    tags: ['Back Pain Relief', 'Better Sleep', 'Stress Reduction'],
    verified: true,
    featured: true
  },
  {
    id: 'marcus-j',
    name: 'Marcus Johnson',
    age: 28,
    location: 'Austin, TX',
    avatar: getImagePath('/images/testimonial-marcus.jpg'),
    rating: 5,
    title: 'Perfect for busy professionals',
    content: 'As a software engineer working long hours, I needed something that fit my schedule. These 20-30 minute sessions are perfect, and I\'ve noticed huge improvements in my posture and energy levels.',
    transformation: {
      before: 'Poor posture, low energy, neck tension',
      after: 'Improved posture, 3x energy, no tension headaches',
      timeframe: '14 days'
    },
    tags: ['Posture Improvement', 'Energy Boost', 'Neck Relief'],
    verified: true
  },
  {
    id: 'elena-r',
    name: 'Elena Rodriguez',
    age: 42,
    location: 'Miami, FL',
    avatar: getImagePath('/images/testimonial-elena.jpg'),
    rating: 5,
    title: 'Flexibility I never thought possible',
    content: 'At 42, I thought my days of being flexible were over. This program proved me wrong! I can now touch my toes and feel more mobile than I have in years. Maya\'s guidance is exceptional.',
    transformation: {
      before: 'Stiff joints, limited mobility',
      after: 'Increased flexibility by 70%, pain-free movement',
      timeframe: '14 days'
    },
    tags: ['Flexibility', 'Joint Health', 'Mobility'],
    verified: true,
    featured: true
  },
  {
    id: 'david-k',
    name: 'David Kim',
    age: 55,
    location: 'Portland, OR',
    avatar: getImagePath('/images/testimonial-david.jpg'),
    rating: 5,
    title: 'Retirement wellness revolution',
    content: 'Recently retired and wanted to focus on my health. This program gave me structure and motivation. I feel stronger and more balanced than I did in my 40s. Highly recommend for anyone over 50!',
    transformation: {
      before: 'Sedentary lifestyle, poor balance',
      after: 'Daily movement habit, excellent balance',
      timeframe: '14 days'
    },
    tags: ['Balance', 'Strength', 'Healthy Aging'],
    verified: true
  },
  {
    id: 'lisa-w',
    name: 'Lisa Williams',
    age: 29,
    location: 'Denver, CO',
    avatar: getImagePath('/images/testimonial-lisa.jpg'),
    rating: 5,
    title: 'Anxiety relief through movement',
    content: 'Dealing with anxiety for years, I found traditional meditation difficult. Maya\'s moving meditation approach was perfect for me. The breathing techniques alone have been life-changing.',
    transformation: {
      before: 'High anxiety, panic attacks, insomnia',
      after: 'Calm mind, better sleep, panic-free',
      timeframe: '14 days'
    },
    tags: ['Anxiety Relief', 'Better Sleep', 'Mental Clarity'],
    verified: true
  },
  {
    id: 'ahmed-s',
    name: 'Ahmed Sharma',
    age: 36,
    location: 'New York, NY',
    avatar: getImagePath('/images/testimonial-ahmed.jpg'),
    rating: 5,
    title: 'Strength without the gym',
    content: 'Gym closures led me to try yoga, and I\'m never going back! Built more functional strength and flexibility in 14 days than months at the gym. Plus, I can do it anywhere.',
    transformation: {
      before: 'Gym-dependent, imbalanced strength',
      after: 'Functional strength, body awareness',
      timeframe: '14 days'
    },
    tags: ['Functional Strength', 'Body Awareness', 'Convenience'],
    verified: true,
    featured: true
  }
] as const

export interface TestimonialStats {
  totalReviews: number
  averageRating: number
  transformationRate: number
  recommendationRate: number
  categories: {
    name: string
    count: number
    improvement: number
  }[]
}

export const testimonialStats: TestimonialStats = {
  totalReviews: 847,
  averageRating: 4.9,
  transformationRate: 94,
  recommendationRate: 98,
  categories: [
    { name: 'Flexibility', count: 312, improvement: 73 },
    { name: 'Strength', count: 284, improvement: 65 },
    { name: 'Stress Relief', count: 401, improvement: 89 },
    { name: 'Sleep Quality', count: 298, improvement: 78 },
    { name: 'Energy', count: 356, improvement: 82 },
    { name: 'Pain Relief', count: 189, improvement: 71 }
  ]
}

export const getFeaturedTestimonials = () => {
  return testimonialsData.filter(t => t.featured)
}

export const getTestimonialsByTag = (tag: string) => {
  return testimonialsData.filter(t => t.tags.includes(tag))
}