import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLanguage } from "../../../lib/getLanguage";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import { t } from "../../../locales/i18n/getTranslation";
import { createServerAxios } from "../../../api/config/serverAxios";
import { cachedServerApi } from "../../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../../lib/cacheConfig";
import { getProductDetailsWithAxios } from "../../../lib/productApi";

// Generate metadata for product pages
export async function generateMetadata({ params }) {
  const resolved = await params;
  const { id } = resolved || {};
  return {
    title: `Product ${id || ""} - Magic Show`,
    description: `View details and purchase information for product ${id || ""} at Magic Show. Discover premium shoes and accessories.`,
    keywords: ["product", "shop", "shoes", "accessories", "online shopping"],
    openGraph: {
      title: `Product ${id || ""} - Magic Show`,
      description: "View product details",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

// Lazy load ProductDetailSection with dynamic import
const ProductDetailSection = dynamic(
  () => import("./_components/ProductDetailSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true,
  }
);

const SecondarySections = dynamic(() => import("./_components/SecondarySections"), {
  ssr: true,
});

export default async function ProductPage({ params }) {
  const lang = await getLanguage();
  const resolvedParams = await params;
  const productId = resolvedParams?.id ? String(resolvedParams.id) : null;

  if (!productId) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            {t(lang, "invalid_product_id")}
          </p>
          <a
            href="/shop"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            {t(lang, "back_to_shop")}
          </a>
        </div>
      </div>
    );
  }

  const serverAxios = await createServerAxios();
  const productDetails = await cachedServerApi(
    ["shop", "product", productId, lang],
    () => getProductDetailsWithAxios(serverAxios, productId),
    CACHE_REVALIDATE,
    ["shop", "product"]
  );

  if (!productDetails) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{t(lang, "invalid_product_id")}</p>
          <a
            href="/shop"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            {t(lang, "back_to_shop")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
          <ProductDetailSection productDetails={productDetails} productId={productId} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <SecondarySections productId={productId} lang={lang} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
