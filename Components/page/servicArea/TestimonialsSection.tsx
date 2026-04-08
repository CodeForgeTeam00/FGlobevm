"use client"
interface TestimonialCardProps {
    name: string;
    role: string;
    image: string;
    quote: string;
}

 function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
    return (
        <div className="bg-white rounded-[1.5rem] p-8 sm:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col select-none">
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-50"
                    referrerPolicy="no-referrer"
                />
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
                    <p className="text-sm text-gray-400 font-medium">{role}</p>
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
                {quote}
            </p>
        </div>
    );
}
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';


const testimonials = [
    {
        id: 1,
        name: "John Anderson",
        role: "CEO at Innovate Solutions",
        image: "https://picsum.photos/seed/john/100/100",
        quote: "Their attention to detail and creative design approach transformed our website into a visually stunning and highly functional platform. We've seen a 30% increase in traffic since the relaunch. I highly recommend them to anyone seeking professional web design services!"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "CTO at TechFlow",
        image: "https://picsum.photos/seed/sarah/100/100",
        quote: "The proactive IT management has been a game-changer for our team. We no longer worry about downtime or security breaches. Their 24/7 support is truly exceptional and always ready to help."
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Director of Operations",
        image: "https://picsum.photos/seed/michael/100/100",
        quote: "Scaling our infrastructure used to be a nightmare until we partnered with GlobeVM. They handled our cloud migration seamlessly and continue to provide top-tier cybersecurity protection."
    },
    {
        id: 4,
        name: "John Anderson",
        role: "CEO at Innovate Solutions",
        image: "https://picsum.photos/seed/john/100/100",
        quote: "Their attention to detail and creative design approach transformed our website into a visually stunning and highly functional platform. We've seen a 30% increase in traffic since the relaunch. I highly recommend them to anyone seeking professional web design services!"
    },
    {
        id: 5,
        name: "Sarah Jenkins",
        role: "CTO at TechFlow",
        image: "https://picsum.photos/seed/sarah/100/100",
        quote: "The proactive IT management has been a game-changer for our team. We no longer worry about downtime or security breaches. Their 24/7 support is truly exceptional and always ready to help."
    },
    {
        id: 6,
        name: "Michael Chen",
        role: "Director of Operations",
        image: "https://picsum.photos/seed/michael/100/100",
        quote: "Scaling our infrastructure used to be a nightmare until we partnered with GlobeVM. They handled our cloud migration seamlessly and continue to provide top-tier cybersecurity protection."
    }
];

export default function TestimonialsSection() {
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

    return (
        <section className="py-24 overflow-hidden">
            <div className=" px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">


                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => swiperRef?.slidePrev()}
                                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1da1f2] hover:text-white transition-all duration-300 border border-gray-100 hover:border-transparent shadow-sm"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} strokeWidth={2} />
                            </button>
                            <button
                                onClick={() => swiperRef?.slideNext()}
                                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1da1f2] hover:text-white transition-all duration-300 border border-gray-100 hover:border-transparent shadow-sm"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Swiper */}
                    <div className="lg:col-span-7 relative">
                        <div className="w-full">
                            <Swiper
                                modules={[Navigation]}
                                onSwiper={setSwiperRef}
                                slidesPerView={1}
                                spaceBetween={24}

                                slidesOffsetBefore={100}
                                breakpoints={{
                                    640: { slidesPerView: 1.2 },
                                    1024: { slidesPerView: 1.2 },
                                    1280: { slidesPerView: 2.4 }
                                }}
                                className="testimonial-swiper !overflow-visible"
                            >
                                <SwiperSlide  className="h-auto">
                                    <div className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-6 bg-white shadow-sm">
                                        Client Feedback
                                    </div>

                                    <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-[1.2]">
                                        Trusted by Businesses That Value <span className="text-[#1da1f2]">Reliability</span>
                                    </h2>

                                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
                                        Business owners trust GlobeVM to keep their operations secure and reliable.
                                        Our clients value our responsiveness, technical expertise, and ability to
                                        prevent problems before they impact productivity.
                                    </p>

                                </SwiperSlide>
                                {testimonials.map((testimonial) => (
                                    <SwiperSlide key={testimonial.id} className="h-auto">
                                        <TestimonialCard
                                            name={testimonial.name}
                                            role={testimonial.role}
                                            image={testimonial.image}
                                            quote={testimonial.quote}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
