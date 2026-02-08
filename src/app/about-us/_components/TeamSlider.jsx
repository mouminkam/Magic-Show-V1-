"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// استيراد تنسيقات Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * مكون TeamSlider
 * يضمن عرض كروت الفريق بأبعاد ثابتة 360x470 مهما كان حجم الصورة الأصلية
 */
export default function TeamSlider({ teamMembers = [] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* رأس القسم */}
        <div className="text-center mb-16">
          <span className="text-2xl font-normal text-gray-600 uppercase tracking-widest block mb-8 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gray-600">
            Our Awesome Team
          </span>
          <h3 className="text-6xl font-light text-gray-700 uppercase tracking-widest">
            MEET OUR TEAM
          </h3>
        </div>

        <div className="relative group/nav">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={teamMembers.length > 3}
            navigation={{
              prevEl: ".team-swiper-button-prev",
              nextEl: ".team-swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: ".team-swiper-pagination",
              bulletClass: "swiper-pagination-bullet !bg-gray-400 !opacity-50",
              bulletActiveClass: "!bg-gray-900 !opacity-100",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 1,
              },
            }}
            className="team-swiper pb-16"
          >
            {teamMembers.map((member, index) => {
              // التحقق من وجود الصورة أو وضع صورة افتراضية
              const imageSrc = member.image?.trim() ? member.image : '/images/img09.jpg';
              const isExternalImage = imageSrc.startsWith('http');

              return (
                <SwiperSlide key={index}>
                  <div className="text-center group px-2">
                    {/* الحاوية ذات الأبعاد الثابتة */}
                    <div className="relative w-full aspect-[360/470] overflow-hidden mb-6 rounded-lg shadow-md bg-gray-100">
                      <Image
                        src={imageSrc}
                        alt={member.name || "Team Member"}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        unoptimized={isExternalImage}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3} // تحسين سرعة تحميل أول 3 صور
                      />
                    </div>
                    
                    {/* تفاصيل العضو */}
                    <h4 className="text-xl font-semibold text-gray-800 mb-1">
                      <span className="hover:text-gray-600 transition-colors cursor-pointer">
                        {member.name}
                      </span>
                    </h4>
                    
                    <span className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold block mb-3">
                      {member.role}
                    </span>
                    
                    {member.bio && (
                      <p className="text-gray-500 text-sm leading-relaxed mt-3 px-4 line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* أزرار التحكم المخصصة */}
          <button className="team-swiper-button-prev absolute left-0 top-[40%] transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gray-900 hover:text-white transition-all duration-300 z-10 opacity-0 group-hover/nav:opacity-100 -translate-x-4 group-hover/nav:translate-x-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button className="team-swiper-button-next absolute right-0 top-[40%] transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-gray-900 hover:text-white transition-all duration-300 z-10 opacity-0 group-hover/nav:opacity-100 translate-x-4 group-hover/nav:-translate-x-2">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* نقاط التنقل السفلى */}
          <div className="team-swiper-pagination flex justify-center space-x-2 mt-8"></div>
        </div>
      </div>
    </section>
  );
}