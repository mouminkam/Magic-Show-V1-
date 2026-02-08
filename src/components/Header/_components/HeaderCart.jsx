"use client";
import Link from "next/link";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "../../../hooks/useCart";

export default function HeaderCart({ isOpen, onClose }) {
  const { items, total, removeFromCart } = useCart();
  const cartDropdownRef = useRef(null);

  // Handle click outside to close cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Handle Escape key to close cart
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={cartDropdownRef}
      className="absolute top-full right-0 z-[60] w-72 md:w-80 bg-white shadow-2xl border border-gray-200 mt-4 p-4 md:p-6 animate-in fade-in slide-in-from-top-2 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Shopping Cart
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
          aria-label="Close cart"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 md:space-y-4 mb-4 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-4">
            Your cart is empty
          </p>
        ) : (
          items.map((item) => {
            // Validate image source - use null if empty or invalid
            const imageSrc = item.image && item.image.trim() !== '' ? item.image : null;

            return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-gray-100"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-600">💎</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${item.price?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors shrink-0 ml-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                aria-label={`Remove ${item.name} from cart`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            );
          })
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-200">
            <span className="text-gray-600 font-medium">Total:</span>
            <span className="text-lg font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <Link
              href="/shoping-cart"
              className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors duration-300 text-sm font-medium block text-center"
              onClick={onClose}
            >
              Checkout
            </Link>
            <Link
              href="/shoping-cart"
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-50 transition-colors duration-300 text-sm font-medium block text-center"
              onClick={onClose}
            >
              View Cart
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

HeaderCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

