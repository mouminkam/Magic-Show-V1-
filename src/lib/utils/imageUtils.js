/**
 * Get backend origin for image URLs (storage paths).
 * Uses NEXT_PUBLIC_BACKEND_ORIGIN if set, otherwise derives from API URL.
 * For production with HTTPS: set NEXT_PUBLIC_BACKEND_ORIGIN=https://magicshow.pl-sites.com
 * to avoid mixed content (page on https, images on http).
 */
function getBackendOrigin() {
  const explicit = process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  if (!base) return "";
  try {
    return new URL(base).origin;
  } catch {
    return base.replace(/\/api(\/.*)?$/, "").trim() || base;
  }
}

/**
 * Resolve product/image URL from API. Paths like /storage/... must be loaded from backend origin.
 * @param {string} src - Image source (can be full URL, or relative path from API like /storage/...)
 * @returns {string} URL to use for img/Image
 */
export function getProductImageUrl(src) {
  if (!src || typeof src !== "string") return "";
  const trimmed = src.trim();
  if (!trimmed) return "";

  // Already full URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Frontend public path - use as is
  if (trimmed.startsWith("/images/")) {
    return trimmed;
  }

  // API storage path (e.g. /storage/products/...) - prepend backend origin
  if (trimmed.startsWith("/")) {
    const origin = getBackendOrigin();
    return origin ? `${origin}${trimmed}` : trimmed;
  }

  return trimmed;
}

/**
 * Get optimized image URL
 * @param {string} src - Image source
 * @param {Object} options - Image options
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(src, options = {}) {
  const { width = 800, height, quality = 75 } = options;

  if (!src) return "/images/placeholder.jpg";

  // If it's an external URL, return as is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // For Next.js Image optimization, return the src
  // Next.js will handle optimization automatically
  return src;
}

/**
 * Get image placeholder
 * @returns {string} Placeholder image URL
 */
export function getImagePlaceholder() {
  return "/images/placeholder.jpg";
}



