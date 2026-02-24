import React from "react";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";


// grid grid-cols-1  lg:grid-cols-12 gap-8 lg:gap-16 items-start
export const HeroSection: React.FC = () => {
    return (
        <div className="hero relative w-full px-4  2xl:px-0 flex items-center overflow-hidden ">
            <div className="hero__container flex gap-6 flex-col lg:flex-row  justify-between w-full ">
                <HeroContent  />
                <HeroStats />
            </div>
        </div>
    );
};
