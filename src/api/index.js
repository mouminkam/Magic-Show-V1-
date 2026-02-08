import axiosInstance from "./config/axios";

const api = {
  // Products API
  products: {
    getAll: async (params = {}) => {
      const response = await axiosInstance.get("/products", { params });
      return response.data;
    },
    getById: async (id) => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    },
    getByCategory: async (category, params = {}) => {
      const response = await axiosInstance.get(`/products/category/${category}`, { params });
      return response.data;
    },
  },

  // Auth API
  auth: {
    login: async (credentials) => {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data;
    },
    register: async (userData) => {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    },
    logout: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    },
    getCurrentUser: async () => {
      const response = await axiosInstance.get("/auth/user");
      return response.data;
    },
    forgotPassword: async (data) => {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      return response.data;
    },
    resetPassword: async (data) => {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data;
    },
    updateProfile: async (data) => {
      const response = await axiosInstance.put("/auth/profile", data);
      return response.data;
    },
  },

  // Cart API
  cart: {
    getCart: async () => {
      const response = await axiosInstance.get("/cart");
      return response.data;
    },
    addToCart: async (productId, quantity, options = {}) => {
      const response = await axiosInstance.post("/cart", {
        product_id: productId,
        quantity,
        size: options.size ?? null,
        color: options.color ?? null,
      });
      return response.data;
    },
    updateCartItem: async (itemId, quantity) => {
      const response = await axiosInstance.put(`/cart/${itemId}`, { quantity });
      return response.data;
    },
    removeFromCart: async (itemId) => {
      const response = await axiosInstance.delete(`/cart/${itemId}`);
      return response.data;
    },
    clearCart: async () => {
      const response = await axiosInstance.delete("/cart");
      return response.data;
    },
    validateCoupon: async (data) => {
      const payload = { coupon_code: data.code ?? data.coupon_code };
      const response = await axiosInstance.post("/cart/validate-coupon", payload);
      return response.data;
    },
    checkout: async (data) => {
      const response = await axiosInstance.post("/cart/checkout", data);
      return response.data;
    },
  },

  // Wishlist API (requires auth)
  wishlist: {
    getAll: async () => {
      const response = await axiosInstance.get("/wishlist");
      return response.data;
    },
    add: async (productId) => {
      const response = await axiosInstance.post("/wishlist", { product_id: productId });
      return response.data;
    },
    remove: async (productId) => {
      const response = await axiosInstance.delete(`/wishlist/${productId}`);
      return response.data;
    },
    check: async (productIds) => {
      const response = await axiosInstance.get("/wishlist/check", {
        params: { product_ids: productIds },
      });
      return response.data;
    },
  },

  // Newsletter API
  newsletter: {
    subscribe: async (data) => {
      const response = await axiosInstance.post("/newsletter/subscribe", data);
      return response.data;
    },
    unsubscribe: async (data) => {
      const response = await axiosInstance.post("/newsletter/unsubscribe", data);
      return response.data;
    },
  },

  // Orders API
  orders: {
    getAll: async (params = {}) => {
      const response = await axiosInstance.get("/orders", { params });
      return response.data;
    },
    getById: async (orderId) => {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    },
    create: async (orderData) => {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    },
  },
};

export default api;


