import Image from "next/image";

/**
 * BlogContent Component
 * Displays blog post content: title, content (HTML or text), image, date
 *
 * @param {Object} props
 * @param {Object} props.post - Blog post data { title, content, image, date }
 */
export default function BlogContent({ post }) {
  const title = post?.title || "SIMPLY TIPS FOR BEAUTY";
  const imageSrc = post?.image || "/images/img24.jpg";
  const isExternalImage = imageSrc.startsWith("http://") || imageSrc.startsWith("https://");
  const hasHtmlContent = post?.content && typeof post.content === "string" && (post.content.trim().startsWith("<") || post.content.includes("<p>"));

  return (
    <section className="blog-detail mt-16 lg:px-10 lg:mt-20">
      <div className="container mx-auto px-4">
        <div className="w-full mx-auto">
          <h1 className="blog-heading text-3xl lg:text-4xl text-gray-600 uppercase mb-8 lg:mb-12 relative inline-block tracking-widest">
            {title}
          </h1>

          {post?.date && (
            <time className="block text-gray-500 text-sm uppercase tracking-wider mb-6" dateTime={post.date}>
              {post.date}
            </time>
          )}

          {hasHtmlContent ? (
            <div
              className="txt-wrap blog-content prose prose-lg max-w-none text-gray-500 mb-8 lg:mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="txt-wrap mb-8 lg:mb-12">
              <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">
                {post?.content || ""}
              </p>
            </div>
          )}

          <div className="img-holder mb-8 lg:mb-12 rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              width={1154}
              height={671}
              className="w-full h-auto max-h-screen object-cover"
              unoptimized={isExternalImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

