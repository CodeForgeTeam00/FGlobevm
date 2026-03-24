import React from "react";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";
import { heroSectionImages } from "@/types/wordperess";

interface HeroSectionProps {
    data: heroSectionImages;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
    console.log(data , 'test1');
    return (
        <div className="hero relative w-full px-4 2xl:px-0 flex items-center overflow-hidden">
            <div className="hero__container flex gap-6 flex-col lg:flex-row justify-between w-full">
                <HeroContent />
                <HeroStats data={data} />
            </div>
        </div>
    );
};