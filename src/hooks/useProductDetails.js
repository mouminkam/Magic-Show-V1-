import { useCallback, useEffect } from "react";
import api from "../api";
import useToastStore from "../store/toastStore";
import { getLanguageClient } from "../lib/getLanguageClient";
import { t } from "../locales/i18n/getTranslation";
import { useApiCache } from "./useApiCache";

/**
 * Hook to fetch product details
 * @param {string} productId - Product ID
 * @returns {Object} Product data, loading state, error, and refetch function
 */
export function useProductDetails(productId) {
  const { error: toastError } = useToastStore();

  const fetchFunction = useCallback(async () => {
    if (!productId) {
      const lang = getLanguageClient();
      throw new Error(t(lang, "product_id_required"));
    }
    
    // TODO: Replace with actual API call when backend is ready
    // const response = await api.products.getById(productId);
    // return response.data || response;
    
    // For now, return null
    return null;
  }, [productId]);

  const { data: product, isLoading, error: apiError, refetch } = useApiCache(
    fetchFunction,
    { 
      cacheTime: 10 * 60 * 1000, // 10 minutes for product details
      enabled: !!productId 
    }
  );

  // Show error toast if API error occurs
  useEffect(() => {
    if (apiError) {
      const lang = getLanguageClient();
      const errorMessage = apiError?.message || t(lang, "failed_to_load_product");
      toastError(errorMessage);
    }
  }, [apiError, toastError]);

  return {
    product,
    isLoading,
    error: apiError,
    refetch,
  };
}


