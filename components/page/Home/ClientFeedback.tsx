import React from "react";
import Image from "next/image";
import SectionIntro from "@/components/global/SectionIntro";
import { QuoteIcon } from "@/components/global/Icons";
import MySlider from "@/components/page/Home/SliderComent";
import {AvatarGroupImage} from "@/components/page/Home/AvatarGroup";
import { WPImage } from "@/types/wp-common";
import Text from "@/components/global/text";

interface CommentItem {
    description: string;
    the_author: string;
    author_job: string;
    the_star: string;
}

interface ClientFeedbackProps {
    comments: CommentItem[];
    image: WPImage;
}

export const ClientFeedback: React.FC<ClientFeedbackProps> = ({ comments, image }) => {
    return (
        <div className="relative py-24  flex flex-col gap-10 overflow-hidden">
            <SectionIntro
                lgCenter
                badge="Client Feedback"
                title=" What Our Clients Say"
                as={'h2'}
                description="  Rated 5.0 on Google"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <div className="lg:py-10  py-6 rounded-3xl h-[343px] gradient-primary overflow-hidden relative">
                        <div className="w-[424px] h-[424px] absolute rounded-full translate-x-[35%] left-2/4 bottom-2/4 flex justify-center items-center bg-white/5">
                            <div className="w-[298px] h-[298px] flex rounded-full justify-center items-center bg-white/10">
                                <div className="w-[172px] h-[172px] rounded-full bg-white/15" />
                            </div>
                        </div>
                        <div>
                            <div className="relative px-10">
                                <QuoteIcon className="w-13 h-13 text-neutral-0" />
                                <svg
                                    className="absolute left-[43px] bottom-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="66"
                                    height="56"
                                    viewBox="0 0 66 56"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M19.0088 53L19.0088 43.7744L18.5088 43.7744C16.8008 43.7744 15.4362 43.3086 14.375 42.4111L14.3643 42.4023L14.3525 42.3936C13.2589 41.5714 12.3506 40.4319 11.6367 38.9561C10.9194 37.4731 10.4019 35.7688 10.0898 33.8379C9.89978 32.1636 9.79845 30.4894 9.78125 28.8154L16.4004 28.8154C19.5269 28.8152 22.0332 26.2004 22.0332 23.0098L22.0332 10.0537C22.0331 6.86316 19.5268 4.24827 16.4004 4.24805L6.13378 4.24805C3.00718 4.24805 0.500064 6.86303 0.499996 10.0537L0.499998 28.3154C0.499998 31.638 0.821188 34.7461 1.4668 37.6377L1.46973 37.6504C2.22312 40.6539 3.30284 43.282 4.71484 45.5273L4.72461 45.541C6.25064 47.7943 8.16154 49.6014 10.4551 50.9561C12.7713 52.3241 15.4617 53 18.5088 53L19.0088 53ZM49.8086 53L49.8086 43.7744L49.3086 43.7744C47.6007 43.7743 46.236 43.3086 45.1748 42.4111L45.1641 42.4023L45.1523 42.3936C44.0588 41.5714 43.1514 40.4318 42.4375 38.9561C41.7219 37.4768 41.2049 35.7775 40.8926 33.8525L40.8184 33.1602C40.6741 31.7118 40.5959 30.2636 40.5811 28.8154L47.2002 28.8154C50.3268 28.8153 52.833 26.2004 52.833 23.0098L52.833 10.0537C52.8329 6.86309 50.3267 4.24815 47.2002 4.24805L36.9336 4.24805C33.807 4.24805 31.2999 6.86303 31.2998 10.0537L31.2998 28.3154C31.2998 31.6379 31.621 34.7461 32.2666 37.6377L32.2695 37.6504L32.2705 37.6504C33.0239 40.6539 34.1036 43.282 35.5156 45.5273L35.5195 45.5342L35.5244 45.541C37.0504 47.7942 38.9614 49.6014 41.2549 50.9561C43.571 52.324 46.2616 52.9999 49.3086 53L49.8086 53Z"
                                        stroke="#C1C7D0"
                                    />
                                </svg>
                            </div>
                            <MySlider comments={comments} />
                        </div>
                    </div>
                    <div className="p-10 border border-neutral-30 rounded-3xl lg:items-center flex-col lg:flex-row  bg-neutral-10 flex gap-5">
                        <AvatarGroupImage />
                        <div>
                            <Text variant={'card-title-lg'}>75+ Businesses Protected</Text>

                            <p className="text-lg leading-[32px] text-neutral-100">
                                Serving companies across Southern California
                            </p>
                        </div>
                    </div>
                </div>
                <Image
                    src={image.url}
                    alt={image.alt || "Client feedback"}
                    width={600}
                    height={800}
                    className="w-full h-auto hover:scale-[101%] transition-transform duration-300 rounded-3xl"
                />
            </div>
        </div>
    );
};