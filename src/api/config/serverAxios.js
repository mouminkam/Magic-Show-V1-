import axios from "axios";
import { cookies } from "next/headers";

/**
 * Create axios instance for Server Components
 * Automatically injects Accept-Language header from cookies
 * @returns {Promise<AxiosInstance>} Configured axios instance
 */
export async function createServerAxios() {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "ar";

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Accept-Language": language,
    },
  });
}

