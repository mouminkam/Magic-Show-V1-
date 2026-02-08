import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLanguage } from "../../../lib/getLanguage";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import { t } from "../../../locales/i18n/getTranslation";
import { createServerAxios } from "../../../api/config/serverAxios";
import { cachedServerApi } from "../../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../../lib/cacheConfig";

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

/** Transform API ProductResource to ProductSection format.
 * Backend returns images with featured_image first, then productImages (primary first).
 * We ensure featured_image is always first when it exists.
 */
function transformProductForDetail(raw) {
  if (!raw) return null;
  const toUrl = (i) => (typeof i === "string" ? i : i?.url);
  const galleryUrls = (raw.images || []).map(toUrl).filter(Boolean);
  const featuredUrl = raw.featured_image || null;

  let images;
  if (featuredUrl) {
    images = [featuredUrl, ...galleryUrls.filter((u) => u !== featuredUrl)];
  } else if (galleryUrls.length) {
    images = galleryUrls;
  } else {
    images = ["/images/img20.jpg"];
  }
  const price = parseFloat(raw.price) || 0;
  const salePrice = raw.sale_price ? parseFloat(raw.sale_price) : null;
  const discount =
    salePrice && price > 0 ? Math.round(((price - salePrice) / price) * 100) : null;
  return {
    id: raw.id,
    name: raw.name ?? "",
    description: raw.description ?? "",
    price: salePrice ?? price,
    originalPrice: salePrice ? price : null,
    discount: discount,
    code: raw.sku ?? "",
    images,
    sizes: Array.isArray(raw.sizes) ? [...new Set(raw.sizes.map(String))] : ["s", "m", "l", "xl"],
    colors: Array.isArray(raw.colors) ? [...new Set(raw.colors.map(String))] : ["default"],
    descriptionText: raw.description ?? raw.short_description ?? "",
    rating: 4,
    bannerData: {
      title: raw.name ?? "Product Detail",
      backgroundImage: images[0] ?? "/images/img04.jpg",
      leftBadge: discount ? `SALE ${discount}%` : null,
      rightBadge: "TRENDS 2024",
    },
  };
}

/** Uses passed-in axios. */
async function getProductDetailsWithAxios(serverAxios, productId) {
  try {
    const { data } = await serverAxios.get(`/products/${productId}`);
    if (data?.success && data?.data) {
      return transformProductForDetail(data.data);
    }
    return null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

/** Uses passed-in axios. Returns array with likes=0 for each. */
async function getRelatedProductsWithAxios(serverAxios, productId) {
  try {
    const { data } = await serverAxios.get(`/shop/products/${productId}/related`);
    if (data?.success && Array.isArray(data?.data)) {
      return data.data.map((p) => ({
        id: p.id,
        name: p.name ?? "",
        price: parseFloat(p.price) ?? 0,
        image: p.image ?? "/images/img04.jpg",
        likes: 0,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

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
  const [productDetails, relatedProducts] = await Promise.all([
    cachedServerApi(
      ["shop", "product", productId, lang],
      () => getProductDetailsWithAxios(serverAxios, productId),
      CACHE_REVALIDATE,
      ["shop", "product"]
    ),
    cachedServerApi(
      ["shop", "related", productId, lang],
      () => getRelatedProductsWithAxios(serverAxios, productId),
      CACHE_REVALIDATE,
      ["shop", "product"]
    ),
  ]);

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
          <ProductDetailSection
            productDetails={productDetails}
            relatedProducts={relatedProducts}
            productId={productId}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
