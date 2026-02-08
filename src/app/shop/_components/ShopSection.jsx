"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Filter as FilterIcon, X } from "lucide-react";
import HeroBanner from "../../../components/HeroBanner";
import CategoryBanner from "./CategoryBanner";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const CategoryNavigation = dynamic(() => import("./CategoryNavigation"), {
  loading: () => <SectionSkeleton variant="default" height="h-20" />,
  ssr: true,
});

const FilterSidebar = dynamic(() => import("./FilterSidebar"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

const MobileFilterDrawer = dynamic(() => import("./MobileFilterDrawer"), {
  loading: () => <SectionSkeleton variant="default" height="h-screen" />,
  ssr: true,
});

const ProductGrid = dynamic(() => import("./ProductGrid"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={6} height="h-96" />,
  ssr: true,
});

const PaginationControls = dynamic(() => import("./PaginationControls"), {
  loading: () => <SectionSkeleton variant="default" height="h-20" />,
  ssr: true,
});

/**
 * ShopSection Component
 * 
 * Client Component that manages URL-based filtering and pagination.
 * This component is stateless - all state is stored in URL searchParams.
 * 
 * Data Flow:
 * 1. User interacts with filters/pagination → URL searchParams update
 * 2. Next.js SSR → shop/page.jsx reads searchParams
 * 3. Server function filters & paginates → Returns normalized response
 * 4. This component receives already-filtered & paginated products
 * 
 * @param {Object} props - Component props
 * @param {Object} props.shopBanner - Shop banner data
 * @param {Array} props.products - Array of product objects (already filtered and paginated by server)
 * @param {Object} props.pagination - Pagination metadata object
 * @param {number} props.pagination.currentPage - Current page number (1-indexed)
 * @param {number} props.pagination.limit - Number of items per page
 * @param {number} props.pagination.totalItems - Total number of items matching filters (before pagination)
 * @param {number} props.pagination.totalPages - Total number of pages (calculated from totalItems / limit)
 * @param {Array} props.categories - Array of category strings
 * @param {Object} props.filters - Filter options (sizes, colors, seasons, priceRange) - available filter values
 * @param {Object} props.filters.priceRange - Price range object with min and max values
 * @param {number} props.filters.priceRange.min - Minimum price from all products
 * @param {number} props.filters.priceRange.max - Maximum price from all products
 * @param {string} props.className - Optional CSS classes
 */
export default function ShopSection({
  shopBanner = null,
  products = [],
  pagination = {
    currentPage: 1,
    limit: 6,
    totalItems: 0,
    totalPages: 0,
  },
  categories = [],
  filters = { sizes: [], colors: [], seasons: [], priceRange: { min: 0, max: 100 } },
  lang = "ar",
  className = "",
}) {
  const router = useRouter();
  const isAr = lang === "ar";
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Read current filter values from URL searchParams
  const activeCategory = searchParams?.get("category") || "All";
  const selectedSize = searchParams?.get("size") || "";
  const selectedColor = searchParams?.get("color") || "";
  const selectedSeason = searchParams?.get("season") || "";
  
  // Get dynamic price range from filters (set by server)
  const defaultPriceRange = filters.priceRange || { min: 0, max: 100 };
  
  // Read current price filters from URL, or use default range
  const minPrice = searchParams?.get("minPrice")
    ? parseFloat(searchParams.get("minPrice"))
    : defaultPriceRange.min;
  const maxPrice = searchParams?.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice"))
    : defaultPriceRange.max;
  
  const priceRange = { min: minPrice, max: maxPrice };

  // Handler to update URL with new filters
  const updateURLFilters = (updates) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    
    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  // Handlers for filter changes
  const handleCategoryChange = (category) => {
    updateURLFilters({ category: category === "All" ? null : category });
  };

  const handleSizeChange = (size) => {
    updateURLFilters({ size: size || null });
  };

  const handleColorChange = (color) => {
    updateURLFilters({ color: color || null });
  };

  const handleSeasonChange = (seasonValue) => {
    updateURLFilters({ season: seasonValue || null });
  };

  const handlePriceRangeChange = (newRange) => {
    // Compare against dynamic default range from filters
    const defaultMin = defaultPriceRange.min;
    const defaultMax = defaultPriceRange.max;
    
    updateURLFilters({
      minPrice: newRange.min !== defaultMin ? newRange.min : null,
      maxPrice: newRange.max !== defaultMax ? newRange.max : null,
    });
  };

  /**
   * handlePageChange - Updates URL with new page number
   * Preserves all current filters in URL, only changes page parameter
   * 
   * @param {number} page - New page number (1-indexed)
   */
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    // Note: limit is preserved from URL (defaults to 6 if not present)
    router.push(`/shop?${params.toString()}` , { scroll: false });
  };

  /**
   * handleResetFilters - Resets all filters and pagination to defaults
   * Navigates to /shop?page=1 (no filter parameters)
   */
  const handleResetFilters = () => {
    router.push("/shop?page=1", { scroll: false });
  };

  // ========================================
  // IMPORTANT: Products are already filtered and paginated by server
  // ========================================
  // The server function (getShopProducts) has already:
  // 1. Applied all filters
  // 2. Calculated totalItems (count of filtered items)
  // 3. Applied pagination (skip/take pattern)
  // 4. Returned only the current page's products
  // 
  // We do NOT do any client-side filtering or slicing here.
  // The frontend is completely stateless - URL is the single source of truth.
  const displayedProducts = products;

  const bannerData = shopBanner;

  return (
    <div className={className}>
      {/* Hero Banner - Loaded immediately (first section) */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-550px" />}
        >
          <AnimatedSection>
            <HeroBanner
              bannerData={bannerData}
              showGradient={true}
            />
            {/* <CategoryBanner /> */}
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Main Content */}
      <main className="max-w- mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation - Lazy loaded */}
        <ErrorBoundary>
          <Suspense
            fallback={<SectionSkeleton variant="default" height="h-20" />}
          >
            <AnimatedSection>
              <CategoryNavigation
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </AnimatedSection>
          </Suspense>
        </ErrorBoundary>

        {/* Responsive Filter Button for mobile/tablet */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button
            onClick={handleResetFilters}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            {isAr ? "إعادة تعيين الفلاتر" : "Reset Filters"}
          </button>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center px-5 py-3 bg-gray-900 text-white rounded-lg gap-2 shadow-lg font-semibold focus:outline-none"
          >
            <FilterIcon className="w-5 h-5" />
            <span>{isAr ? "فلتر" : "Filter"}</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar Filters - Desktop - Lazy loaded */}
          <aside className="lg:col-span-1 hidden lg:block">
            <ErrorBoundary>
              <Suspense
                fallback={<SectionSkeleton variant="default" height="h-96" />}
              >
                <AnimatedSection>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{isAr ? "الفلاتر" : "Filters"}</h2>
                    <button
                      onClick={handleResetFilters}
                      className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                      {isAr ? "إعادة" : "Reset"}
                    </button>
                  </div>
                  <FilterSidebar
                    priceRange={priceRange}
                    availablePriceRange={defaultPriceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    sizes={filters.sizes}
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
                    colors={filters.colors}
                    selectedColor={selectedColor}
                    onColorChange={handleColorChange}
                    seasons={filters.seasons}
                    selectedSeason={selectedSeason}
                    onSeasonChange={handleSeasonChange}
                    lang={lang}
                  />
                </AnimatedSection>
              </Suspense>
            </ErrorBoundary>
          </aside>

          {/* Mobile Filter Drawer - Lazy loaded */}
          {isFilterOpen && (
            <ErrorBoundary>
              <Suspense
                fallback={
                  <SectionSkeleton variant="default" height="h-screen" />
                }
              >
                <MobileFilterDrawer onClose={() => setIsFilterOpen(false)}>
                  <div className="flex justify-between items-center mb-4 sticky top-0 z-50 bg-white py-0 mt-20">
                    <h2 className="text-lg font-bold">{isAr ? "الفلاتر" : "Filters"}</h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      aria-label="Close"
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <X className="w-6 h-6 bg-black text-white rounded-sm p-1" />
                    </button>
                  </div>
                  <FilterSidebar
                    priceRange={priceRange}
                    availablePriceRange={defaultPriceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    sizes={filters.sizes}
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
                    colors={filters.colors}
                    selectedColor={selectedColor}
                    onColorChange={handleColorChange}
                    seasons={filters.seasons}
                    selectedSeason={selectedSeason}
                    onSeasonChange={handleSeasonChange}
                    lang={lang}
                  />
                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 bg-gray-200 text-gray-800 rounded-lg px-6 py-3 font-bold text-base shadow hover:bg-gray-300 transition-all duration-200"
                    >
                      {isAr ? "إعادة" : "Reset"}
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-black text-white rounded-lg px-6 py-3 font-bold text-base shadow hover:bg-gray-800 transition-all duration-200"
                    >
                      {isAr ? "تم" : "Done"}
                    </button>
                  </div>
                </MobileFilterDrawer>
              </Suspense>
            </ErrorBoundary>
          )}

          {/* Product Grid - Lazy loaded */}
          <section className="lg:col-span-3">
            {displayedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {isAr ? "لم يتم العثور على منتجات بهذه الفلاتر." : "No products found with these filters."}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-gray-900 underline hover:text-gray-700"
                >
                  {isAr ? "إعادة تعيين الفلاتر" : "Reset filters"}
                </button>
              </div>
            ) : (
              <>
                <ErrorBoundary>
                  <Suspense
                    fallback={
                      <SectionSkeleton
                        variant="grid"
                        cardCount={6}
                        height="h-96"
                      />
                    }
                  >
                    <AnimatedSection>
                      <ProductGrid products={displayedProducts} />
                    </AnimatedSection>
                  </Suspense>
                </ErrorBoundary>

                {/* Pagination Controls - Lazy loaded */}
                {/* Only show pagination if there's more than 1 page */}
                {pagination.totalPages > 1 && (
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <SectionSkeleton variant="default" height="h-20" />
                      }
                    >
                      <AnimatedSection>
                        <PaginationControls
                          currentPage={pagination.currentPage}
                          totalPages={pagination.totalPages}
                          onPageChange={handlePageChange}
                        />
                      </AnimatedSection>
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
