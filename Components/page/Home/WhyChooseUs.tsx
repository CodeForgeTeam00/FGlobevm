import React from 'react';
import SectionIntro from "@/Components/global/SectionIntro";
import {MagicEditIcon} from "@/Components/global/Icons";
import Container from "@/Components/global/Sections/Container";
import FeatureLineCard from "@/Components/global/Cards/AccentLineCard";
import Image from "next/image";
import dots from "@/public/assets/image/Dots.svg";
import {useDictionary} from "@/lib/useDictionary";
export const WhyChooseUs: React.FC = () => {
    const dict = useDictionary();
    const content = dict.home.whyChooseUs.content;
    const features = dict.home.whyChooseUs.features;
    return (

        <section className="relative overflow-hidden py-6  lg:py-[96] mx-auto max-w-[1920px]">

            <div className="absolute hidden lg:block inset-0 pointer-events-none">
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -top-[25vw] -left-[45vw]
                        4xl:top-[-500px] 4xl:left-[-900px]
                        rounded-full
                        gradient-circle-light-gray
                       "
                />

                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -top-[25vw] -left-[43vw]
                         4xl:top-[-500px] 4xl:left-[-830px]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -bottom-[72vw] -right-[37vw] 4xl:bottom-[-1365px] 4xl:right-[-765px]
                        rotate-[-45deg]
                        rounded-full
                        gradient-circle-light-gray
                    "
                />
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -bottom-[69vw] -right-[36vw] 4xl:bottom-[-1274px] 4xl:right-[-700px]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <Image src={dots} alt="dots"  className={'absolute right-[90] top-[155px]'}/>
            </div>
            <Container>
                <div className="relative text-center  flex flex-col gap-6 lg:gap-10">
                    <SectionIntro
                        as={'h2'}
                        lgCenter
                        badge={content.badge}
                        title={content.title}
                        description={content.des}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                        {features.map((feature, index) => (
                            <FeatureLineCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};