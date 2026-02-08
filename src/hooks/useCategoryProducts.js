import { useState, useEffect, useCallback } from "react";
import api from "../api";
import useToastStore from "../store/toastStore";
import { getLanguageClient } from "../lib/getLanguageClient";
import { t } from "../locales/i18n/getTranslation";
import { useApiCache } from "./useApiCache";

/**
 * Hook to fetch and filter category products
 * @param {Object} filters - Filter options
 * @returns {Object} Products data, loading state, error, and filter functions
 */
export function useCategoryProducts(filters = {}) {
  const { error: toastError } = useToastStore();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    category = "All",
    size = "",
    color = "",
    season = "",
    priceRange = { min: 0, max: 1000 },
    page = 1,
    limit = 12,
  } = filters;

  // Use API cache with 5 minutes TTL
  const fetchFunction = useCallback(async () => {
    const params = {
      page,
      limit,
    };

    if (category !== "All") {
      params.category = category;
    }
    if (size) {
      params.size = size;
    }
    if (color) {
      params.color = color;
    }
    if (season) {
      params.season = season;
    }
    if (priceRange.min !== undefined) {
      params.minPrice = priceRange.min;
    }
    if (priceRange.max !== undefined) {
      params.maxPrice = priceRange.max;
    }

    // TODO: Replace with actual API call when backend is ready
    // const response = await api.products.getByCategory(category, params);
    // return response.data || response;
    
    // For now, return empty array
    return [];
  }, [category, size, color, season, priceRange, page, limit]);

  const { data: products, isLoading, error: apiError, refetch } = useApiCache(
    fetchFunction,
    { cacheTime: 5 * 60 * 1000 } // 5 minutes cache
  );

  // Show error toast if API error occurs
  useEffect(() => {
    if (apiError) {
      const lang = getLanguageClient();
      const errorMessage = apiError?.message || t(lang, "failed_to_load_products");
      toastError(errorMessage);
    }
  }, [apiError, toastError]);

  // Apply client-side filters
  useEffect(() => {
    if (!products) {
      setFilteredProducts([]);
      return;
    }
    
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter((product) =>
        product.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    if (size) {
      filtered = filtered.filter((product) =>
        product.sizes?.includes(size)
      );
    }

    if (color) {
      filtered = filtered.filter(
        (product) =>
          product.colors?.includes(color) ||
          product.color?.toLowerCase() === color.toLowerCase()
      );
    }

    if (season) {
      filtered = filtered.filter(
        (product) =>
          product.seasons?.includes(season) ||
          product.season?.toLowerCase() === season.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, category, size, color, season, priceRange]);

  return {
    products: products || [],
    filteredProducts,
    isLoading,
    error: apiError,
    refetch,
  };
}


