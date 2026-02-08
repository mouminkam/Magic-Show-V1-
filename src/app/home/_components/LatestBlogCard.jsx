import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

/**
 * LatestBlogCard Component
 * A visually stunning and exceptionally polished blog post card
 * with modern design, smooth interactions, and perfect spacing
 * 
 * @param {Object} props
 * @param {Object} props.post - Blog post data
 * @param {number} props.post.id - Post ID
 * @param {string} props.post.title - Post title
 * @param {string} props.post.image - Post image path
 * @param {string} props.post.date - Post date
 * @param {string} props.post.author - Post author name
 */
export default function LatestBlogCard({ post }) {
  if (!post) return null;

  // Validate image source - use default if empty or invalid
  const imageSrc = post.image && post.image.trim() !== '' 
    ? post.image 
    : '/images/img24.jpg';

  // Check if it's an external URL
  const isExternalImage = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
      {/* Image Container with Elegant Overlay */}
      <Link 
        href={`/blog/${post.id}`} 
        className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
      >
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={isExternalImage}
        />
        
        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Elegant Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Content Section with Perfect Spacing */}
      <div className="flex flex-col flex-1 p-6 md:p-7 lg:p-8">
        {/* Metadata with Refined Icons */}
        <div className="flex items-center gap-3 md:gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 group-hover:text-orange-600 transition-colors duration-300">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-orange-50 transition-all duration-300">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <time dateTime={post.date} className="font-medium">
              {post.date}
            </time>
          </div>
          
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 group-hover:text-orange-600 transition-colors duration-300">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-orange-50 transition-all duration-300">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
        </div>

        {/* Elegant Divider Line */}
        <div className="w-10 h-0.5 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full mb-5 transform origin-left transition-all duration-500 group-hover:w-16 group-hover:scale-105" />

        {/* Title with Perfect Typography */}
        <h3 className="flex-1 mb-6">
          <Link 
            href={`/blog/${post.id}`}
            className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-orange-600"
          >
            {post.title}
          </Link>
        </h3>

        {/* Stunning Read More Button */}
        <Link
          href={`/blog/${post.id}`}
          className="relative inline-flex border-2 border-orange-500 items-center justify-center gap-2 px-6 py-3.5 bg-white text-orange-500 font-semibold text-sm rounded-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/40 mt-auto"
        >
          {/* Animated Background Gradient */}
          <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left" />
          
          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              Read More
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      {/* Subtle Border Glow Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-200/30 transition-colors duration-500 pointer-events-none" />
    </article>
  );
}

