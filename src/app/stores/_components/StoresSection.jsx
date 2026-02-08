import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroBanner from "../../../components/HeroBanner";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const StoresListSection = dynamic(() => import("./StoresListSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * StoresSection Component
 * Receives data as props from the parent Server Component
 * Each section is lazy loaded for better performance
 * @param {Object} props - Component props
 * @param {Object} props.storesBanner - Banner data object
 * @param {Array} props.stores - Array of store objects
 * @param {string} props.className - Optional CSS classes
 */
export default function StoresSection({
  storesBanner = null,
  stores = [],
  className = "",
}) {
  return (
    <div className={className}>
      {/* Hero Banner - Loaded immediately (first section) */}
      <ErrorBoundary>
        <AnimatedSection>
          <HeroBanner
            bannerData={storesBanner}
            showGradient={true}
          />
        </AnimatedSection>
      </ErrorBoundary>

      {/* Stores List Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <StoresListSection stores={stores} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
