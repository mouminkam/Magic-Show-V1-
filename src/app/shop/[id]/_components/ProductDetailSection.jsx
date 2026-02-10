import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimatedSection from "../../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const ProductSection = dynamic(() => import("./ProductSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * ProductDetailSection Component
 * Receives data as props from the parent Server Component
 * Each section is lazy loaded for better performance
 * @param {Object} props - Component props
 * @param {Object} props.productDetails - Product details data
 * @param {string|number} props.productId - Product ID
 */
export default function ProductDetailSection({
  productDetails = null,
  productId,
}) {
  return (
    <div className="product-detail-page">
      {/* Product Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <ProductSection productDetails={productDetails} productId={productId} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
