import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
          '/profile/',
          '/api/',
          '/shoping-cart/',
        ],
      },
      // Allow all for Google bot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
          '/profile/',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
