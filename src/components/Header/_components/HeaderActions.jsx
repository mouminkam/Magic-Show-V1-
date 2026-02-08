"use client";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ShoppingCart, Search, Heart, LogOut } from "lucide-react";
import { useCart } from "../../../hooks/useCart";
import useWishlistStore from "../../../store/wishlistStore";
import useAuthStore from "../../../store/authStore";
import api from "../../../api";
import HeaderCart from "./HeaderCart";
import HeaderLanguageSwitcher from "./HeaderLanguageSwitcher";

export default function HeaderActions({
  cartOpen,
  setCartOpen,
  setSearchOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  lang,
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { itemCount } = useCart();
  const wishlistCount = useWishlistStore((s) => s.itemCount());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) fetchWishlist();
  }, [mounted, isAuthenticated, fetchWishlist]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // Ignore errors (e.g. token expired)
    }
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  const displayItemCount = mounted ? itemCount : 0;
  const displayWishlistCount = mounted ? wishlistCount : 0;
  const displayAuthenticated = mounted ? isAuthenticated : false;
  const displayName = user?.first_name || user?.email || "User";

  return (
    <div className="flex items-center gap-4 md:gap-6 lg:gap-10 shrink-0 z-10">
      {/* User Icon - Dropdown when authenticated */}
      <div className="relative hidden sm:block" ref={userMenuRef}>
        {displayAuthenticated ? (
          <>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
              aria-label="User menu"
              aria-expanded={userMenuOpen}
            >
              <User className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  )}
                </div>
                <Link
                  href="/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="text-gray-700 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
            aria-label="Go to login page"
          >
            <User className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </Link>
        )}
      </div>

      {/* Wishlist Icon (visible when logged in) */}
      {displayAuthenticated && (
        <Link
          href="/wishlist"
          className="text-gray-700 hover:text-orange-500 transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded hidden sm:flex"
          aria-label={`Wishlist${displayWishlistCount > 0 ? `, ${displayWishlistCount} items` : ""}`}
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          {displayWishlistCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium px-1"
              aria-hidden="true"
            >
              {displayWishlistCount > 99 ? "99+" : displayWishlistCount}
            </span>
          )}
        </Link>
      )}

      {/* Cart Icon */}
      <div className="relative">
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="text-gray-700 hover:text-orange-500 transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
          aria-label={`Shopping cart${displayItemCount > 0 ? `, ${displayItemCount} items` : ""}`}
          aria-expanded={cartOpen}
        >
          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          {displayItemCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
              aria-hidden="true"
            >
              {displayItemCount > 99 ? "99+" : displayItemCount}
            </span>
          )}
        </button>
        <HeaderCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>

      {/* Search Icon */}
      <button
        onClick={() => setSearchOpen(true)}
        className="text-gray-700 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
      </button>

      {/* Language Switcher */}
      <HeaderLanguageSwitcher lang={lang} />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden flex flex-col space-y-1.5 p-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
          aria-hidden="true"
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
          aria-hidden="true"
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
          aria-hidden="true"
        ></span>
      </button>
    </div>
  );
}

HeaderActions.propTypes = {
  cartOpen: PropTypes.bool.isRequired,
  setCartOpen: PropTypes.func.isRequired,
  setSearchOpen: PropTypes.func.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

