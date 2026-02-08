import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroBanner from "../../../../components/HeroBanner";
import AnimatedSection from "../../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const ProductSection = dynamic(() => import("./ProductSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

const RelatedProductsSlider = dynamic(() => import("./RelatedProductsSlider"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * ProductDetailSection Component
 * Receives data as props from the parent Server Component
 * Each section is lazy loaded for better performance
 * @param {Object} props - Component props
 * @param {Object} props.productDetails - Product details data
 * @param {Array} props.relatedProducts - Array of related product objects
 * @param {string|number} props.productId - Product ID
 */
export default function ProductDetailSection({
  productDetails = null,
  relatedProducts = [],
  productId,
}) {
  const bannerData = productDetails?.bannerData || {
    title: "Product Detail",
    backgroundImage: "/images/img04.jpg",
    leftBadge: "SALE OF 50%",
    rightBadge: "TRENDS FOR 2024",
  };

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

      {/* Related Products Slider - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <RelatedProductsSlider products={relatedProducts} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}



