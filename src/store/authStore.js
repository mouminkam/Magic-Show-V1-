import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth-user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("auth-token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("auth-token") : false,

  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("auth-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("auth-user");
      }
    }
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth-token", token);
      } else {
        localStorage.removeItem("auth-token");
      }
    }
    set({
      token,
      isAuthenticated: !!token,
    });
  },

  login: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-user", JSON.stringify(user));
      localStorage.setItem("auth-token", token);
    }
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-user");
      localStorage.removeItem("auth-token");
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;

