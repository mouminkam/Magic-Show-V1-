"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Button from "../../../components/Button";
import useWishlistStore from "../../../store/wishlistStore";
import { useCart } from "../../../hooks/useCart";
import useAuthStore from "../../../store/authStore";
import { getProductImageUrl } from "../../../lib/utils/imageUtils";

export default function WishlistSection() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const items = useWishlistStore((s) => s.items);
  const isLoading = useWishlistStore((s) => s.isLoading);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated, fetchWishlist]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white mt-20 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sign in to view your wishlist
          </h2>
          <p className="text-gray-600 mb-6">
            Create an account or sign in to save your favorite products.
          </p>
          <Link href="/login?redirect=/wishlist">
            <Button variant="primary" size="md">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen bg-white mt-20 flex items-center justify-center">
        <div className="animate-pulse flex flex-col gap-4 w-full max-w-4xl px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white mt-20 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="md">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white mt-20">
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            My Wishlist ({items.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const productId = item.productId ?? item.product_id ?? item.id;
              const imageSrc =
                getProductImageUrl(item.image) || "/images/img20.jpg";
              const isExternalImage =
                imageSrc.startsWith("http://") ||
                imageSrc.startsWith("https://");

              return (
                <div
                  key={item.id ?? productId}
                  className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/shop/${productId}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={isExternalImage}
                      />
                      {item.discount && (
                        <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {item.originalPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="font-bold text-gray-900">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(productId);
                      }}
                      aria-label="Remove from wishlist"
                      className="w-9 h-9 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center shadow-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                  <div className="p-4 pt-0">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(
                          {
                            id: productId,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          },
                          1
                        );
                        openCart();
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
