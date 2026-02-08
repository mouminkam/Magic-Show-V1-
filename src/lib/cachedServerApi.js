import { unstable_cache } from "next/cache";
import { CACHE_ENABLED } from "./cacheConfig";

/**
 * Wraps an async server API call with Next.js Data Cache.
 * Use for Server Components that fetch from Laravel API via axios.
 * Cache key includes keyParts (e.g. ['about', 'hero', lang]) so different pages/locales don't share entries.
 * Tags enable on-demand revalidation via revalidateTag() when Backend invalidates.
 *
 * When CACHE_ENABLED is false (NEXT_PUBLIC_CACHE_ENABLED=false), bypasses cache and fetches fresh every request.
 *
 * @param {string[]} keyParts - Cache key parts (e.g. ['about', 'hero', lang])
 * @param {() => Promise<any>} fn - Async function that fetches data (no args; close over lang etc. in caller)
 * @param {number} [revalidate=60] - Seconds until revalidation (default 60)
 * @param {string[]} [tags] - Optional tags for on-demand revalidation (e.g. ['about', 'home'])
 * @returns {Promise<any>} Cached result of fn()
 */
export function cachedServerApi(keyParts, fn, revalidate = 1, tags = []) {
  if (!CACHE_ENABLED) {
    return fn();
  }
  const options = { revalidate };
  if (tags && tags.length > 0) {
    options.tags = tags;
  }
  const cachedFn = unstable_cache(fn, keyParts, options);
  return cachedFn();
}
