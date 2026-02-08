import { useState, useCallback, useRef } from "react";

/**
 * Simple in-memory cache for API responses
 */
class ApiCache {
  constructor(defaultTTL = 5 * 60 * 1000) {
    // 5 minutes default TTL
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  /**
   * Get cached data
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if expired/not found
   */
  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cache data
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Delete cache entry
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Check if key exists and is valid
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

// Singleton instance for shared cache across all components
const apiCache = new ApiCache();

/**
 * Hook for API caching
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {Object} options - Cache options
 * @returns {Object} - { data, isLoading, error, refetch }
 */
export function useApiCache(fetchFunction, options = {}) {
  const { cacheTime = 5 * 60 * 1000, enabled = true } = options; // 5 minutes default
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!enabled) return;

      const cacheKey = JSON.stringify(fetchFunction.toString());

      // Check cache using shared ApiCache instance
      if (!forceRefresh && apiCache.has(cacheKey)) {
        const cachedData = apiCache.get(cacheKey);
        setData(cachedData);
        return cachedData;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFunction(abortControllerRef.current.signal);

        // Update cache using shared ApiCache instance
        apiCache.set(cacheKey, result, cacheTime);

        setData(result);
        return result;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          throw err;
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [fetchFunction, cacheTime, enabled]
  );

  const clearCache = useCallback(() => {
    const cacheKey = JSON.stringify(fetchFunction.toString());
    apiCache.delete(cacheKey);
  }, [fetchFunction]);

  return {
    data,
    isLoading,
    error,
    refetch: () => fetchData(true),
    fetch: fetchData,
    clearCache,
  };
}

// Export ApiCache class for direct use if needed
export { ApiCache };

// Export the singleton instance for advanced use cases
export default apiCache;
