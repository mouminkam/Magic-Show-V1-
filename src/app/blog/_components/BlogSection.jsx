import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroBanner from "../../../components/HeroBanner";
import AnimatedSection from "../../../components/ui/AnimatedSection";
import ErrorBoundary from "../../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import Link from "next/link";

// Lazy load BlogPost with dynamic import
const BlogPost = dynamic(() => import("./BlogPost"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

/**
 * BlogSection Component
 * Server Component that displays blog banner and paginated blog posts
 * Each section is lazy loaded for better performance
 *
 * @param {Object} props - Component props
 * @param {Array} props.blogPosts - Array of blog post objects
 * @param {Object} props.blogBanner - Banner data object
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {string} props.className - Optional CSS classes
 */
export default function BlogSection({
  blogPosts = [],
  blogBanner = null,
  currentPage = 1,
  totalPages = 1,
  className = "",
}) {
  return (
    <div className={className}>
      {/* Blog Banner - Loaded immediately (first section) */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-550px" />}
        >
          <AnimatedSection>
            <HeroBanner
              bannerData={blogBanner}
              showGradient={true}
            />
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>

      {/* Blog Posts Section - Lazy loaded */}
      <ErrorBoundary>
        <Suspense
          fallback={<SectionSkeleton variant="default" height="h-96" />}
        >
          <AnimatedSection>
            <section className="blog-posts py-16 lg:py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-16 lg:gap-20">
                  {blogPosts.map((post, index) => (
                    <BlogPost key={post.id} post={post} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    className="pagination mt-16 lg:mt-20"
                    aria-label="Blog pagination"
                  >
                    <ul className="list-unstyled flex justify-center items-center gap-2 lg:gap-3">
                      {/* Previous Button */}
                      {currentPage > 1 ? (
                        <li>
                          <Link
                            href={`/blog?page=${currentPage - 1}`}
                            className="group flex items-center justify-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3 text-[var(--secondary-color)] hover:text-[var(--primary-color)] bg-white border border-[var(--border-primary)] rounded font-medium text-sm lg:text-base transition-all duration-300 hover:border-[var(--primary-color)] hover:shadow-md active:scale-95"
                            aria-label="Go to previous page"
                          >
                            <span className="transition-transform duration-300 group-hover:-translate-x-1">
                              ←
                            </span>
                            <span className="hidden sm:inline">Prev</span>
                          </Link>
                        </li>
                      ) : (
                        <li className="px-4 py-2.5 lg:px-5 lg:py-3">
                          <span className="flex items-center gap-2 text-[var(--accent-color)] cursor-not-allowed opacity-50">
                            <span>←</span>
                            <span className="hidden sm:inline">Prev</span>
                          </span>
                        </li>
                      )}

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          const isActive = currentPage === page;
                          return (
                            <li key={page}>
                              {isActive ? (
                                <span
                                  className="flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded bg-[var(--primary-color)] text-white font-semibold text-sm lg:text-base shadow-lg cursor-default"
                                  aria-current="page"
                                  aria-label={`Current page, page ${page}`}
                                >
                                  {page.toString().padStart(2, "0")}
                                </span>
                              ) : (
                                <Link
                                  href={`/blog?page=${page}`}
                                  className="group flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded bg-white text-[var(--secondary-color)] border border-[var(--border-primary)] font-medium text-sm lg:text-base transition-all duration-300 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:shadow-md active:scale-95"
                                  aria-label={`Go to page ${page}`}
                                >
                                  {page.toString().padStart(2, "0")}
                                </Link>
                              )}
                            </li>
                          );
                        }
                      )}

                      {/* Next Button */}
                      {currentPage < totalPages ? (
                        <li>
                          <Link
                            href={`/blog?page=${currentPage + 1}`}
                            className="group flex items-center justify-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3 text-[var(--secondary-color)] hover:text-[var(--primary-color)] bg-white border border-[var(--border-primary)] rounded font-medium text-sm lg:text-base transition-all duration-300 hover:border-[var(--primary-color)] hover:shadow-md active:scale-95"
                            aria-label="Go to next page"
                          >
                            <span className="hidden sm:inline">Next</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li className="px-4 py-2.5 lg:px-5 lg:py-3">
                          <span className="flex items-center gap-2 text-[var(--accent-color)] cursor-not-allowed opacity-50">
                            <span className="hidden sm:inline">Next</span>
                            <span>→</span>
                          </span>
                        </li>
                      )}
                    </ul>
                  </nav>
                )}
              </div>
            </section>
          </AnimatedSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
