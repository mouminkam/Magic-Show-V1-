import LatestBlogCard from "./LatestBlogCard";

/**
 * LatestBlogSection Component
 * Displays the latest blog section with title, description, and 3 blog post cards
 * 
 * @param {Object} props
 * @param {Object} props.latestBlogData - Latest blog data
 * @param {string} props.latestBlogData.title - Section title
 * @param {string} props.latestBlogData.description - Section description
 * @param {Array} props.latestBlogData.posts - Array of blog post objects
 */
export default function LatestBlogSection({ latestBlogData = null }) {
  // Default data if not provided
  const defaultData = {
    title: "Latest Blog",
    description: "There are many variations of passages of Lorem Ipsum available.",
    posts: [],
  };

  const sectionData = latestBlogData || defaultData;
  const { title, description, posts } = sectionData;

  // If no posts, don't render the section
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <LatestBlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

