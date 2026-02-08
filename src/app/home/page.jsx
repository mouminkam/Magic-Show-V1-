import { Suspense } from "react";
import { getLanguage } from "../../lib/getLanguage";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { createServerAxios } from "../../api/config/serverAxios";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";
import HomeBanner from "./_components/HomeBanner";
import FeaturedCategories from "./_components/FeaturedCategories";
import SecondarySections from "./_components/SecondarySections";
import {
  getHeroWithAxios,
  getFeaturedCategoriesWithAxios,
  getNewArrivalsWithAxios,
  getBestSellersWithAxios,
  getFeaturedProductsWithAxios,
  getLatestBlogWithAxios,
  getWhyChooseUsWithAxios,
  getCustomerReviewsWithAxios,
  getNewsletterWithAxios,
} from "../../lib/homeApi";

export const metadata = {
  title: "Home - Magic Show",
  description:
    "Discover premium shoes and accessories at Magic Show. Browse our latest collection of elegant footwear and fashion accessories.",
  keywords: ["home", "shoes", "fashion", "accessories", "footwear", "online shopping"],
  openGraph: {
    title: "Home - Magic Show",
    description: "Premium shoes and accessories",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function HomePage() {
  const lang = await getLanguage();
  const serverAxios = await createServerAxios();

  const heroPromise = cachedServerApi(
    ["home", "hero", lang],
    () => getHeroWithAxios(serverAxios),
    CACHE_REVALIDATE,
    ["home"]
  );

  const featuredCategoriesPromise = cachedServerApi(
    ["home", "featured-categories", lang],
    () => getFeaturedCategoriesWithAxios(serverAxios),
    CACHE_REVALIDATE,
    ["home"]
  );

  const [heroData, featuredCategories] = await Promise.all([
    heroPromise,
    featuredCategoriesPromise,
  ]);

  const secondaryPromises = {
    newArrivals: cachedServerApi(
      ["home", "new-arrivals", lang],
      () => getNewArrivalsWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    bestSellers: cachedServerApi(
      ["home", "best-sellers", lang],
      () => getBestSellersWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    featuredProductsData: cachedServerApi(
      ["home", "featured-products", lang],
      () => getFeaturedProductsWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    latestBlogData: cachedServerApi(
      ["home", "latest-blog", lang],
      () => getLatestBlogWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    whyChooseUs: cachedServerApi(
      ["home", "why-choose-us", lang],
      () => getWhyChooseUsWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    customerReviews: cachedServerApi(
      ["home", "customer-reviews", lang],
      () => getCustomerReviewsWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
    newsletterData: cachedServerApi(
      ["home", "newsletter", lang],
      () => getNewsletterWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["home"]
    ),
  };

  return (
    <div className="bg-white min-h-screen">
      <HomeBanner heroData={heroData} />
      <FeaturedCategories categories={featuredCategories ?? []} />

      <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
        <SecondarySections promises={secondaryPromises} />
      </Suspense>
    </div>
  );
}

