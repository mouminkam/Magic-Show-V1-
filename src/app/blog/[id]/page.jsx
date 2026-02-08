import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getLanguage } from "../../../lib/getLanguage";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import { t } from "../../../locales/i18n/getTranslation";
import { createServerAxios } from "../../../api/config/serverAxios";
import { cachedServerApi } from "../../../lib/cachedServerApi";
import { CACHE_REVALIDATE } from "../../../lib/cacheConfig";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const lang = await getLanguage();
  try {
    const serverAxios = await createServerAxios();
    const { data } = await serverAxios.get(`/blog/posts/${id}`);
    if (data?.success && data?.data) {
      const postTitle = data.data.title || `Blog Post ${id}`;
      return {
        title: `${postTitle} - Magic Show`,
        description: data.data.excerpt || "Read our latest fashion trends, styling tips and news.",
        keywords: ['blog', 'fashion', 'trends', 'styling tips', 'fashion news'],
        openGraph: {
          title: `${postTitle} - Magic Show`,
          description: data.data.excerpt || "Read our blog post",
          type: 'article',
        },
        robots: { index: true, follow: true },
      };
    }
  } catch (_) {}
  return {
    title: `Blog Post ${id} - Magic Show`,
    description: "Read our latest fashion trends, styling tips and news.",
    robots: { index: true, follow: true },
  };
}

const BlogDetailSection = dynamic(
  () => import("./_components/BlogDetailSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: true,
  }
);

/** Uses passed-in axios (no cookies inside cache). */
async function getBlogPostWithAxios(serverAxios, postId) {
  try {
    const { data } = await serverAxios.get(`/blog/posts/${postId}`);
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        id: d.id,
        title: d.title,
        content: d.content ?? "",
        image: d.image ?? "/images/img24.jpg",
        date: d.date ?? "",
      };
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 404) return null;
    console.error("Error fetching blog post:", error);
    return null;
  }
}

/** Uses passed-in axios (no cookies inside cache). */
async function getBlogCommentsWithAxios(serverAxios, postId) {
  try {
    const { data } = await serverAxios.get(`/blog/posts/${postId}/comments`);
    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const lang = await getLanguage();
  const resolvedParams = await params;
  const postId = resolvedParams?.id ? String(resolvedParams.id) : null;

  if (!postId) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            {t(lang, "invalid_post_id") || "Invalid post ID"}
          </p>
          <Link
            href="/blog"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            {t(lang, "back_to_blog") || "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  const serverAxios = await createServerAxios();
  const [post, comments] = await Promise.all([
    cachedServerApi(
      ["blog", "post", postId, lang],
      () => getBlogPostWithAxios(serverAxios, postId),
      CACHE_REVALIDATE,
      ["blog", `blog-post-${postId}`]
    ),
    cachedServerApi(
      ["blog", "comments", postId, lang],
      () => getBlogCommentsWithAxios(serverAxios, postId),
      CACHE_REVALIDATE,
      ["blog", `blog-post-${postId}`]
    ),
  ]);

  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            {t(lang, "post_not_found") || "المقال غير موجود"}
          </p>
          <Link
            href="/blog"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-block"
          >
            {t(lang, "back_to_blog") || "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-screen" />}>
          <BlogDetailSection post={post} comments={comments ?? []} postId={postId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
