"use client";
import Link from "next/link";
import Image from "next/image";

export default function FooterInstagram() {
  // Instagram images data
  const instagramImages = [
    { src: "/images/img12.jpg", alt: "Jewelry item 1" },
    { src: "/images/img13.jpg", alt: "Jewelry item 2" },
    { src: "/images/img14.jpg", alt: "Jewelry item 3" },
    { src: "/images/img15.jpg", alt: "Jewelry item 4" },
    { src: "/images/img16.jpg", alt: "Jewelry item 5" },
    { src: "/images/img17.jpg", alt: "Jewelry item 6" },
    { src: "/images/img18.jpg", alt: "Jewelry item 7" },
    { src: "/images/img19.jpg", alt: "Jewelry item 8" },
  ];

  return (
    <div className="text-gray-900">
      <h3 className="text-2xl font-normal mb-6 uppercase tracking-wide">
        INSTAGRAM FEED
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {instagramImages.map((image, index) => (
          <Link
            key={index}
            href="/shop/1"
            className="block relative group overflow-hidden rounded border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg aspect-square"
          >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <Image
                src={image.src || "/images/img03.jpg"}
                alt={image.alt}
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* Overlay with animation */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-2">
              <span className="text-white text-xs font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View
              </span>
            </div>
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}

