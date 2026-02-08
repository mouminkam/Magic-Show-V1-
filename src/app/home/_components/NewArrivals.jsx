"use client";

import Link from "next/link";
import NewArrivalCard from "./NewArrivalCard";

/**
 * NewArrivals Component
 * Displays newly arrived products
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 * @param {Object} props.header - Section header data
 */
export default function NewArrivals({ products = [], header = null }) {
  const defaultHeader = {
    title: "New Arrivals",
    subtitle: "Latest Collection",
    description: "Be the first to discover our newest arrivals",
    buttonText: "View All",
    buttonLink: "/shop?sort=newest",
  };

  const sectionHeader = header || defaultHeader;

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {sectionHeader.subtitle && (
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              {sectionHeader.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {sectionHeader.title}
          </h2>
          {sectionHeader.description && (
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
              {sectionHeader.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 8).map((product) => (
            <NewArrivalCard key={product.id || product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

