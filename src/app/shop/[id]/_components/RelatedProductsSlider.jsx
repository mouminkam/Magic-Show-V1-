"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WishlistButton from "../../../../components/WishlistButton/WishlistButton";
import OptimizedImage from "../../../../components/ui/OptimizedImage";
import { getProductImageUrl } from "../../../../lib/utils/imageUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RelatedProductsSlider({ products = [] }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-8">
            You May Also Like
          </h2>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            slidesPerGroup={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={products.length >= 3}
            navigation={{
              prevEl: ".related-products-swiper-button-prev",
              nextEl: ".related-products-swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: ".related-products-swiper-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
            className="related-products-swiper"
          >
            {products.map((product, index) => {
              const imageSrc = getProductImageUrl(product?.image) || "/images/img20.jpg";
              const isExternalImage = imageSrc.startsWith("http://") || imageSrc.startsWith("https://");

              return (
              <SwiperSlide key={product.id || index}>
                <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative w-full h-64 overflow-hidden">
                    <Link href={`/shop/${product.id}`} className="block absolute inset-0 w-full h-full">
                      <OptimizedImage
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="w-full h-full !object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        unoptimized={isExternalImage}
                      />
                    </Link>

                    {/* Overlay - pointer-events-none لتسمح للضغطات بالوصول للـ Link */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-6 pointer-events-none">
                      <div className="text-white w-full transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                          <div>
                            <h3 className="text-sm uppercase font-light mb-1 truncate max-w-[140px] sm:max-w-none">
                              {product.name}
                            </h3>
                            <span className="text-base sm:text-lg font-bold">
                              ${product.price}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-xs sm:text-sm mt-2 sm:mt-0 pointer-events-auto">
                            <WishlistButton
                              productId={product?.id}
                              variant="white"
                              className="!p-2"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="related-products-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button className="related-products-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Pagination */}
          <div className="related-products-swiper-pagination flex justify-center space-x-3 mt-8"></div>
        </div>
      </div>
    </section>
  );
}
