"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter as FilterIcon, X } from "lucide-react";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import { getShopCategoriesWithAxios, getShopFiltersWithAxios } from "../../../lib/shopApi";
import { createClientAxios } from "../../../api/config/clientAxios";
import api from "../../../api";

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

export default function ShopControls({
  categories = [],
  filters = { sizes: [], colors: [], seasons: [], priceRange: { min: 0, max: 100 } },
  lang = "ar",
  variant = "full",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAr = lang === "ar";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Client-side state for categories and filters
  const [categoriesData, setCategoriesData] = useState(categories);
  const [filtersData, setFiltersData] = useState(filters);
  const [isLoading, setIsLoading] = useState(false);

  const activeCategory = searchParams?.get("category") || "All";
  const selectedSize = searchParams?.get("size") || "";
  const selectedColor = searchParams?.get("color") || "";
  const selectedSeason = searchParams?.get("season") || "";

  const defaultPriceRange = filtersData.priceRange || { min: 0, max: 100 };

  const minPrice = searchParams?.get("minPrice")
    ? parseFloat(searchParams.get("minPrice"))
    : defaultPriceRange.min;

  const maxPrice = searchParams?.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice"))
    : defaultPriceRange.max;

  const priceRange = { min: minPrice, max: maxPrice };

  // Client-side fetching for categories and filters
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchSecondaryData = async () => {
      setIsLoading(true);
      try {
        // Create client-side axios instance
        const axios = createClientAxios();
        
        const [categoriesResult, filtersResult] = await Promise.all([
          getShopCategoriesWithAxios(axios),
          getShopFiltersWithAxios(axios)
        ]);
        
        if (!abortController.signal.aborted) {
          setCategoriesData(categoriesResult ?? []);
          setFiltersData(filtersResult ?? {});
        }
      } catch (error) {
        console.error("Error fetching secondary data:", error);
        
        // Fallback to mock data when network fails
        if (!abortController.signal.aborted) {
          console.warn("Using fallback data due to network error");
          setCategoriesData(["All", "Heels", "Boots", "Sandals", "Sneakers"]);
          setFiltersData({
            sizes: ["36", "37", "38", "39", "40", "41"],
            colors: ["Black", "White", "Red", "Blue", "Brown"],
            seasons: ["Summer", "Spring", "Autumn", "Winter"],
            priceRange: { min: 0, max: 1000 },
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSecondaryData();

    return () => {
      abortController.abort();
    };
  }, []); // Only run once on mount

  const updateURLFilters = (updates) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    params.set("page", "1");
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

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
    const defaultMin = defaultPriceRange.min;
    const defaultMax = defaultPriceRange.max;

    updateURLFilters({
      minPrice: newRange.min !== defaultMin ? newRange.min : null,
      maxPrice: newRange.max !== defaultMax ? newRange.max : null,
    });
  };

  const handleResetFilters = () => {
    router.push("/shop?page=1", { scroll: false });
  };

  return (
    <>
      {(variant === "full" || variant === "top") && (
        <>
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton variant="default" height="h-20" />}>
              <CategoryNavigation
                categories={categoriesData}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                isLoading={isLoading}
              />
            </Suspense>
          </ErrorBoundary>

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
        </>
      )}

      {(variant === "full" || variant === "sidebar") && (
        <div className="hidden lg:block">
          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
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
                sizes={filtersData.sizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
                colors={filtersData.colors}
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                seasons={filtersData.seasons}
                selectedSeason={selectedSeason}
                onSeasonChange={handleSeasonChange}
                lang={lang}
                isLoading={isLoading}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {isFilterOpen && (
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
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
                sizes={filtersData.sizes}
                selectedSize={selectedSize}
                onSizeChange={handleSizeChange}
                colors={filtersData.colors}
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                seasons={filtersData.seasons}
                selectedSeason={selectedSeason}
                onSeasonChange={handleSeasonChange}
                lang={lang}
                isLoading={isLoading}
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
    </>
  );
}
