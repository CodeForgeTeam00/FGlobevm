import React from "react";
import Image from "next/image";
import { HomeIcon } from "@/Components/global/Icons";
import heroSectionV from "@/public/assets/image/heroSectionV.jpg";
import pik from "@/public/assets/image/pik.png"
export const HeroStats: React.FC = () => {
    return (
        <div className="hero__stats
                        lg:max-w-[776px]
                        w-full
                        items-center
                        flex
                        gap-6
                        relative
                        ">
            <div className="hero__stats-left flex flex-col gap-6 w-full lg:max-w-[352px]">
                <div className="hero__card bg-neutral-10 rounded-3xl relative lg:mt-20 p-8 pt-14">
                    <div className="hero__card-icon w-10 h-10 lg:w-16 lg:h-16 bg-black rounded-full absolute top-[-32px] flex items-center justify-center">
                        <HomeIcon className="h-5 w-5 lg:w-8 lg:h-8" />
                    </div>
                    <div className="hero__card-content mb-6">
                        <span className="text-caption text-neutral-100">25%</span>
                        <h3 className="text-small  lg:text-title-medium text-neutral-black leading-[2] mt-3 tracking-tight">
                            Stay informed with the latest tips, trends, and best practices in IT, virtualization
                        </h3>
                    </div>
                    <div className="hero__progress flex flex-col gap-2">
                        <div className="flex justify-between text-footnote text-neutral-100">
                            <span>+ 23 Performance</span>
                        </div>
                        <div className="w-full h-[6px] bg-[#f1f5f9] rounded-full">
                            <div className="bg-[#4f46e5] h-full w-[65%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]"></div>
                        </div>
                    </div>
                </div>
                <div className="hero__mini-card bg-neutral-black text-neutral-30 py-3 px-4 rounded-2xl gap-4 flex items-center">
                    <div className="w-16 h-16 rounded-full text-neutral-0 bg-primary-6 flex items-center justify-center text-caption">
                        99
                    </div>
                    <div className="flex flex-col text-caption">
                        <span className="text-neutral-0">Title</span>
                        <span className="text-neutral-30">Description</span>
                    </div>
                </div>
            </div>
            <div className="hero__media flex lg:flex-col gap-6">
                <div className="hero__placeholder relative max-w-[400] w-full">
                    <Image src={pik} className="rounded-xl" alt="heroSection" />
                </div>
                <div className="hero__image max-w-[400] w-full overflow-hidden">
                    <Image src={heroSectionV} className="rounded-xl" alt="heroSection" />
                </div>
            </div>
        </div>
    );
};
