"use client";

export default function SectionSkeleton({
  variant = "default",
  cardCount = 6,
  height = "h-96",
  className = "",
}) {
  // Shimmer effect classes - using custom CSS class for better compatibility
  const shimmerBase = "skeleton-shimmer bg-gray-100";

  if (variant === "grid") {
    return (
      <div className={`${height} w-full p-8 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <div
              key={index}
              className={`${shimmerBase} rounded-lg`}
              style={{ height: "400px" }}
            >
              <div className="h-3/4 bg-gray-200 rounded-t-lg"></div>
              <div className="h-1/4 p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${height} w-full p-8 ${className}`}>
      <div className="space-y-4">
        <div className={`${shimmerBase} h-8 rounded w-3/4`}></div>
        <div className={`${shimmerBase} h-4 rounded w-full`}></div>
        <div className={`${shimmerBase} h-4 rounded w-5/6`}></div>
        <div className={`${shimmerBase} h-4 rounded w-4/6`}></div>
        <div className={`${shimmerBase} h-64 rounded mt-8`}></div>
      </div>
    </div>
  );
}



