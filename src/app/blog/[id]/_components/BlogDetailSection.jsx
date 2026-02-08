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

const CommentsSection = dynamic(() => import("./CommentsSection"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * BlogDetailSection Component
 * Main component that combines BlogContent and CommentsSection
 * Each section is lazy loaded for better performance
 * 
 * @param {Object} props
 * @param {Object} props.post - Blog post data object
 * @param {Array} props.comments - Array of comment objects
 * @param {string|number} props.postId - Blog post ID
 */
export default function BlogDetailSection({ post, comments = [], postId }) {
  // Mock comments data - will be replaced with API call
  const mockComments = comments.length > 0 ? comments : [
    {
      id: 1,
      author: "Admin",
      date: "April 10, 2016 | 11.25 am",
      content:
        "Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque...",
    },
    {
      id: 2,
      author: "Admin",
      date: "April 10, 2016 | 11.25 am",
      content:
        "Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque...",
    },
    {
      id: 3,
      author: "Admin",
      date: "April 10, 2016 | 11.25 am",
      content:
        "Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque...",
    },
  ];

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

      {/* Comments Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <AnimatedSection>
            <CommentsSection comments={mockComments} postId={postId} />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
