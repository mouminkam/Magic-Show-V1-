"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * HomeBanner Component
 * @param {string} props.heroData.heroImage - Hero image URL (optional)
 */
export default function HomeBanner({ heroData = null }) {
  const defaultData = {
    badge: "EST. 2024",
    title: "ELEGANT",
    subtitle: "JEWELRY",
    description:
      "Crafted with precision. Timeless designs. Quality that lasts generations.",
    ctaPrimary: "Shop Now",
    ctaPrimaryLink: "/shop",
    ctaSecondary: "View Collection",
    ctaSecondaryLink: "/shop",
    heroImage: "/images/img217.png", // مسار الصورة الافتراضي
    stats: [
      { value: "100+", label: "Designs" },
      { value: "100%", label: "Quality Guaranteed" },
    ],
  };

  const data = heroData || defaultData;
  const {
    badge,
    title,
    subtitle,
    description,
    ctaPrimary,
    ctaPrimaryLink,
    ctaSecondary,
    ctaSecondaryLink,
    heroImage,
    stats,
  } = data;

  return (
    <section
      className="relative w-full min-h-[600px] md:min-h-[700px] bg-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 md:top-20 right-10 md:right-20 w-48 h-48 md:w-64 md:h-64 border-2 border-gray-200 rounded-full opacity-50 transition-transform duration-300"
        ></div>
        <div
          className="absolute bottom-10 md:bottom-20 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 border-2 border-gray-200 rounded-full opacity-50 transition-transform duration-300"
        ></div>
      </div>

      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20 gap-8 lg:gap-12">
        <div className="flex-1 max-w-2xl w-full">
          <div
            className="inline-block text-xs text-gray-500 uppercase tracking-[0.3em] mb-4 md:mb-6 font-semibold px-4 py-2 border border-gray-300 rounded-full hover:border-orange-500 hover:text-orange-500"
          >
            {badge}
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              {title}
            </span>
            {subtitle && (
              <>
                <br />
                <span className="font-light bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {subtitle}
                </span>
              </>
            )}
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-xl leading-relaxed"
          >
            {description}
          </p>

          <div
            className="flex flex-wrap gap-4 mb-8 sm:mb-10 md:mb-12"
          >
            <Link
              href={ctaPrimaryLink || "/shop"}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-black border-2 border-black font-semibold rounded overflow-hidden transition-all shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 transition-colors duration-300 text-white group-hover:text-black">
                {ctaPrimary || "Shop Now"}
              </span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {ctaSecondary && (
              <Link
                href={ctaSecondaryLink || "/shop"}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-black font-semibold rounded overflow-hidden transition-all shadow-md hover:shadow-xl"
              >
                <span className="relative z-10 transition-colors duration-300 text-black group-hover:text-white">
                  {ctaSecondary}
                </span>
                <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div
              className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 text-gray-600"
            >
              {stats.map((stat, index) => (
                <div key={index} className="relative group cursor-default">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1 transition-all duration-300 group-hover:text-orange-500 group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Image Section */}
        <div className="flex-1 relative w-full max-w-md xl:max-w-lg">
          <div className="relative mx-auto">
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-gray-200 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-orange-200 mx-auto"
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="Hero Jewelry"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 352px, 384px"
                  unoptimized={typeof heroImage === "string" && (heroImage.startsWith("http://") || heroImage.startsWith("https://"))}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-gray-300">
                    ✦
                  </div>
                </div>
              )}
            </div>

            <div
              className="absolute -top-4 -right-4 w-16 h-16 xl:w-24 xl:h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-4 border-white shadow-xl opacity-90 animate-pulse"
            ></div>
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 xl:w-32 xl:h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-white shadow-xl opacity-70 animate-pulse"
              style={{
                animationDelay: "1s",
              }}
            ></div>

            <div className="absolute top-1/4 -left-8 w-3 h-3 bg-orange-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-1/3 -right-6 w-2 h-2 bg-gray-400 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
