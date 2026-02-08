import { create } from "zustand";
import api from "../api";

/**
 * Wishlist store - requires authenticated user.
 * Product IDs in wishlist are synced with backend.
 */
const useWishlistStore = create((set, get) => ({
  items: [],
  productIds: new Set(),
  isLoading: false,
  error: null,

  fetchWishlist: async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    if (!token) {
      set({ items: [], productIds: new Set() });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const res = await api.wishlist.getAll();
      const items = res?.data?.items ?? res?.items ?? [];
      const ids = new Set(items.map((i) => i.productId ?? i.product_id ?? i.id));
      set({ items, productIds: ids, isLoading: false });
    } catch (err) {
      set({
        items: [],
        productIds: new Set(),
        isLoading: false,
        error: err?.response?.data?.error?.message || "Failed to load wishlist",
      });
    }
  },

  addToWishlist: async (productId) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    if (!token) return { success: false, loginRequired: true };
    set({ isLoading: true, error: null });
    try {
      await api.wishlist.add(productId);
      const ids = new Set(get().productIds);
      ids.add(parseInt(productId, 10));
      const items = [...get().items];
      set({ productIds: ids, isLoading: false });
      return { success: true };
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message || "Failed to add to wishlist";
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  removeFromWishlist: async (productId) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    if (!token) return { success: false };
    set({ isLoading: true, error: null });
    try {
      await api.wishlist.remove(productId);
      const ids = new Set(get().productIds);
      ids.delete(parseInt(productId, 10));
      const items = get().items.filter(
        (i) => (i.productId ?? i.product_id) !== parseInt(productId, 10)
      );
      set({ productIds: ids, items, isLoading: false });
      return { success: true };
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message || "Failed to remove from wishlist";
      set({ isLoading: false, error: msg });
      return { success: false, error: msg };
    }
  },

  toggleWishlist: async (productId) => {
    const ids = get().productIds;
    const inList = ids.has(parseInt(productId, 10));
    if (inList) {
      return get().removeFromWishlist(productId);
    }
    return get().addToWishlist(productId);
  },

  isInWishlist: (productId) => {
    return get().productIds.has(parseInt(productId, 10));
  },

  setItems: (items) => {
    const ids = new Set(items.map((i) => i.productId ?? i.product_id ?? i.id));
    set({ items, productIds: ids });
  },

  clear: () => set({ items: [], productIds: new Set(), error: null }),

  itemCount: () => get().productIds.size,
}));

export default useWishlistStore;
