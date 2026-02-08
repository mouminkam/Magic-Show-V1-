import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/stores`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // TODO: Add dynamic pages when backend is ready
  // Example for products:
  // const products = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`).then(r => r.json());
  // const productPages = products.map((product) => ({
  //   url: `${baseUrl}/shop/${product.id}`,
  //   lastModified: new Date(product.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));

  // Example for blog posts:
  // const posts = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`).then(r => r.json());
  // const blogPages = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.id}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  return [
    ...staticPages,
    // ...productPages,
    // ...blogPages,
  ];
}
