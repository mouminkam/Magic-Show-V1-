import Link from "next/link";
import Image from "next/image";
import WishlistButton from "../../../components/WishlistButton/WishlistButton";
import { getProductImageUrl } from "../../../lib/utils/imageUtils";

export default function FeaturedProductCard({ product }) {
  const {
    id,
    image,
    alt,
    name,
    originalPrice,
    discountedPrice,
    colSpan,
    rowSpan,
    width = 600,
    height = 800,
  } = product;

  // Resolve image URL (handles /storage/... from API)
  const imageSrc = getProductImageUrl(image) || "/images/img25.png";
  const isExternalImage =
    imageSrc.startsWith("http://") || imageSrc.startsWith("https://");

  const cardContent = (
    <>
      <Image
        src={imageSrc}
        alt={alt || name}
        width={width}
        height={height}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        unoptimized={isExternalImage}
      />
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 p-3 md:p-4">
        <h3 className="text-white text-base md:text-lg lg:text-xl xl:text-2xl font-semibold transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-50 text-center px-2">
          {name}
        </h3>
        <button className="bg-white text-black px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base lg:text-lg hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          SHOP NOW
        </button>
        <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex items-center justify-between px-3 md:px-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
          <div className="flex flex-col">
            <span className="text-white line-through text-xs md:text-sm opacity-70">
              {originalPrice}
            </span>
            <span className="text-[#fbb247] text-base md:text-lg lg:text-xl xl:text-2xl font-bold">
              {discountedPrice}
            </span>
          </div>
          <WishlistButton
            productId={id}
            variant="white"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3"
          />
        </div>
      </div>
    </>
  );

  const className = `relative overflow-hidden group cursor-pointer aspect-square md:aspect-video xl:aspect-auto ${
    colSpan || ""
  } ${rowSpan || ""}`;

  if (id) {
    return (
      <Link href={`/shop/${id}`} className={className}>
        {cardContent}
      </Link>
    );
  }

  return <div className={className}>{cardContent}</div>;
}

