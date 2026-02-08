import { cookies } from 'next/headers';

/**
 * Server-side utility to get language from cookies
 * This function should only be called from Server Components
 * @returns {Promise<string>} Language code ('ar' or 'en')
 */
export async function getLanguage() {
  try {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value;
    
    // Validate language value and return with fallback
    return (language === 'ar' || language === 'en') ? language : 'ar';
  } catch (error) {
    // Fallback to default if cookies are not available
    return 'ar';
  }
}


