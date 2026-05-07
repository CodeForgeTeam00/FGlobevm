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
        <section className="relative overflow-hidden py-6 px-6 lg:py-[96]">
            <div className="absolute hidden lg:block inset-0 pointer-events-none">
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -top-[25vw] -left-[45vw]
                        4xl:top-[-500] 4xl:left-[-900]
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
                         4xl:top-[-500] 4xl:left-[-830]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -bottom-[72vw] -right-[37vw] 4xl:bottom-[-1365] 4xl:right-[-765]
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
                        -bottom-[69vw] -right-[36vw] 4xl:bottom-[-1274] 4xl:right-[-700]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <Image src={dots} alt="dots"  className={'absolute right-[90] top-[155]'}/>
            </div>
            <Container>
                <div className="relative text-center  flex flex-col gap-6 lg:gap-10">

                    <SectionIntro
                        lgCenter
                        badge={content.badge}
                        title={content.title}
                        description={content.des}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                        {features.map((feature, index) => (
                            <FeatureLineCard
                                key={index}
                                icon={<MagicEditIcon className="min-w-8 h-8 text-primary-6" />}
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