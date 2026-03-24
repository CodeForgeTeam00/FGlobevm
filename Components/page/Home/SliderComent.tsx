"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { StarRating } from "@/Components/Ui/star-rating";
interface CommentItem {
    description: string;
    the_author: string;
    author_job: string;
    the_star: string;
}

export default function MySlider({ comments }: { comments: CommentItem[] }) {
    return (
        <div className="w-full mt-4 h-full testimonial-slider">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} 
                                custom-bullet 
                                !w-2 
                                !h-2 
                                !bg-white/20 
                                !opacity-100 
                                transition-all 
                                duration-300
                                        [&.swiper-pagination-bullet-active]:!bg-white
                                            [&.swiper-pagination-bullet-active]:scale-125
                                "></span>`;
                    },
                }}
                className="pb-10"
            >
                {comments?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col mb-20">
                            <h3 className={'mb-3 text-neutral-0 text-xl font-semibold'}>
                                Client Feedback
                            </h3>

                            <p className={'text-neutral-0/80 leading-relaxed'}>
                                {item.description || "No description"}
                            </p>

                            <div className={'w-full border-b border-dashed my-4 border-white/15'}/>

                            <div className={'flex justify-between items-center'}>
                                <div>
                                    <p className={'text-neutral-0 font-medium'}>
                                        {item.the_author || "Anonymous"}
                                    </p>
                                    <p className={'text-caption text-neutral-0/60'}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}