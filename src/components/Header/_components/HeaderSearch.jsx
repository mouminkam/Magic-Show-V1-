"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import api from "../../../api";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function HeaderSearch({ isOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const searchProducts = useCallback(async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await api.products.getAll({ search: searchTerm, per_page: 8 });
      const data = response?.data ?? response;
      const items = data?.data?.items ?? data?.items ?? (Array.isArray(data) ? data : []);
      setResults(Array.isArray(items) ? items : []);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    searchProducts(debouncedQuery);
  }, [debouncedQuery, searchProducts]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleResultClick = (product) => {
    const id = product?.id ?? product?.data?.id;
    if (id) router.push(`/shop/${id}`);
    onClose();
  };

  if (!isOpen) return null;

  const productList = results.slice(0, 8).map((p) => {
    const d = p?.data ?? p;
    return {
      id: d?.id ?? p?.id,
      name: d?.name ?? p?.name ?? "Product",
      price: d?.sale_price ?? d?.price ?? p?.sale_price ?? p?.price ?? 0,
      image: d?.featured_image ?? d?.images?.[0] ?? p?.featured_image ?? p?.images?.[0],
    };
  });

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search dialog"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Search className="w-6 h-6 text-orange-500 mr-3" />
            <span className="text-xl font-normal text-gray-900 tracking-wide">Search</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            className="w-full px-4 py-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg border border-gray-200"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : query.length < 2 ? (
            <p className="text-gray-500 text-center py-4">Type at least 2 characters to search</p>
          ) : productList.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No results found</p>
          ) : (
            <ul className="space-y-2">
              {productList.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(product)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <img
                          src={typeof product.image === "string" ? product.image : product.image?.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price?.toFixed(2) ?? "0.00"}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
