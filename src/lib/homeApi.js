/**
 * Home API service functions (Server usage)
 * Centralizes all home-related fetchers that previously lived in `app/home/page.jsx`.
 */

/** Uses passed-in axios. Extracts data from API response { success, data }. */
export async function getHeroWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/hero");
    if (data?.success && data?.data) return data.data;
    return fallbackHero();
  } catch (error) {
    console.error("Error fetching home hero:", error);
    return fallbackHero();
  }
}

export function fallbackHero() {
  return {
    badge: "EST. 2024",
    title: "ELEGANT",
    subtitle: "JEWELRY",
    description: "Crafted with precision. Timeless designs. Quality that lasts generations.",
    ctaPrimary: "Shop Now",
    ctaPrimaryLink: "/shop",
    ctaSecondary: "View Collection",
    ctaSecondaryLink: "/shop",
    heroImage: "/images/img27.png",
    image: "/images/img27.png",
    stats: [
      { value: "100+", label: "Designs" },
      { value: "100%", label: "Quality Guaranteed" },
    ],
    socialLinks: [],
  };
}

/** Uses passed-in axios. */
export async function getAboutUsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/about-us");
    if (data?.success && data?.data) return data.data;
    return fallbackAboutUs();
  } catch (error) {
    console.error("Error fetching home about-us:", error);
    return fallbackAboutUs();
  }
}

export function fallbackAboutUs() {
  return {
    title: "ABOUT US",
    backgroundImage: "/images/img04.jpg",
    leftBadge: "SALE OF 50%",
    rightBadge: "TRENDS FOR 2024",
  };
}

/** Uses passed-in axios. */
export async function getFeaturedCategoriesWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/featured-categories");
    if (data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching featured categories:", error);
    return [];
  }
}

/** Uses passed-in axios. */
export async function getNewArrivalsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/new-arrivals");
    if (data?.success && data?.data) return data.data;
    return fallbackNewArrivals();
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return fallbackNewArrivals();
  }
}

export function fallbackNewArrivals() {
  return {
    header: {
      title: "New Arrivals",
      subtitle: "Latest Collection",
      description: "Be the first to discover our newest arrivals",
      buttonText: "View All",
      buttonLink: "/shop?sort=newest",
    },
    products: [],
  };
}

/** Uses passed-in axios. */
export async function getBestSellersWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/best-sellers");
    if (data?.success && data?.data) return data.data;
    return fallbackBestSellers();
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return fallbackBestSellers();
  }
}

export function fallbackBestSellers() {
  return {
    header: {
      title: "Best Sellers",
      subtitle: "Most Popular",
      description: "Our customers' favorite picks",
      buttonText: "View All",
      buttonLink: "/shop?sort=bestseller",
    },
    products: [],
  };
}

/** Uses passed-in axios. */
export async function getFeaturedProductsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/featured-products");
    if (data?.success && data?.data) return data.data;
    return fallbackFeaturedProducts();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return fallbackFeaturedProducts();
  }
}

export function fallbackFeaturedProducts() {
  return {
    featuredHeader: {
      title: "FEATURED PRODUCTS",
      subtitle: "MAGIC SHOE STILETTO",
      description: "Browse our featured products",
      buttonText: "See more",
      buttonLink: "/shop?featured=true",
    },
    onSaleHeader: {
      title: "ON SALE",
      subtitle: "SAVE UP TO 30%",
      description: "",
      buttonText: "See more",
      buttonLink: "/shop?onSale=true",
    },
    featuredProducts: [],
    onSaleProducts: [],
  };
}

/** Uses passed-in axios. */
export async function getBlogSectionWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/blog-section");
    if (data?.success && data?.data) return data.data;
    return fallbackBlogSection();
  } catch (error) {
    console.error("Error fetching blog section:", error);
    return fallbackBlogSection();
  }
}

export function fallbackBlogSection() {
  return {
    backgroundImage: "/images/img31.jpg",
    title: "BLOGS",
    leftBadge: "SALE OF 50%",
    rightBadge: "TRENDS FOR 2024",
  };
}

/** Uses passed-in axios. */
export async function getLatestBlogWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/latest-blog");
    if (data?.success && data?.data) return data.data;
    return fallbackLatestBlog();
  } catch (error) {
    console.error("Error fetching latest blog:", error);
    return fallbackLatestBlog();
  }
}

export function fallbackLatestBlog() {
  return {
    title: "Latest Blog",
    description: "There are many variations of passages of Lorem Ipsum available.",
    posts: [],
  };
}

/** Uses passed-in axios. */
export async function getWhyChooseUsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/why-choose-us");
    if (data?.success && data?.data) {
      const d = data.data;
      return d?.features ?? [];
    }
    return fallbackWhyChooseUs();
  } catch (error) {
    console.error("Error fetching why choose us:", error);
    return fallbackWhyChooseUs();
  }
}

export function fallbackWhyChooseUs() {
  return [
    { icon: "Truck", title: "Free Shipping", description: "Free shipping on orders over $100" },
    { icon: "Shield", title: "Quality Guaranteed", description: "100% authentic products with warranty" },
    { icon: "RotateCcw", title: "Easy Returns", description: "30-day return policy, hassle-free" },
    { icon: "HeadphonesIcon", title: "24/7 Support", description: "Round-the-clock customer service" },
  ];
}

/** Uses passed-in axios. */
export async function getCustomerReviewsWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/customer-reviews");
    if (data?.success && Array.isArray(data?.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching customer reviews:", error);
    return [];
  }
}

/** Uses passed-in axios. Returns header for Newsletter: { title, description }. */
export async function getNewsletterWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/home/newsletter");
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        title: d.title ?? "Newsletter",
        description: d.subtitle ?? "Subscribe for offers",
      };
    }
    return { title: "Newsletter", description: "Subscribe for offers" };
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return { title: "Newsletter", description: "Subscribe for offers" };
  }
}
