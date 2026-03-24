import React from "react";
import { HomeIcon } from "@/Components/global/Icons";
interface ImagesProps {
    hero_primary_image: string;
    hero_secondary_image: string;
}
interface HeroStatsProps {
    data: ImagesProps;
}
export const HeroStats: React.FC<HeroStatsProps> = ({ data }) => {
    const { hero_primary_image, hero_secondary_image } = data;
    console.log(data , 'test2');
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
                <div className="hero__card bg-neutral-10 rounded-3xl relative lg:mt-20 p-8 pt-14">
                    <div className="hero__card-icon w-10 h-10 md:w-16 md:h-16 bg-black rounded-full absolute top-[-20px] md:top-[-32px] flex items-center justify-center">
                        <HomeIcon className="h-5 w-5 lg:w-8 lg:h-8" />
                    </div>
                    <div className="hero__card-content mb-6">
                        <span className="text-caption text-neutral-100">25%</span>
                        <h3 className="text-small lg:text-title-medium text-neutral-black leading-[2] mt-3 tracking-tight">
                            Stay informed with the latest tips, trends, and best practices in IT, virtualization
                        </h3>
                    </div>

                    <div className="hero__progress flex flex-col gap-2">
                        <div className="flex justify-between text-footnote text-neutral-100">
                            <span>+ 23 Performance</span>
                        </div>

                        <div className="w-full h-[6px] bg-[#f1f5f9] rounded-full">
                            <div className="bg-[#42468C] h-full w-[65%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]"></div>
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
            <div className="hero__media flex flex-row-reverse sm:flex-col flex-1 gap-6">
                <div className="hero__placeholder relative w-full">
                    {/*<Image*/}
                    {/*    src={hero_secondary_image}*/}
                    {/*    width={400}*/}
                    {/*    height={300}*/}
                    {/*    className="rounded-xl w-full"*/}
                    {/*    alt="hero secondary"*/}
                    {/*/>*/}
                    <img src={hero_secondary_image} alt=""/>
                </div>
                <div className="hero__image w-full overflow-hidden">
                    {/*<Image*/}
                    {/*    src={hero_primary_image}*/}
                    {/*    width={400}*/}
                    {/*    height={300}*/}
                    {/*    className="rounded-xl w-full"*/}
                    {/*    alt="hero primary"*/}
                    {/*/>*/}
                    <img src={hero_primary_image} alt=""/>
                </div>
            </div>
        </div>
    );
};
