"use client";

import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useWishlistStore from "../../store/wishlistStore";
import useAuthStore from "../../store/authStore";

/**
 * Reusable wishlist heart button.
 * - If not logged in: redirects to login with return URL
 * - If logged in: toggles product in wishlist via API
 */
export default function WishlistButton({
  productId,
  variant = "default",
  className = "",
  onSuccess,
  onLoginRequired,
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(productId));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
  const isLoading = useWishlistStore((s) => s.isLoading);
  const productIds = useWishlistStore((s) => s.productIds);

  useEffect(() => {
    if (isAuthenticated && productId && productIds.size === 0) {
      fetchWishlist();
    }
  }, [isAuthenticated, productId, productIds.size, fetchWishlist]);

  const handleClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!productId) return;

    if (!isAuthenticated) {
      onLoginRequired?.();
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const result = await toggleWishlist(productId);
    if (result.success) onSuccess?.();
  };

  const baseClass =
    variant === "minimal"
      ? "w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
      : variant === "overlay"
      ? "w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      : variant === "bordered"
      ? "p-4 border-2 border-gray-300 text-gray-600 hover:border-gray-400 rounded flex items-center justify-center transition-colors"
      : variant === "white"
      ? "rounded-full flex items-center justify-center transition-all duration-300"
      : "w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200";

  return (
    <button
      type="button"
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={isInWishlist}
      disabled={isLoading}
      className={`${baseClass} ${className}`}
      onClick={handleClick}
    >
      <Heart
        className={`${
          variant === "bordered" ? "w-7 h-7" : "w-4 h-4 md:w-5 md:h-5"
        } ${
          variant === "white"
            ? "text-white"
            : isInWishlist
            ? "fill-red-500 text-red-500"
            : "text-gray-600"
        }`}
      />
    </button>
  );
}

WishlistButton.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  variant: PropTypes.oneOf(["default", "minimal", "overlay", "bordered", "white"]),
  className: PropTypes.string,
  onSuccess: PropTypes.func,
  onLoginRequired: PropTypes.func,
};

WishlistButton.defaultProps = {
  variant: "default",
  className: "",
};
