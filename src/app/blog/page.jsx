import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";
import { getLanguage } from "../../lib/getLanguage";
import { createServerAxios } from "../../api/config/serverAxios";
import { cachedServerApi } from "../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../lib/cacheConfig";

export const metadata = {
  title: 'Blog - Magic Show',
  description: 'Read the latest fashion trends, styling tips and news from Magic Show. Discover inspiration for your wardrobe.',
  keywords: ['blog', 'fashion', 'trends', 'styling tips', 'fashion news', 'wardrobe inspiration'],
  openGraph: {
    title: 'Blog - Magic Show',
    description: 'Read the latest fashion trends and styling tips',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const BlogSection = dynamic(
  () => import("./_components/BlogSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true,
  }
);

/** Uses passed-in axios (no cookies inside cache). */
async function getBlogBannerWithAxios(serverAxios) {
  try {
    const { data } = await serverAxios.get("/blog/banner");
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        title: d.title ?? "BLOGS",
        subtitle: d.subtitle ?? "",
        backgroundImage: d.backgroundImage ?? "/images/img31.jpg",
        leftBadge: d.leftBadge ?? null,
        rightBadge: d.rightBadge ?? null,
      };
    }
    return fallbackBanner();
  } catch (error) {
    console.error("Error fetching blog banner:", error);
    return fallbackBanner();
  }
}

function fallbackBanner() {
  return {
    title: "BLOGS",
    subtitle: "",
    backgroundImage: "/images/img31.jpg",
    leftBadge: null,
    rightBadge: null,
  };
}

/** Uses passed-in axios (no cookies inside cache). */
async function getBlogPostsWithAxios(serverAxios, page = 1) {
  try {
    const { data } = await serverAxios.get(`/blog/posts?page=${page}`);
    if (data?.success && data?.data) {
      const items = data.data?.items ?? [];
      const pagination = data?.meta?.pagination ?? {};
      return {
        posts: Array.isArray(items) ? items : [],
        currentPage: pagination.currentPage ?? page,
        totalPages: pagination.totalPages ?? 1,
      };
    }
    return { posts: [], currentPage: page, totalPages: 1 };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], currentPage: page, totalPages: 1 };
  }
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const lang = await getLanguage();
  const currentPage = parseInt(params?.page || "1", 10);
  const serverAxios = await createServerAxios();

  const [blogData, blogBanner] = await Promise.all([
    cachedServerApi(
      ["blog", "posts", String(currentPage), lang],
      () => getBlogPostsWithAxios(serverAxios, currentPage),
      CACHE_REVALIDATE,
      ["blog"]
    ),
    cachedServerApi(
      ["blog", "banner", lang],
      () => getBlogBannerWithAxios(serverAxios),
      CACHE_REVALIDATE,
      ["blog"]
    ),
  ]);

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
          <BlogSection
            blogPosts={blogData.posts}
            blogBanner={blogBanner}
            currentPage={blogData.currentPage}
            totalPages={blogData.totalPages}
            className="overflow-hidden"
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
