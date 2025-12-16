"use client";
import { testimonials } from "../../data/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useState, useEffect, useRef } from "react";
export default function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative py-20 w-full bg-gradient-to-br from-purple-50 via-blue-50 to-white overflow-x-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          O que clientes dizem
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          speed={600}
          navigation={{
            enabled: true,
            hideOnClick: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          className="w-full"
          breakpoints={{
            768: { navigation: true },
            0: { navigation: false },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 flex flex-col items-center justify-center min-h-[220px]">
                <div className="mb-4 text-center">
                  <span className="block font-semibold text-gray-900 text-lg">{t.name}</span>
                  <span className="block text-sm text-gray-600">{t.role}</span>
                </div>
                <p className="text-gray-800 mb-2 text-center">“{t.quote}”</p>
                {t.source && (
                  <a
                    href={t.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Ver na fonte
                  </a>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
