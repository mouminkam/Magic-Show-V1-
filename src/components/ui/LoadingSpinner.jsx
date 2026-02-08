"use client";

/**
 * LoadingSpinner Component
 * Global reusable loading spinner component
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner: "sm", "md", "lg" (default: "md")
 * @param {string} props.className - Additional CSS classes
 */
export default function LoadingSpinner({ 
  size = "md",
  className = "" 
}) {
  const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-32 w-32 border-b-2",
    lg: "h-48 w-48 border-b-4"
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-gray-900 ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

