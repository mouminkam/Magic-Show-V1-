import axios from "axios";
import { getLanguageClient } from "../../lib/getLanguageClient";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Accept-Language header from cookies (client-side only)
    if (typeof window !== "undefined") {
      const language = getLanguageClient();
      config.headers["Accept-Language"] = language;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


