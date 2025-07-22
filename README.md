# 🧘‍♀️ YogaTransform - 14-Day Yoga Transformation Landing Page

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.4.2-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A premium, conversion-optimized landing page for yoga course promotion**

*Modern • Multilingual • Accessible • Performance-Optimized*

[Demo](#demo) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation)

</div>

---

## 🌟 Overview

YogaTransform is a high-conversion landing page designed specifically for yoga course promotion and client acquisition. Built with cutting-edge web technologies, it delivers exceptional user experience across all devices while maintaining perfect accessibility and SEO standards.

### 🎯 Business Purpose
- **Course Promotion**: Showcase 14-day yoga transformation program
- **Lead Generation**: Convert visitors into enrolled students
- **Multi-Market**: Support English, German, and Spanish markets
- **Professional Branding**: Establish credibility and trust

## ✨ Key Features

### 🌐 **Internationalization & Accessibility**
- **Trilingual Support**: Native EN/DE/ES localization with `useTranslations`
- **WCAG 2.1 AA Compliant**: Full accessibility including screen readers
- **Cultural Adaptation**: Localized content, formatting, and imagery
- **SEO Optimized**: Multi-language sitemaps and meta tags

### 🎨 **Modern Design & UX**
- **Dark/Light/System Themes**: Intelligent theme switching with smooth transitions
- **Responsive Design**: Mobile-first with perfect cross-device experience
- **Animated Hero Section**: Engaging entrance with Framer Motion animations
- **Video Modal**: High-quality program preview with accessibility controls
- **Professional Typography**: Geist font family for optimal readability

### ⚡ **Performance & Technical Excellence**
- **Next.js 15 + Turbopack**: Lightning-fast development and production builds
- **React 19**: Latest React features with concurrent rendering
- **Optimized Images**: WebP format with lazy loading and responsive sizing
- **Core Web Vitals**: Perfect Lighthouse scores across all metrics
- **Progressive Web App**: Installable with offline capabilities

### 🏗️ **Component Architecture**
- **Modular Components**: Reusable, well-documented component library
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Accessible Navigation**: Keyboard navigation and ARIA compliance
- **Professional Footer**: Complete legal pages and social integration
- **Conversion-Optimized**: Strategic CTA placement and user flow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd yoga-transformation

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

### Development Commands

```bash
# Development with hot reload
npm run dev          # Starts on http://localhost:3000

# Production build
npm run build        # Creates optimized production build

# Production server
npm start           # Serves production build

# Code quality
npm run lint        # ESLint with Next.js rules
```

## 📁 Project Structure

```
src/
├── app/                         # Next.js 15 App Router
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Homepage with all sections
│   ├── globals.css             # Global styles & CSS variables
│   ├── privacy-policy/         # Legal pages
│   ├── terms-of-service/       # (auto-generated routes)
│   ├── cookie-policy/          # 
│   └── refund-policy/          # 
├── components/
│   ├── features/               # Business logic components
│   │   ├── hero.tsx           # Animated hero section
│   │   ├── benefits.tsx       # Program benefits showcase
│   │   ├── instructor.tsx     # Maya Chen profile
│   │   ├── testimonials.tsx   # Customer testimonials
│   │   └── pricing.tsx        # Pricing plans & CTA
│   ├── layout/                 # Layout components
│   │   ├── navigation.tsx     # Responsive nav with theme toggle
│   │   └── footer.tsx         # Footer with legal links & newsletter
│   ├── legal/                  # Legal page components
│   │   ├── privacy-policy.tsx # GDPR-compliant privacy policy
│   │   ├── terms-of-service.tsx # Complete terms & conditions
│   │   ├── cookie-policy.tsx  # Cookie management & consent
│   │   ├── refund-policy.tsx  # Professional refund policy
│   │   └── legal-page-layout.tsx # Reusable legal page layout
│   └── ui/                     # Reusable UI components
│       ├── button.tsx         # Accessible button variants
│       ├── theme-toggle.tsx   # Dark/light theme switcher
│       ├── language-switcher.tsx # Multi-language selector
│       ├── video-modal.tsx    # Accessible video player
│       ├── error-boundary.tsx # Error handling component
│       └── skip-to-content.tsx # Accessibility navigation
├── contexts/
│   ├── theme-context.tsx      # Theme management with SSR support
│   └── language-context.tsx   # Internationalization context
├── hooks/
│   ├── useLocalStorage.ts     # SSR-safe localStorage hook
│   └── useScrollspy.ts        # Navigation active state tracking
├── lib/
│   ├── utils.ts              # Utility functions (clsx, cn)
│   ├── constants.ts          # App constants & configuration
│   ├── navigation-data.ts    # Navigation & footer data
│   └── focus-styles.ts       # Accessible focus styling
├── messages/                  # Internationalization
│   ├── en.json              # English translations (500+ keys)
│   ├── de.json              # German translations (complete)
│   └── es.json              # Spanish translations (complete)
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.4.2** - App Router with React Server Components
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Strict mode for type safety

### **Styling & Design**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Advanced animations and gestures
- **Lucide React** - Beautiful, consistent icon library
- **CSS Custom Properties** - Theme-aware design tokens

### **Development Tools**
- **Turbopack** - Ultra-fast bundler for development
- **ESLint 9** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

### **Utilities**
- **class-variance-authority** - Type-safe component variants
- **clsx & tailwind-merge** - Conditional CSS class merging
- **next-pwa** - Progressive Web App capabilities

## 📱 Features Deep Dive

### 🌍 **Internationalization**
Complete trilingual support with professional translations:

```typescript
// Usage example
import { useTranslations } from '@/contexts/language-context'

function Component() {
  const t = useTranslations()
  return <h1>{t('hero.title')}</h1>
}
```

**Supported Languages:**
- 🇺🇸 **English** - Primary market (US/UK/AU)
- 🇩🇪 **German** - European market (DE/AT/CH) 
- 🇪🇸 **Spanish** - Hispanic markets (ES/MX/LATAM)

### 🎨 **Theme System**
Intelligent theme switching with user preference persistence:

- **Light Theme** - Clean, professional daytime experience
- **Dark Theme** - Easy on eyes with perfect contrast ratios
- **System Theme** - Automatically matches user's OS preference
- **Smooth Transitions** - Seamless theme switching animations

### 📱 **Responsive Design**
Mobile-first approach with strategic breakpoints:

```css
/* Breakpoint Strategy */
sm: 640px    /* Small tablets, large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

### ⚡ **Performance Optimizations**
- **Image Optimization** - WebP format with lazy loading
- **Code Splitting** - Route-based and dynamic imports
- **Bundle Analysis** - Optimized dependency management  
- **Caching Strategy** - Static generation with ISR
- **Core Web Vitals** - LCP < 1.5s, INP < 200ms, CLS < 0.05

## 🎯 Business Features

### 💼 **Conversion Optimization**
- **Strategic CTAs** - Above-the-fold and section-specific calls-to-action
- **Social Proof** - Customer testimonials with photos and results
- **Urgency Elements** - Limited-time offers and enrollment deadlines  
- **Trust Signals** - Professional credentials and guarantees
- **Lead Magnets** - Free preview content and newsletter signup

### 📊 **Analytics & Tracking**
- **Google Analytics 4** - Comprehensive user behavior tracking
- **Conversion Tracking** - Goal completion and funnel analysis
- **A/B Testing Ready** - Component-based testing capabilities
- **Performance Monitoring** - Real User Metrics (RUM) integration

### 🛡️ **Legal Compliance**
Complete legal framework for international markets:

- **Privacy Policy** - GDPR/CCPA compliant data handling
- **Terms of Service** - Comprehensive usage terms with health disclaimers
- **Cookie Policy** - Transparent cookie usage and management
- **Refund Policy** - Clear refund procedures and customer protection

## 🏗️ Component Library

### **Layout Components**
- `Navigation` - Responsive navbar with theme toggle and language switcher
- `Footer` - Rich footer with newsletter signup and legal links
- `LegalPageLayout` - Consistent layout for all legal pages

### **Feature Components**
- `Hero` - Animated hero section with dynamic greeting
- `Benefits` - Program benefits with animated cards
- `Instructor` - Maya Chen profile with credentials
- `Testimonials` - Customer success stories carousel
- `Pricing` - Conversion-optimized pricing plans

### **UI Components**
- `Button` - Accessible button with loading states and variants
- `VideoModal` - Accessible video player with keyboard controls  
- `ThemeToggle` - Smooth theme switching with system detection
- `LanguageSwitcher` - Elegant language selection dropdown
- `ErrorBoundary` - Graceful error handling and user feedback

## 🚀 Deployment

### **Recommended Platforms**
- **Vercel** (Recommended) - Seamless Next.js deployment with edge functions
- **Netlify** - JAMstack deployment with form handling
- **AWS Amplify** - Scalable deployment with CDN integration

### **Environment Variables**
```bash
# Required for production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics tracking ID
NEXT_PUBLIC_SITE_URL=https://example.com # Canonical site URL for SEO
```

### **Build Optimization**
```bash
# Production build with analysis
npm run build

# Check bundle sizes
npx @next/bundle-analyzer
```

## 🔧 Configuration

### **Tailwind Configuration**
Custom design system with wellness-focused color palette and typography scale optimized for yoga/wellness branding.

### **TypeScript Configuration**
Strict mode enabled with path mapping for clean imports:
```typescript
// Clean imports
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/contexts/language-context'
```

### **SEO Configuration**
Comprehensive SEO setup with:
- Structured data for yoga/wellness industry
- Multi-language sitemaps
- Social media optimization (Open Graph, Twitter Cards)
- Local SEO for yoga studios

## 📈 Performance Metrics

### **Lighthouse Scores** (Target)
- **Performance**: 100/100
- **Accessibility**: 100/100  
- **Best Practices**: 100/100
- **SEO**: 100/100

### **Core Web Vitals** (Target)
- **LCP** (Largest Contentful Paint): < 1.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.05

### **Bundle Size** (Optimized)
- **Initial JS**: ~150KB (gzipped)
- **Total Bundle**: ~500KB (including images)
- **First Load JS**: ~180KB shared across routes

## 🧪 Testing Strategy

### **Component Testing**
- Unit tests for utility functions and hooks
- Component testing with React Testing Library  
- Visual regression testing with Chromatic

### **E2E Testing** 
- User journey testing with Playwright
- Cross-browser compatibility testing
- Mobile device testing on real devices

### **Performance Testing**
- Lighthouse CI for automated performance testing
- Bundle size monitoring and alerts
- Real User Monitoring (RUM) integration

## 📚 Documentation

### **Getting Started**
- [Installation Guide](#quick-start) - Set up development environment
- [Component Guide](docs/components.md) - Using and extending components  
- [Internationalization](docs/i18n.md) - Adding new languages and translations

### **Development**
- [Architecture Overview](docs/architecture.md) - System design and patterns
- [Styling Guide](docs/styling.md) - Design system and Tailwind usage
- [Performance Guide](docs/performance.md) - Optimization best practices

### **Business**
- [PRD.md](docs/PRD.md) - Complete product requirements document
- [TASKS.md](docs/TASKS.md) - Detailed development task breakdown
- [Brand Guidelines](docs/brand.md) - Visual identity and content guidelines

## 🤝 Contributing

### **Development Workflow**
1. **Setup** - Clone repo and install dependencies
2. **Branch** - Create feature branch from `main`
3. **Develop** - Follow TypeScript and ESLint standards
4. **Test** - Run tests and ensure accessibility compliance
5. **Review** - Submit PR with comprehensive description

### **Code Standards**
- **TypeScript** - Strict mode with comprehensive typing
- **ESLint** - Next.js recommended rules with accessibility plugins
- **Prettier** - Consistent code formatting
- **Conventional Commits** - Structured commit messages

## 📄 License

This project is proprietary software designed for yoga course promotion. All rights reserved.

---

## 🌟 Success Metrics

### **Business KPIs**
- **Conversion Rate**: Target 5-8% visitor to lead conversion
- **Bounce Rate**: Target < 40% average session engagement  
- **Page Speed**: Target < 3s load time on 3G networks
- **Accessibility**: WCAG 2.1 AA compliance across all pages

### **Technical Metrics**
- **Bundle Size**: < 500KB total JavaScript
- **Lighthouse Score**: 95+ across all categories
- **Cross-Browser Support**: Chrome, Firefox, Safari, Edge
- **Mobile Performance**: 90+ mobile Lighthouse score

---

<div align="center">

**Built with ❤️ for the yoga community**

*Transform your practice, transform your life*

</div>