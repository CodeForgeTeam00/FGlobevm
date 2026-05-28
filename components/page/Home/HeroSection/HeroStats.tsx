import React from "react";
import { HeroSectionProps } from "@/modules/home/types";
import {HomeIcon} from "@/components/global/Icons";
import Text from "@/components/global/text";
import {TimerIcon} from "lucide-react";
import Image from "next/image";

interface HeroStatsProps {
    data: HeroSectionProps;
}
export const HeroStats: React.FC<HeroStatsProps> = ({ data }) => {
    const { primaryImageUrl, secondaryImageUrl , secondaryAlt , primaryAlt } = data;

    return (
        <div className="hero__stats
                    lg:max-w-[582px]  2xl:!max-w-[776px]
                    w-full
                    items-center
                    flex flex-col sm:flex-row
                    gap-6
                    relative
                    ">

            <div className="hero__stats-left flex flex-col flex-1 gap-6 w-full lg:max-w-[264px] 2xl:!max-w-[352px]">
                <div className="hero__card bg-neutral-10 rounded-3xl relative lg:mt-20 p-6 lg:p-8 pt-14">
                    <div className="hero__card-icon w-10 h-10 md:w-16 md:h-16 bg-black rounded-full absolute top-[-20px] md:top-[-32px] flex items-center justify-center">
                        <TimerIcon className="h-5 w-5 lg:w-8 lg:h-8 text-primary-6" />
                    </div>
                    <div className="hero__card-content mb-6">
                        <Text textColor={'light'} variant={'card-title-md'}>24/7 Always-On IT Protection%</Text>
                        <Text textColor={'black'} variant={'card-subtitle-lg'}>
                            Proactive monitoring, secure cloud support,
                            and fast response before issues slow your business down.
                        </Text>
                    </div>
                </div>
                <div
                    className="hero__mini-card bg-neutral-black text-neutral-30 py-3 px-4 lg:px-6 rounded-2xl gap-4 flex items-center">
                    <div className=" min-w-10 lg:min-w-16  h-10 lg:h-16 rounded-full bg-primary-6 flex items-center justify-center text-caption">
                        <svg xmlns="http://www.w3.org/2000/svg" className={'w-5 h-5 lg:w-8 lg:h-8'} width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M24.7201 5.56L17.3867 2.81333C16.6267 2.53333 15.3867 2.53333 14.6267 2.81333L7.2934 5.56C5.88006 6.09333 4.7334 7.74667 4.7334 9.25333V20.0533C4.7334 21.1333 5.44007 22.56 6.30673 23.2L13.6401 28.68C14.9334 29.6533 17.0534 29.6533 18.3467 28.68L25.6801 23.2C26.5467 22.5467 27.2534 21.1333 27.2534 20.0533V9.25333C27.2667 7.74667 26.1201 6.09333 24.7201 5.56ZM17.0001 17.16V20.6667C17.0001 21.2133 16.5467 21.6667 16.0001 21.6667C15.4534 21.6667 15.0001 21.2133 15.0001 20.6667V17.16C13.6534 16.7333 12.6667 15.48 12.6667 14C12.6667 12.16 14.1601 10.6667 16.0001 10.6667C17.8401 10.6667 19.3334 12.16 19.3334 14C19.3334 15.4933 18.3467 16.7333 17.0001 17.16Z" fill="white"/>
                        </svg>
                    </div>
                    <div className="flex flex-col text-caption">
                        <Text textColor={'white'} variant={'card-title-md'}>
                            Protected Systems
                        </Text>
                        <Text className={'!text-neutral-30'} variant={'card-subtitle-md'}>
                            Monitoring, security, and support in one place.
                        </Text>
                    </div>
                </div>
            </div>
            <div className="hero__media flex flex-row-reverse sm:flex-col flex-1 gap-6">
                <div className="hero__placeholder relative w-full">
                    <Image
                        src={primaryImageUrl}
                        alt={primaryAlt ?? "title"}
                        width={636}
                        height={400}
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="w-full h-auto"
                    />
                </div>
                <div className="hero__image w-full overflow-hidden">
                    <Image
                        src={secondaryImageUrl}
                        alt={secondaryAlt ?? "title"}
                        width={636}
                        height={400}
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="rounded-xl w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};