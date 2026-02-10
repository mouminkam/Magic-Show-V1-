"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import HeroBanner from "../../../components/HeroBanner";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={6} height="h-96" />,
  ssr: true,
});

const PaginationControls = dynamic(() => import("./PaginationControls"), {
  loading: () => <SectionSkeleton variant="default" height="h-20" />,
  ssr: true,
});

export default function ShopCritical({
  shopBanner = null,
  products = [],
  pagination = { currentPage: 1, totalPages: 1 },
  top = null,
  sidebar = null,
  className = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(page));
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={className}>
      <HeroBanner bannerData={shopBanner} showGradient={true} />

      <main className="max-w- mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {top}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            {sidebar}
          </aside>

          <section className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found.</p>
              </div>
            ) : (
              <>
                <ErrorBoundary>
                  <Suspense
                    fallback={<SectionSkeleton variant="grid" cardCount={6} height="h-96" />}
                  >
                    <ProductGrid products={products} />
                  </Suspense>
                </ErrorBoundary>

                {pagination?.totalPages > 1 && (
                  <ErrorBoundary>
                    <Suspense fallback={<SectionSkeleton variant="default" height="h-20" />}>
                      <PaginationControls
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </Suspense>
                  </ErrorBoundary>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
