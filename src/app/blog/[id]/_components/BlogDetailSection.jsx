import { Suspense } from "react";
import dynamic from "next/dynamic";
import AnimatedSection from "../../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../../components/ui/SectionSkeleton";

// Lazy load sections with dynamic imports
const BlogContent = dynamic(() => import("./BlogContent"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * BlogDetailSection Component
 * Main component that renders BlogContent.
 * Each section is lazy loaded for better performance
 * 
 * @param {Object} props
 * @param {Object} props.post - Blog post data object
 * @param {string|number} props.postId - Blog post ID
 */
export default function BlogDetailSection({ post, postId }) {
  return (
    <div className="blog-detail-page">
      {/* Blog Content Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <BlogContent post={post} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
