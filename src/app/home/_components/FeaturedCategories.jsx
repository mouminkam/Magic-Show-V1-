"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

/**
 * FeaturedCategories Component
 * Displays featured category cards for easy navigation
 * @param {Object} props - Component props
 * @param {Array} props.categories - Array of category objects
 * @param {string} props.categories[].name - Category name
 * @param {string} props.categories[].image - Category image URL
 * @param {string} props.categories[].slug - Category slug for URL
 */
export default function FeaturedCategories({ categories = [] }) {
  // Default categories if not provided
  const defaultCategories = [
    { name: "Heels", image: "/images/img25.png", slug: "heels" },
    { name: "Boots", image: "/images/img26.png", slug: "boots" },
    { name: "Sneakers", image: "/images/img21.png", slug: "sneakers" },
    { name: "Flats", image: "/images/img22.png", slug: "flats" },
    { name: "Sandals", image: "/images/img25.png", slug: "sandals" },
  ];

  const categoriesToRender = categories.length > 0 ? categories : defaultCategories;

  if (categoriesToRender.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover our curated collections
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categoriesToRender.map((category, index) => (
            <Link
              key={index}
              href={`/shop?category=${category.slug || category.name}`}
              className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative w-full h-full">
                <Image
                  src={category.image || "/images/img25.png"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>

              {/* Category Name */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-lg md:text-xl font-bold mb-2 text-center uppercase tracking-wide">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium">Shop Now</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

