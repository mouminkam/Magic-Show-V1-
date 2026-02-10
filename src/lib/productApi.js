/** Transform API ProductResource to ProductSection format.
 * Backend returns images with featured_image first, then productImages (primary first).
 * We ensure featured_image is always first when it exists.
 */
export function transformProductForDetail(raw) {
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
    sizes: Array.isArray(raw.sizes)
      ? [...new Set(raw.sizes.map(String))]
      : ["s", "m", "l", "xl"],
    colors: Array.isArray(raw.colors)
      ? [...new Set(raw.colors.map(String))]
      : ["default"],
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
export async function getProductDetailsWithAxios(serverAxios, productId) {
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
export async function getRelatedProductsWithAxios(serverAxios, productId) {
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
