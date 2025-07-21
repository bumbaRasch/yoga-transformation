# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a planned **Next.js 15** application for a "14-Day Yoga Transformation" progressive web app (PWA) with multilingual support (EN/DE). **Currently in documentation/planning phase** - no code has been implemented yet. All technical details below represent the planned architecture.

## Architecture & Technology Stack

### Current Status
**⚠️ PROJECT NOT YET IMPLEMENTED**
- No package.json or dependencies installed
- No source code files created
- Only contains planning documentation (PRD.md, TASKS.md, PLANNING.md)

### Planned Stack
- **Framework**: Next.js 15.4.2 with App Router
- **Runtime**: React 19.1.0 with React DOM 19.1.0  
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS 4 with PostCSS
- **Linting**: ESLint 9 with Next.js TypeScript config

### Planned Architecture (per PRD)
The PRD outlines an ambitious modern web app with:
- **UI**: HeroUI/NextUI v3 + Radix UI primitives
- **State**: Zustand 5.0 + TanStack Query v5
- **Animation**: Framer Motion 12 + Three.js + View Transitions API
- **Testing**: Vitest + Playwright + Chromatic
- **i18n**: next-intl for EN/DE support
- **AI Features**: Vercel AI SDK integration
- **3D Graphics**: Three.js with WebGPU effects

### Project Structure
```
src/
├── app/                 # Next.js 15 App Router
│   ├── layout.tsx      # Root layout with fonts (Geist, Geist Mono)
│   ├── page.tsx        # Homepage (currently default Next.js template)
│   ├── globals.css     # Global Tailwind styles
│   └── favicon.ico
```

## Development Commands

### ⚠️ First Steps Required
Before any development can begin, the project must be initialized:

```bash
# 1. Initialize Next.js project (from parent directory)
npx create-next-app@latest joga-landing --typescript --tailwind --eslint --app --src-dir --import-alias="@/*"

# 2. Navigate to project directory
cd joga-landing

# 3. Install additional dependencies (see Dependencies section below)
npm install @heroui/react framer-motion three @react-three/fiber @react-three/drei next-intl zustand @tanstack/react-query

# 4. Start development
npm run dev
```

### Standard Development (Once Initialized)
```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Project Setup
The project uses standard Next.js configuration:
- **TypeScript**: Configured with strict mode and path mapping (`@/*` → `./src/*`)
- **ESLint**: Next.js core-web-vitals and TypeScript rules
- **Turbopack**: Enabled for development server

## Key Implementation Notes

### Current State
- **Documentation Phase**: Comprehensive PRD and task breakdown completed
- **No Code**: Project directory exists but contains only documentation files
- **Ready for Implementation**: Architecture and requirements fully defined

### Next Immediate Steps
1. **Initialize Project**: Run create-next-app with planned configuration
2. **Setup Development Environment**: Install dependencies and configure tooling
3. **Create Project Structure**: Implement the folder architecture from PRD
4. **Begin Milestone 1**: Follow the detailed task breakdown in TASKS.md

### Planned Features (from PRD)
1. **Multilingual Landing Page**: EN/DE with next-intl
2. **Interactive Timeline**: 14-day transformation journey with 3D visualization
3. **Advanced Animations**: Framer Motion + WebGPU effects
4. **AI Integration**: Chatbot and personalization features
5. **PWA Functionality**: Offline support and installability
6. **Performance**: Core Web Vitals optimization (LCP <1.5s, INP <200ms, CLS <0.05)

### Implementation Priority (11 Milestones - 30 Days)
1. **Project Foundation** (Days 1-3): Initialize Next.js, setup tooling, create structure
2. **Core Components** (Days 4-6): Build design system and reusable UI components  
3. **Hero Section** (Days 7-9): Create stunning animated hero with effects
4. **Interactive Timeline** (Days 10-12): Build 14-day journey visualization
5. **Content Sections** (Days 13-15): Benefits, instructor, testimonials, pricing
6. **Advanced Features** (Days 16-18): AI chatbot, FAQ, forms
7. **Internationalization** (Days 19-20): Complete EN/DE multilingual support
8. **Performance & PWA** (Days 21-22): Optimize Core Web Vitals, add PWA features
9. **Testing & Quality** (Days 23-24): Comprehensive testing suite
10. **Deployment** (Days 25-27): Vercel deployment and monitoring setup
11. **Post-Launch** (Days 28-30): Optimization and documentation

**⭐ See TASKS.md for detailed task breakdown (380+ tasks across 11 milestones)**

## Development Guidelines

### Performance Requirements
- **Bundle Size**: <150KB initial JS
- **Core Web Vitals**: LCP <1.5s, INP <200ms, CLS <0.05
- **Lighthouse Score**: Target 100 across all categories

### Accessibility Standards
- **WCAG 3.0**: APCA contrast algorithm
- **Touch Targets**: 48px minimum
- **Keyboard Navigation**: Full support with focus-visible
- **Reduced Motion**: Alternatives for all animations

### Code Organization
- **Atomic Design**: Atoms → Molecules → Organisms pattern
- **Feature-Based**: Group components by feature/domain
- **Type Safety**: Strict TypeScript with Zod validation
- **Testing**: 80% unit test coverage minimum

## Dependencies to Add (based on PRD)
```bash
# UI and Animation
npm install @heroui/react framer-motion three @react-three/fiber @react-three/drei

# Internationalization
npm install next-intl

# State Management
npm install zustand @tanstack/react-query

# Utilities
npm install lucide-react class-variance-authority clsx tailwind-merge

# Development
npm install -D vitest @vitejs/plugin-react playwright @playwright/test
```

## Unique Project Characteristics

### Modern Web Standards
- Uses cutting-edge features like View Transitions API, WebGPU, CSS Houdini
- Implements progressive enhancement with graceful fallbacks
- Focuses on performance with sub-3-second load times

### Multilingual Architecture
- URL-based routing (`/en`, `/de`)
- Currency and date localization
- Cultural adaptation for different markets

### AI-Powered Features
- Dynamic content based on time/location
- Personalized recommendations
- Natural language FAQ system

This project serves as a portfolio piece demonstrating modern web development capabilities with React 19, Next.js 15, and 2025's latest web technologies.