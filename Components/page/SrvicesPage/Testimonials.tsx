"use client";

import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper";
import {ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import "swiper/css";
import SectionIntro from "@/Components/global/SectionIntro";
import Container from "@/Components/global/Sections/Container";

interface Comment {
    avatar: { url: string; alt: string } | null;
    name: string;
    job: string;
    description: string;
}

interface Props {
    label: string;
    title: string;
    description: string;
    comments: Comment[];
}

function TestimonialCard({name, job, avatar, description}: Comment) {
    return (
        <div
            className="bg-white rounded-[1.5rem] p-8  sm:p-10 border border-neutral-30 group  hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)] hover:border-primary-6 h-full flex flex-col select-none">
            <div className="flex items-center gap-4 mb-6">
                {avatar?.url ? (
                    <Image
                        src={avatar.url}
                        alt={avatar.alt || name}
                        width={56}
                        height={56}
                        className="w-14 h-14 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gray-50"
                        unoptimized
                    />
                ) : (
                    <div
                        className="w-14 h-14 rounded-full bg-primary-6/10 flex items-center justify-center text-primary-6 font-bold text-xl">
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
                    <p className="text-sm text-gray-400 font-medium">{job}</p>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
                {description}
            </p>
        </div>
    );
}

export default function TestimonialsSection({label, title, description, comments}: Props) {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
    const titleParts = title.split(/(\bReliability\b)/i);
    return (
        <section className="py-24 overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="w-full flex xl:flex-row flex-col gap-2 items-start">
                    <div className={'lg:min-w-[600px] flex flex-col w-full items-start gap-10 2xl:ms-[10%] lg:w-[600px]'}>
                        <SectionIntro
                            badge={label}
                            title={title}
                            description={description}
                            as={'h2'}
                        />
                        <div>
                            <div className="items-start lg:flex  hidden gap-4">
                                <button
                                    onClick={() => swiperRef?.slidePrev()}
                                    className="w-12 h-12 cursor-pointer rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1da1f2] hover:text-white transition-all duration-300 border border-gray-100 hover:border-transparent shadow-sm"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft size={20} strokeWidth={2}/>
                                </button>
                                <button
                                    onClick={() => swiperRef?.slideNext()}
                                    className="w-12 h-12 cursor-pointer rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1da1f2] hover:text-white transition-all duration-300 border border-gray-100 hover:border-transparent shadow-sm"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight size={20} strokeWidth={2}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={setSwiperRef}
                        slidesPerView={'auto'}
                        spaceBetween={24}
                        className="testimonial-swiper w-full "
                    >

                        {comments.map((comment, index) => (
                            <SwiperSlide key={index} className="h-auto max-w-[600px]">
                                <TestimonialCard {...comment} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}