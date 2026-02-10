import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLanguage } from "../../lib/getLanguage";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { createServerAxios } from "../../api/config/serverAxios";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";
import {
  getShopBannerWithAxios,
  getShopCategoriesWithAxios,
  getShopFiltersWithAxios,
  getShopProductsWithAxios,
} from "../../lib/shopApi";

export const metadata = {
  title: 'Shop - Magic Show',
  description: 'Browse our collection of premium shoes and accessories. Find heels, boots, sandals, sneakers and more.',
  keywords: ['shop', 'shoes', 'heels', 'boots', 'sandals', 'sneakers', 'accessories', 'buy online'],
  openGraph: {
    title: 'Shop - Magic Show',
    description: 'Browse our collection of premium shoes and accessories',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop - Magic Show',
    description: 'Browse our collection of premium shoes and accessories',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ShopCritical = dynamic(() => import("./_components/ShopCritical"), {
  loading: () => <SectionSkeleton variant="grid" cardCount={12} height="h-screen" />,
  ssr: true,
});

const SecondarySections = dynamic(() => import("./_components/SecondarySections"), {
  ssr: true,
});

const TopControls = dynamic(() => import("./_components/TopControls"), {
  ssr: true,
});

export default async function ShopPage({ searchParams }) {
  const lang = await getLanguage();
  const resolvedSearchParams = await searchParams;
  const serverAxios = await createServerAxios();

  const shopBannerPromise = cachedServerApi(
    ["shop", "banner", lang],
    () => getShopBannerWithAxios(serverAxios),
    CACHE_REVALIDATE,
    ["shop"]
  );

  const shopProductsPromise = cachedServerApi(
    ["shop", "products", lang, JSON.stringify(resolvedSearchParams ?? {})],
    () => getShopProductsWithAxios(serverAxios, resolvedSearchParams),
    CACHE_REVALIDATE,
    ["shop"]
  );

  const [shopBanner, shopProducts] = await Promise.all([shopBannerPromise, shopProductsPromise]);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <ShopCritical
          shopBanner={shopBanner}
          products={shopProducts?.products ?? []}
          pagination={shopProducts?.pagination ?? { currentPage: 1, totalPages: 1 }}
          top={
            <Suspense fallback={<SectionSkeleton variant="default" height="h-20" />}>
              <TopControls lang={lang} />
            </Suspense>
          }
          sidebar={
            <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
              <SecondarySections lang={lang} />
            </Suspense>
          }
          className="overflow-hidden"
        />
      </ErrorBoundary>
    </div>
  );
}
