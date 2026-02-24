import React from 'react';
import SectionIntro from "@/Components/global/SectionIntro";
import {MagicEditIcon} from "@/Components/global/Icons";
import Container from "@/Components/global/Sections/Container";
import FeatureLineCard from "@/Components/global/Cards/AccentLineCard";
import Image from "next/image";
import dots from "@/public/assets/image/Dots.svg";
const FEATURES = [
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions highly functional web solutions.',
    },
];

export const WhyChooseUs: React.FC = () => {
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
                        badge="Why GlobeVM"
                        title="Why Businesses Choose"
                        highlight="GlobeVM"
                        description="We don’t just fix problems after they happen. Our team monitors, secures, and maintains your environment around the clock to prevent costly disruptions. You get predictable performance, clear communication, and IT that actually supports your business goals."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                        {FEATURES.map((feature, index) => (
                            <FeatureLineCard
                                key={index}
                                icon={<MagicEditIcon className="w-8 h-8 text-primary-6" />}
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