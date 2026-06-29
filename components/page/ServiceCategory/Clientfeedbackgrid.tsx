"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/global/Sections/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

interface Testimonial {
    name: string;
    date: string;
    text: string;
    rating: number;
}

const TESTIMONIALS: Testimonial[] = [
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
    {
        name: "Behnam Jafari",
        date: "April 15, 2026",
        text: "Enhance your outdoor living with patios, kitchens, landscapes, lighting, and water features designed for beauty and function.",
        rating: 4,
    },
];

function TestimonialCard({ data }: { data: Testimonial }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] h-full">
            <h3 className="text-gray-900 font-bold text-base mb-1">{data.name}</h3>
            <p className="text-gray-400 text-xs mb-4">{data.date}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">{data.text}</p>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        size={16}
                        className={
                            i <= data.rating
                                ? "fill-primary-6 text-primary-6"
                                : "fill-gray-200 text-gray-200"
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export function ClientFeedbackGrid() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="w-full py-12 lg:py-16">
            <Container>
                <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary-6/30 mb-4">
                        <span className="text-primary-6 text-sm font-medium">
                            Client Feedback
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                        Trusted by Teams Who Rely on Stability
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
                        Real feedback from businesses that count on our IT support for their daily operations.
                    </p>
                </div>

                <Swiper
                    modules={[Navigation]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3.6 },
                    }}
                    loop
                    className="!pb-2"
                >
                    {TESTIMONIALS.map((t, i) => (
                        <SwiperSlide key={i} className="h-auto">
                            <TestimonialCard data={t} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex items-center gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous testimonials"
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-6 hover:border-primary-6 transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next testimonials"
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-6 hover:border-primary-6 transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </Container>
        </section>
    );
}