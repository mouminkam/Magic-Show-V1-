import { Suspense } from "react";
import dynamic from "next/dynamic";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import SectionBoundary from "./SectionBoundary";

const NewArrivals = dynamic(() => import("./NewArrivals"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />,
  ssr: true,
});

const BestSellers = dynamic(() => import("./BestSellers"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={4} height="h-screen" />,
  ssr: true,
});

const FeaturedProducts = dynamic(() => import("./FeaturedProducts"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={6} height="h-screen" />,
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

const LatestBlogSection = dynamic(() => import("./LatestBlogSection"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={3} height="h-96" />,
  ssr: true,
});

const Newsletter = dynamic(() => import("./Newsletter"), {
  loading: () => <SectionSkeleton variant="default" height="h-64" />,
  ssr: true,
});

export default async function SecondarySections({ promises }) {
  const [
    newArrivals,
    bestSellers,
    featuredProductsData,
    latestBlogData,
    whyChooseUs,
    customerReviews,
    newsletterData,
  ] = await Promise.all([
    promises.newArrivals,
    promises.bestSellers,
    promises.featuredProductsData,
    promises.latestBlogData,
    promises.whyChooseUs,
    promises.customerReviews,
    promises.newsletterData,
  ]);

  return (
    <div className="bg-white">
      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} height="h-screen" />}>
          <NewArrivals
            products={newArrivals?.products ?? []}
            header={newArrivals?.header ?? null}
          />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} height="h-screen" />}>
          <BestSellers
            products={bestSellers?.products ?? []}
            header={bestSellers?.header ?? null}
          />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} height="h-screen" />}>
          <FeaturedProducts
            featuredHeader={featuredProductsData?.featuredHeader ?? null}
            onSaleHeader={featuredProductsData?.onSaleHeader ?? null}
            featuredProducts={featuredProductsData?.featuredProducts ?? []}
            onSaleProducts={featuredProductsData?.onSaleProducts ?? []}
          />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-64" />}>
          <WhyChooseUs features={whyChooseUs ?? []} />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <CustomerReviews reviews={customerReviews ?? []} />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} height="h-96" />}>
          <LatestBlogSection latestBlogData={latestBlogData ?? null} />
        </Suspense>
      </SectionBoundary>

      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-64" />}>
          <Newsletter header={newsletterData ?? null} />
        </Suspense>
      </SectionBoundary>
    </div>
  );
}
