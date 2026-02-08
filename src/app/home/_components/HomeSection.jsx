import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const HomeBanner = dynamic(() => import("./HomeBanner"), {
  loading: () => <SectionSkeleton variant="default" height="h-screen" />,
  ssr: true,
});

const HeroSection = dynamic(() => import("./HeroSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-screen" />,
  ssr: true,
});

const FeaturedCategories = dynamic(() => import("./FeaturedCategories"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={5} height="h-64" />,
  ssr: true,
});

const NewArrivals = dynamic(() => import("./NewArrivals"), {
  loading: () => (
    <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />
  ),
  ssr: true,
});

const SpecialOffers = dynamic(() => import("./SpecialOffers"), {
  loading: () => (
    <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />
  ),
  ssr: true,
});

const BestSellers = dynamic(() => import("./BestSellers"), {
  loading: () => (
    <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />
  ),
  ssr: true,
});

const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), {
  loading: () => <SectionSkeleton variant="default" height="h-64" />,
  ssr: true,
});

const CustomerReviews = dynamic(() => import("./CustomerReviews"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

const FeaturedProducts = dynamic(() => import("./FeaturedProducts"), {
  loading: () => (
    <SectionSkeleton variant="grid" cardCount={6} height="h-screen" />
  ),
  ssr: true,
});

const LatestBlogSection = dynamic(() => import("./LatestBlogSection"), {
  loading: () => (
    <SectionSkeleton variant="grid" cardCount={3} height="h-96" />
  ),
  ssr: true,
});

const Newsletter = dynamic(() => import("./Newsletter"), {
  loading: () => <SectionSkeleton variant="default" height="h-64" />,
  ssr: true,
});

/**
 * HomeSection Component
 * Receives data as props from the parent Server Component
 * Each section is lazy loaded for better performance
 * @param {Object} props - Component props
 * @param {Object} props.heroData - Hero section data
 * @param {Object} props.aboutUsData - About Us section data
 * @param {Object} props.featuredProductsData - Featured products data
 * @param {Object} props.blogSectionData - Blog/Newsletter section data
 * @param {Object} props.latestBlogData - Latest blog section data
 * @param {Array} props.featuredCategories - Featured categories data
 * @param {Object} props.newArrivals - New arrivals data
 * @param {Object} props.bestSellers - Best sellers data
 * @param {Array} props.whyChooseUs - Why choose us features
 * @param {Array} props.customerReviews - Customer reviews data
 * @param {Object} props.newsletterData - Newsletter header (title, description)
 */
export default function HomeSection({
  heroData = null,
  aboutUsData = null,
  featuredProductsData = null,
  blogSectionData = null,
  latestBlogData = null,
  featuredCategories = [],
  newArrivals = null,
  bestSellers = null,
  whyChooseUs = [],
  customerReviews = [],
  newsletterData = null,
}) {
  return (
    <div className="bg-white">
      {/* Hero Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-screen" />}
        >
          <AnimatedSection>
            <HomeBanner heroData={heroData}  />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Featured Categories - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="grid" cardCount={5} height="h-64" />
          }
        >
          <AnimatedSection>
            <FeaturedCategories categories={featuredCategories} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* New Arrivals - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />
          }
        >
          <AnimatedSection>
            <NewArrivals
              products={newArrivals?.products || []}
              header={newArrivals?.header}
            />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>


      {/* Best Sellers - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />
          }
        >
          <AnimatedSection>
            <BestSellers
              products={bestSellers?.products || []}
              header={bestSellers?.header}
            />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Featured Products Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="grid" cardCount={6} height="h-screen" />
          }
        >
          <AnimatedSection>
            <FeaturedProducts
              featuredHeader={featuredProductsData?.featuredHeader}
              onSaleHeader={featuredProductsData?.onSaleHeader}
              featuredProducts={featuredProductsData?.featuredProducts}
              onSaleProducts={featuredProductsData?.onSaleProducts}
            />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Why Choose Us - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-64" />}
        >
          <AnimatedSection>
            <WhyChooseUs features={whyChooseUs} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Customer Reviews - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-96" />}
        >
          <AnimatedSection>
            <CustomerReviews reviews={customerReviews} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Latest Blog Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="grid" cardCount={3} height="h-96" />
          }
        >
          <AnimatedSection>
            <LatestBlogSection latestBlogData={latestBlogData} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Newsletter - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-64" />}
        >
          <AnimatedSection>
            <Newsletter header={newsletterData} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
