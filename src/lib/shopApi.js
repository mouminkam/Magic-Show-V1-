export async function getShopBannerWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/shop/banner");
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        title: d.title ?? "SHOP",
        subtitle: d.subtitle ?? null,
        backgroundImage: d.backgroundImage ?? "/images/img04.jpg",
        leftBadge: d.leftBadge ?? null,
        rightBadge: d.rightBadge ?? null,
      };
    }
    return fallbackBanner();
  } catch (error) {
    console.error("Error fetching shop banner:", error);
    return fallbackBanner();
  }
}

function fallbackBanner() {
  return {
    title: "SHOP",
    subtitle: null,
    backgroundImage: "/images/img04.jpg",
    leftBadge: "SALE 50%",
    rightBadge: "TRENDS 2024",
  };
}

export async function getShopProductsWithAxios(serverAxios, searchParams = {}) {
  try {
    const params = new URLSearchParams();
    const page = Math.max(1, parseInt(searchParams?.page || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams?.limit || "6", 10)));
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (searchParams?.category) params.append("category", searchParams.category);
    if (searchParams?.size) params.append("size", searchParams.size);
    if (searchParams?.color) params.append("color", searchParams.color);
    if (searchParams?.season) params.append("season", searchParams.season);
    if (searchParams?.minPrice) params.append("minPrice", String(searchParams.minPrice));
    if (searchParams?.maxPrice) params.append("maxPrice", String(searchParams.maxPrice));

    const { data } = await serverAxios.get(`/shop/products?${params.toString()}`);
    if (data?.success && data?.data !== undefined) {
      const products = Array.isArray(data.data) ? data.data : [];
      const pagination = data?.meta?.pagination ?? {};
      return {
        products,
        pagination: {
          currentPage: pagination.currentPage ?? page,
          limit: pagination.limit ?? limit,
          totalItems: pagination.totalItems ?? products.length,
          totalPages: pagination.totalPages ?? 1,
        },
      };
    }

    return { products: [], pagination: { currentPage: page, limit, totalItems: 0, totalPages: 1 } };
  } catch (error) {
    console.error("Error fetching shop products:", error);
    return { products: [], pagination: { currentPage: 1, limit: 6, totalItems: 0, totalPages: 1 } };
  }
}

export async function getShopCategoriesWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/shop/categories");
    if (data?.success && Array.isArray(data?.data)) {
      return data.data;
    }
    return ["All"];
  } catch (error) {
    console.error("Error fetching shop categories:", error);
    return ["All"];
  }
}

export async function getShopFiltersWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/shop/filters");
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        sizes: d.sizes ?? ["36", "37", "38", "39", "40", "41"],
        colors: Array.isArray(d.colors) ? d.colors : [],
        seasons: d.seasons ?? ["Summer", "Spring", "Autumn", "Winter"],
        priceRange: d.priceRange ?? { min: 0, max: 1000 },
      };
    }
  } catch (error) {
    console.error("Error fetching shop filters:", error);
  }

  return {
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: [],
    seasons: ["Summer", "Spring", "Autumn", "Winter"],
    priceRange: { min: 0, max: 1000 },
  };
}
