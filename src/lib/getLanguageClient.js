/**
 * Client-side utility to get language from cookies
 * This function should only be called from client components
 * @returns {string} Language code ('ar' or 'en')
 */
export function getLanguageClient() {
  if (typeof window === "undefined") {
    // Server-side fallback (should not happen, but safe guard)
    return "ar";
  }
  
  try {
    // Import Cookies dynamically only on client-side
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Cookies = require("js-cookie");
    const language = Cookies.get("language");
    return (language === "ar" || language === "en") ? language : "ar";
  } catch (error) {
    // Fallback to default language
    return "ar";
  }
}

