"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import Image from "next/image";

import "swiper/css";
import SectionIntro from "@/Components/global/SectionIntro";

interface Comment {
    avatar: { url: string; alt: string } | null;
    name: string;
    job: string;
    description: string;
    star: string;
}

interface Props {
    comments: Comment[];
    title: string;
    description: string;
    label: string;
}

export default function Testimonials({ comments, label, title, description }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <SectionIntro
                badge={label}
                title={title}
                description={description}
                lgCenter={true}
            />
            <div className="relative w-full mt-6 lg:mt-10">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView="auto"
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    speed={600}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="!pb-16"
                >
                    {comments.map((comment, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <SwiperSlide key={index} className="!w-[520px]">
                                <div
                                    className={`bg-white w-full rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center h-full transition-all duration-300 ${
                                        isActive
                                            ? "opacity-100 scale-100"
                                            : "opacity-40 scale-90"
                                    }`}
                                >
                                    {comment.avatar?.url && (
                                        <Image
                                            src={comment.avatar.url}
                                            alt={comment.avatar.alt || comment.name}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-full mb-4"
                                            unoptimized
                                        />
                                    )}

                                    <h3 className="text-xl font-bold">{comment.name}</h3>
                                    <p className="text-sm text-gray-400 mb-6">{comment.job}</p>
                                    <p className="text-gray-600 mb-8">{comment.description}</p>

                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < Number(comment.star)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}