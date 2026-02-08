import { useCallback } from "react";
import { getLanguageClient } from "../lib/getLanguageClient";
import useCartStore from "../store/cartStore";
import useToastStore from "../store/toastStore";
import { t } from "../locales/i18n/getTranslation";

/**
 * Hook to manage cart operations
 * @returns {Object} Cart state and operations
 */
export function useCart() {
  const {
    items,
    addItem: addItemToStore,
    removeItem: removeItemFromStore,
    updateQuantity: updateQuantityInStore,
    clearCart: clearCartInStore,
    getTotal,
    getItemCount,
    isOpen,
    toggleCart,
    openCart,
    closeCart,
  } = useCartStore();

  const { success: toastSuccess, error: toastError } = useToastStore();

  const addToCart = useCallback(
    (product, quantity = 1, options = {}) => {
      addItemToStore(product, quantity, options);
      const lang = getLanguageClient();
      toastSuccess(t(lang, "product_added_to_cart"));
    },
    [addItemToStore, toastSuccess]
  );

  const removeFromCart = useCallback(
    (itemId) => {
      removeItemFromStore(itemId);
      const lang = getLanguageClient();
      toastSuccess(t(lang, "product_removed_from_cart"));
    },
    [removeItemFromStore, toastSuccess]
  );

  const updateQuantity = useCallback(
    (itemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      updateQuantityInStore(itemId, quantity);
    },
    [updateQuantityInStore, removeFromCart]
  );

  const clearCart = useCallback(() => {
    clearCartInStore();
    const lang = getLanguageClient();
    toastSuccess(t(lang, "cart_cleared"));
  }, [clearCartInStore, toastSuccess]);

  return {
    items,
    total: getTotal(),
    itemCount: getItemCount(),
    isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
}


