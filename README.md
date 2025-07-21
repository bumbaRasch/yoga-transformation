# 14-Day Yoga Transformation PWA

A modern, multilingual progressive web application built with Next.js 15, React 19, and cutting-edge web technologies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global Tailwind styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   └── button.tsx     # Button component with variants
│   └── features/          # Feature-specific components
│       └── hero.tsx       # Hero section component
├── lib/
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants and data
└── types/
    └── index.ts          # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Runtime**: React 19.1.0 with React DOM 19.1.0
- **Language**: TypeScript 5 with strict mode
- **Styling**: Tailwind CSS 4 with PostCSS
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Linting**: ESLint 9 with Next.js TypeScript config
- **Build Tool**: Turbopack for fast development

## ✨ Current Features

- ✅ Modern Hero section with animated gradients
- ✅ Responsive design (mobile-first)
- ✅ Dynamic greeting based on time of day
- ✅ Smooth animations with Framer Motion
- ✅ Accessible button components with variants
- ✅ TypeScript throughout with strict mode
- ✅ Tailwind CSS 4 with modern utilities
- ✅ SEO-optimized metadata

## 🎯 Next Steps

This is the first small step implementation. The project is ready for:

1. **Timeline Component Development** - Build the interactive 14-day journey
2. **Content Sections** - Add benefits, instructor profile, testimonials
3. **Internationalization** - Add German language support
4. **PWA Features** - Service worker, offline support, installability
5. **Advanced Animations** - 3D effects, scroll-triggered animations
6. **AI Integration** - Chatbot and personalized recommendations

## 📚 Documentation

See the `docs/` folder for comprehensive project documentation:
- `PRD.md` - Complete product requirements
- `TASKS.md` - Detailed task breakdown (380+ tasks)
- `CLAUDE.md` - Development guidance for Claude Code

## 🎨 Design System

The project includes a modern design system with:
- Gradient color schemes (purple, pink, orange)
- Typography scale with Geist fonts
- Button variants with proper accessibility
- Responsive breakpoints
- Animation configurations

## 🚀 Development Workflow

1. All components are built mobile-first
2. TypeScript strict mode enforced
3. Animations are performant and accessible
4. Components use composition patterns
5. Utility functions are properly typed

This implementation provides a solid foundation for building the complete 14-day yoga transformation experience.
