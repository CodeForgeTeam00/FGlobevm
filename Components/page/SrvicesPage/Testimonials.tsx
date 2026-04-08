"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function cn(...classes: (string | false | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

const testimonials = [
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },
    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },    {
        id: 1,
        name: 'Behnam Jafari',
        role: 'CEO of Meta',
        image: 'https://picsum.photos/seed/behnam1/100/100',
        text: 'Enhance your outdoor living with patios...',
        rating: 5,
    },];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="">

                <div className="relative w-full ">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        loop={true}
                        watchSlidesProgress={true}
                        className="!pb-16"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide
                                key={index}
                                className="!w-[520px]"
                            >
                                {({ isActive }) => (
                                    <div
                                        className={cn(
                                            "bg-white w-full rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center h-full transition-all duration-300",
                                            isActive
                                                ? "opacity-100 scale-100"
                                                : "opacity-40 scale-90"
                                        )}
                                    >
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-20 h-20 rounded-full mb-4"
                                        />

                                        <h3 className="text-xl font-bold">
                                            {testimonial.name}
                                        </h3>

                                        <p className="text-sm text-gray-400 mb-6">
                                            {testimonial.role}
                                        </p>

                                        <p className="text-gray-600 mb-8">
                                            {testimonial.text}
                                        </p>

                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-5 h-5",
                                                        i < testimonial.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}