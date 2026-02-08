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

export default new ApiCache();


