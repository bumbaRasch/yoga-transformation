import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { SkipToContent } from "@/components/ui/skip-to-content"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { BackToTop } from "@/components/ui/back-to-top"
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt"
import { Hero } from "@/components/features/hero"
import { Benefits } from "@/components/features/benefits"
import { MidPageCTA } from "@/components/features/cta-sections"
import { Timeline } from "@/components/features/timeline"
import { ImageGallery } from "@/components/features/image-gallery"
import { Instructor } from "@/components/features/instructor"
import { Testimonials } from "@/components/features/testimonials"
import { UrgencyCTA } from "@/components/features/cta-sections"
import { Pricing } from "@/components/features/pricing"
import { FinalCTA } from "@/components/features/cta-sections"

export default function Home() {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="overflow-hidden">
        <Hero />
        <section id="benefits">
          <Benefits />
        </section>
        <MidPageCTA />
        <section id="timeline">
          <Timeline currentDay={3} completedDays={[1, 2]} />
        </section>
        <section id="gallery" className="bg-gray-50 dark:bg-gray-900/50">
          <ImageGallery />
        </section>
        <section id="instructor">
          <Instructor />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <UrgencyCTA />
        <section id="pricing">
          <Pricing />
        </section>
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
      <PWAInstallPrompt />
    </>
  )
}