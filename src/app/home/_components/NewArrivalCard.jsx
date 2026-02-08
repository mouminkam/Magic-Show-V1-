"use client";
import Link from "next/link";
import TiltedCard from "../../../components/ui/TiltedCard";
import { getProductImageUrl } from "../../../lib/utils/imageUtils";

export default function NewArrivalCard({ product }) {
  // Resolve image URL (handles /storage/... paths from API - prepends backend origin)
  const imageSrc = getProductImageUrl(product?.image) || "/images/img20.jpg";

  return (
    <Link
      href={`/shop/${product.id}`}
      className="flex flex-col h-full"
    >
      {/* TiltedCard with 3D effect - same approach as other product sections */}
      <div className="relative w-full aspect-[3/4]">
        <TiltedCard
          imageSrc={imageSrc}
          altText={product.name}
          captionText={product.name}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          scaleOnHover={1.05}
          rotateAmplitude={14}
          showMobileWarning={false}
          showTooltip={true}
        />
      </div>
    </Link>
  );
}

