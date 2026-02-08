"use client";
import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function FooterBackToTop() {
  const [showBackTop, setShowBackTop] = useState(false);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center transition-all duration-300 z-50 ${
        showBackTop
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

