"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import WishlistButton from "../../../components/WishlistButton/WishlistButton";
import OptimizedImage from "../../../components/ui/OptimizedImage";
import { getProductImageUrl } from "../../../lib/utils/imageUtils";

export default function ProductCard({ product }) {
  const imageSrc = getProductImageUrl(product?.image) || "/images/img20.jpg";
  const isExternalImage =
    imageSrc.startsWith("http://") || imageSrc.startsWith("https://");

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div
        className="group relative cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden 
      transition-all duration-300 ease-out transform translate-y-0 
      hover:shadow-xl hover:-translate-y-4 flex flex-col will-change-transform"
      >
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded z-10">
            -{product.discount}%
          </div>
        )}

        {/* Product Image - same approach as other pages (OptimizedImage + resolved URL) */}
        <div className="relative w-full aspect-[3/4] overflow-hidden shrink-0">
          <OptimizedImage
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full"
            priority={true}
            unoptimized={isExternalImage}
          />

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton productId={product?.id} variant="overlay" />
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-auto">
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-bold text-gray-900">${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
