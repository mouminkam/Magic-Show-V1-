/**
 * Frontend cache revalidation config.
 *
 * IMPORTANT: We use cache on BOTH Backend (Laravel) and Frontend (Next.js).
 * - Backend: invalidates immediately when Admin updates content.
 * - Frontend: does NOT know about backend invalidation - it revalidates on a timer.
 *
 * When Admin updates Dashboard → Backend serves fresh data, but Frontend still
 * shows cached data until revalidate seconds pass. So shorter revalidate = faster
 * visibility of Admin changes on the public site.
 *
 * - Development: 15 seconds - see updates quickly after Dashboard changes.
 * - Production: 60 seconds - balance between freshness and performance.
 *
 * Override: Set NEXT_PUBLIC_CACHE_REVALIDATE=10 in .env for faster updates (e.g. 10s).
 *
 * Disable: Set NEXT_PUBLIC_CACHE_ENABLED=false to bypass frontend cache entirely
 * (fetches fresh from API every request - Backend cache still applies).
 */
const isDev = process.env.NODE_ENV === "development";
const envOverride = process.env.NEXT_PUBLIC_CACHE_REVALIDATE;

/** Seconds until Next.js revalidates cached API data. */
const parsed = envOverride !== undefined && envOverride !== "" ? parseInt(envOverride, 10) : NaN;
export const CACHE_REVALIDATE = Number.isFinite(parsed) ? parsed : (isDev ? 15 : 60);

/** When false, cachedServerApi bypasses Next.js cache and fetches fresh every request. */
export const CACHE_ENABLED = process.env.NEXT_PUBLIC_CACHE_ENABLED !== "false";
