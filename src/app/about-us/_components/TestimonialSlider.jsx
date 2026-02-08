"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialSlider({ testimonials = [] }) {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-2xl font-normal text-gray-600 uppercase tracking-widest block mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gray-600">
            Customer Reviews
          </span>
          <h3 className="text-6xl font-light text-gray-700 uppercase tracking-widest">
            WHAT THEY SAY
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              prevEl: ".testimonial-swiper-button-prev",
              nextEl: ".testimonial-swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-swiper-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => {
              // Validate image source - use default if empty or invalid
              const imageSrc = testimonial.customer_image && testimonial.customer_image.trim() !== '' 
                ? testimonial.customer_image 
                : '/images/img09.jpg';

              // Check if it's an external URL
              const isExternalImage = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

              return (
              <SwiperSlide key={index}>
                <div className="text-center group px-4">
                  {/* Customer Image */}
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gray-400 group-hover:border-gray-600 transition-colors duration-300">
                    <Image
                      src={imageSrc}
                      alt={testimonial.customer_name || "Customer"}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized={isExternalImage}
                    />
                  </div>

                  {/* Customer Name */}
                  <h3 className="text-2xl font-bold text-gray-700 uppercase tracking-widest mb-6">
                    {testimonial.customer_name || "Customer Name"}
                  </h3>

                  {/* Testimonial Text */}
                  <div className="relative">
                    <p className="text-gray-600 text-lg leading-8 italic max-w-2xl mx-auto relative">
                      <span className="text-6xl text-gray-300 absolute -top-4 -left-4">
                        &ldquo;
                      </span>
                      {testimonial.text || "No testimonial available"}
                      <span className="text-6xl text-gray-300 absolute -bottom-8 -right-4">
                        &rdquo;
                      </span>
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center mt-6">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`text-2xl mx-1 ${starIndex < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            );
            })}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="testimonial-swiper-button-prev absolute -left-4 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button className="testimonial-swiper-button-next absolute -right-4 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 z-10">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Custom Pagination Dots */}
          <div className="testimonial-swiper-pagination flex justify-center space-x-3 mt-8"></div>
        </div>
      </div>
    </section>
  );
}
