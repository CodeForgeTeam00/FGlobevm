"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/global/Sections/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import SectionIntro from "@/components/global/SectionIntro";

export interface TestimonialItem {
    name: string;
    description: string;
    star: string | number;
}

interface Props {
    label?: string;
    title?: string;
    description?: string;
    testimonials: TestimonialItem[];
}

function TestimonialCard({ data }: { data: TestimonialItem }) {
    const rating = typeof data.star === "string" ? parseInt(data.star, 10) || 0 : data.star;

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] h-full">
            <h3 className="text-gray-900 font-bold text-base mb-1">{data.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {data.description}
            </p>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        size={16}
                        className={
                            i <= rating
                                ? "fill-primary-6 text-primary-6"
                                : "fill-gray-200 text-gray-200"
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export function ClientFeedbackGrid({ label, title, description, testimonials }: Props) {
    const swiperRef = useRef<SwiperType | null>(null);

    // Don't render anything if no testimonials
    if (!Array.isArray(testimonials) || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 lg:py-16">
            <Container>
                <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
                    <SectionIntro
                        badge={label}
                        title={title ?? ''}
                        description={description ?? ''}
                        as={"h2"}
                        lgCenter={true}
                    />
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
                    loop={testimonials.length > 3}
                    className="!pb-2"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i} className="h-auto">
                            <TestimonialCard data={t} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {testimonials.length > 3 && (
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
                )}
            </Container>
        </section>
    );
}