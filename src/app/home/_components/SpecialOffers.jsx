"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "../../shop/_components/ProductCard";

/**
 * SpecialOffers Component
 * Displays products on sale with prominent discount badges
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects
 * @param {Object} props.header - Section header data
 */
export default function SpecialOffers({ products = [], header = null }) {
  const defaultHeader = {
    title: "Special Offers",
    subtitle: "Limited Time",
    description: "Don't miss out on these amazing deals",
    buttonText: "Shop All Sales",
    buttonLink: "/shop?onSale=true",
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
            <p className="text-sm uppercase tracking-widest text-orange-500 mb-2 font-semibold">
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
          {sectionHeader.buttonText && (
            <Link
              href={sectionHeader.buttonLink || "/shop"}
              className="inline-block px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-all"
            >
              {sectionHeader.buttonText}
            </Link>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 8).map((product) => {
            // Adapt product for ProductCard (ensure it has required fields)
            const originalPriceNum = typeof product.originalPrice === 'string' 
              ? parseFloat(product.originalPrice.replace("$", "")) 
              : product.originalPrice;
            const priceNum = typeof product.price === 'string' 
              ? parseFloat(product.price.replace("$", "")) 
              : (typeof product.discountedPrice === 'string'
                ? parseFloat(product.discountedPrice.replace("$", ""))
                : product.discountedPrice || product.price);
            
            const adaptedProduct = {
              id: product.id || product.name?.toLowerCase().replace(/\s+/g, "-"),
              name: product.name,
              image: product.image || product.productImage,
              price: priceNum,
              originalPrice: originalPriceNum,
              category: product.category || "On Sale",
              discount: product.discount || (originalPriceNum && priceNum && originalPriceNum > priceNum
                ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
                : undefined),
            };
            return (
              <ProductCard key={adaptedProduct.id} product={adaptedProduct} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

