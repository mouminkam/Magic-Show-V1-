import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLanguage } from "../../lib/getLanguage";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { createServerAxios } from "../../api/config/serverAxios";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";

export const metadata = {
  title: 'Our Stores - Magic Show',
  description: 'Find Magic Show stores near you. Visit our locations for an in-person shopping experience and personalized service.',
  keywords: ['stores', 'locations', 'visit us', 'find store', 'store locator'],
  openGraph: {
    title: 'Our Stores - Magic Show',
    description: 'Find our stores near you',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const StoresSection = dynamic(
  () => import("./_components/StoresSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true,
  }
);

function fallbackStoresBanner() {
  return {
    title: "WHERE TO FIND US",
    backgroundImage: "/images/img04.jpg",
    leftBadge: null,
    rightBadge: null,
  };
}

/** Uses passed-in axios (no cookies inside cache). */
async function getStoresBannerWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/stores/banner");
    if (data?.success && data?.data) return data.data;
    return fallbackStoresBanner();
  } catch (error) {
    console.error("Error fetching stores banner:", error);
    return fallbackStoresBanner();
  }
}

/** Uses passed-in axios (no cookies inside cache). */
async function getStoresWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/stores");
    if (data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}

export default async function StoresPage() {
  const lang = await getLanguage();
  const serverAxios = await createServerAxios();

  const [storesBanner, stores] = await Promise.all([
    cachedServerApi(["stores", "banner", lang], () => getStoresBannerWithAxios(serverAxios), CACHE_REVALIDATE, ["stores"]),
    cachedServerApi(["stores", "list", lang], () => getStoresWithAxios(serverAxios), CACHE_REVALIDATE, ["stores"]),
  ]);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
          <StoresSection storesBanner={storesBanner} stores={stores} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

