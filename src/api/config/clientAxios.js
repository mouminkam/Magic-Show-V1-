import axios from "axios";
import { getLanguageClient } from "../../lib/getLanguageClient";

// Create axios instance with same config as main API
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor - same as main API
axiosInstance.interceptors.request.use(
  (config) => {
    // Debug logging
    console.log(`[ClientAxios] Making request to: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add Accept-Language header
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

// Response interceptor - same as main API
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Debug logging
    console.error(`[ClientAxios] Request failed:`, {
      url: error.config?.baseURL + error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      isNetworkError: !error.response,
    });
    
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

/**
 * Create axios instance for Client Components
 * Uses the same configuration as the main API client with authentication and language headers
 * @returns {AxiosInstance} Configured axios instance
 */
export function createClientAxios() {
  return axiosInstance;
}
