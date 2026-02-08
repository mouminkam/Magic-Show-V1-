"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * CustomerReviews Component
 * Displays customer testimonials in a carousel
 * Compatible with About Us testimonials structure for unified API
 * @param {Object} props - Component props
 * @param {Array} props.reviews - Array of review/testimonial objects
 * Supports both formats:
 * - { name, text, image, rating?, date?, productImage? } (About Us format)
 * - { name, comment, image, rating?, date?, productImage? } (Home format)
 */
export default function CustomerReviews({ reviews = [] }) {
  const defaultReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "Absolutely love my new heels! The quality is outstanding and they're so comfortable. Highly recommend!",
      comment: "Absolutely love my new heels! The quality is outstanding and they're so comfortable. Highly recommend!",
      image: "/images/img25.png",
      productImage: "/images/img25.png",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Emily Chen",
      text: "Best shoes I've ever purchased. Fast shipping and perfect fit. Will definitely shop here again!",
      comment: "Best shoes I've ever purchased. Fast shipping and perfect fit. Will definitely shop here again!",
      image: "/images/img26.png",
      productImage: "/images/img26.png",
      rating: 5,
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Maria Garcia",
      text: "Excellent customer service and beautiful products. The boots are even better in person!",
      comment: "Excellent customer service and beautiful products. The boots are even better in person!",
      image: "/images/img21.png",
      productImage: "/images/img21.png",
      rating: 5,
      date: "3 weeks ago",
    },
  ];

  const reviewsToRender = reviews.length > 0 ? reviews : defaultReviews;

  // Normalize review data to support both formats
  const normalizedReviews = reviewsToRender.map((review) => ({
    id: review.id,
    name: review.name,
    // Support both 'text' (About Us) and 'comment' (Home) fields
    comment: review.comment || review.text || "",
    // Support both 'image' (customer photo) and 'productImage' fields
    image: review.image || review.productImage || review.customerImage,
    productImage: review.productImage || review.image,
    rating: review.rating || 5,
    date: review.date,
  }));

  if (normalizedReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              prevEl: ".customer-reviews-swiper-button-prev",
              nextEl: ".customer-reviews-swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: ".customer-reviews-swiper-pagination",
            }}
            className="customer-reviews-swiper"
          >
            {normalizedReviews.map((review) => (
              <SwiperSlide key={review.id || review.name}>
                <div className="bg-gray-50 rounded-lg p-6 md:p-8 h-full flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  {/* Rating Stars */}
                  {review.rating && (
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${
                            index < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Review Comment/Text */}
                  <p className="text-gray-700 mb-6 flex-1 leading-relaxed">
                    "{review.comment}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    {(review.image || review.productImage) && (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={review.image || review.productImage}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.name}
                      </h4>
                      {review.date && (
                        <p className="text-sm text-gray-500">{review.date}</p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="customer-reviews-swiper-button-prev absolute -left-4 sm:left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10 border border-gray-200">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button className="customer-reviews-swiper-button-next absolute -right-4 sm:right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10 border border-gray-200">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Pagination Dots */}
          <div className="customer-reviews-swiper-pagination flex justify-center gap-2 mt-8"></div>
        </div>
      </div>
    </section>
  );
}

