import React from "react";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";

import { HeroSectionProps } from "@/modules/home/types";

interface Props {
    data: HeroSectionProps;
}

export const HeroSection: React.FC<Props> = ({ data }) => {
    return (
        <div className="hero relative w-full px-4 2xl:px-0 flex items-center overflow-hidden">
            <div className="hero__container flex gap-6 flex-col lg:flex-row justify-between w-full">
                <HeroContent />
                <HeroStats data={data} />
            </div>
        </div>
    );
};