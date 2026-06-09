"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";

interface CommentItem {
    description: string;
    the_author: string;
    author_job: string;
    the_star: string;
}

interface MySliderProps {
    comments?: CommentItem[];
}

export default function MySlider({ comments = [] }: MySliderProps) {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const validComments = comments.filter(
        (item) => item.description || item.the_author
    );

    const hasMultiple = validComments.length > 1;

    return (
        <div className="relative w-full mt-4 h-full  testimonial-slider px-4 lg:px-10">
            <h3 className="mb-3 text-neutral-0 text-xl font-semibold">
                Client Feedback
            </h3>
            <div className="relative flex gap-10 items-start ">
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={setSwiper}
                    direction="vertical"
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={hasMultiple}
                    style={{ height: 240 }}
                    className={hasMultiple ? "pr-16 flex" : ""}
                >
                    {validComments.length > 0 ? (
                        validComments.map((item, index) => (
                            <SwiperSlide key={`${item.the_author}-${index}`}>
                                <div className="flex flex-col  h-full ">
                                    <p className="text-neutral-0/80 leading-relaxed line-clamp-4">
                                        {item.description || "No description"}
                                    </p>
                                    <div>
                                        <div className="w-full border-b border-dashed my-4 border-white/15" />

                                        <div className="flex justify-between flex-col lg:flex-row lg:items-center">
                                            <div>
                                                <p className="text-neutral-0 font-medium">
                                                    {item.the_author || "Anonymous"}
                                                </p>
                                                <p className="text-caption text-neutral-0/60">
                                                    {item.author_job || "-"}
                                                </p>
                                            </div>
                                            <StarRating
                                                rating={Number(item.the_star) || 0}
                                                readonly={true}
                                                size={16}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className="text-white text-center py-20">
                                No feedback available
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
                {hasMultiple && (
                    <div className="   hidden lg:flex flex-col items-center gap-2 ">
                        <button
                            type="button"
                            onClick={() => swiper?.slidePrev()}
                            aria-label="Previous testimonial"
                            className="w-8 h-8 flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        group
                                        border-white
                                        bg-transparent
                                        hover:bg-white shadow transition cursor-pointer"
                        >
                            <ChevronUp className="w-4 h-4 group-hover:text-primary-6 text-neutral-0" />
                        </button>

                        <div className="flex flex-col gap-2 my-2">
                            {validComments.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => swiper?.slideToLoop(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`w-[6px] h-[6px] rounded-full transition-all cursor-pointer ${
                                        i === activeIndex
                                            ? "bg-white scale-125"
                                            : "bg-white/30 hover:bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => swiper?.slideNext()}
                            aria-label="Next testimonial"
                            className="w-8 h-8 flex
                                        items-center
                                        justify-center
                                        group
                                        rounded-full
                                        bg-transparent
                                        hover:bg-neutral-0
                                        border
                                        border-neutral-0
                                        shadow
                                        transition
                                        cursor-pointer"
                        >
                            <ChevronDown className="w-4 h-4 group-hover:text-primary-6 text-neutral-0 " />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}