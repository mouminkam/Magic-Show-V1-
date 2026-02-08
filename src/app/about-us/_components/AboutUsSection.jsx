import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroBanner from "../../../components/HeroBanner";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const AboutDescription = dynamic(() => import("./AboutDescription"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

const StatsSection = dynamic(() => import("./StatsSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-64" />,
  ssr: true,
});

const TeamSlider = dynamic(() => import("./TeamSlider"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={4} height="h-96" />,
  ssr: true,
});

const TestimonialSlider = dynamic(() => import("./TestimonialSlider"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * AboutUsSection Component
 * Receives data as props from the parent Server Component
 * Each section is lazy loaded for better performance
 * @param {Object} props - Component props
 * @param {Array} props.teamMembers - Array of team member objects
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {Object} props.aboutDescription - About description data
 * @param {Array} props.stats - Array of statistics objects
 * @param {Object} props.aboutHero - Hero banner data from API
 * @param {string} props.className - Optional CSS classes
 */
export default function AboutUsSection({
  teamMembers = [],
  testimonials = [],
  aboutDescription = null,
  stats = [],
  aboutHero = null,
  className = "",
}) {
  return (
    <div className={className}>
      {/* Hero Banner - Loaded immediately (first section) */}
      <ErrorBoundary>
        <AnimatedSection>
          <HeroBanner
            title={aboutHero?.title ?? "ABOUT US"}
            backgroundImage={aboutHero?.backgroundImage ?? "/images/img04.jpg"}
            leftBadge={aboutHero?.leftBadge}
            rightBadge={aboutHero?.rightBadge}
            showGradient
            
          />
        </AnimatedSection>
      </ErrorBoundary>

      {/* About Description - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <AboutDescription data={aboutDescription} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Stats Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-64" />}>
          <AnimatedSection>
            <StatsSection stats={stats} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Team Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} height="h-96" />}>
          <AnimatedSection>
            <TeamSlider teamMembers={teamMembers} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Testimonials Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <TestimonialSlider testimonials={testimonials} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}



