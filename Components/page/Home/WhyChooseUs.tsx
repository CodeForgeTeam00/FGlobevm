
import React from 'react';
import { Wand2 } from 'lucide-react';
import SectionIntro from "@/Components/global/SectionIntro";
import {MagicEditIcon} from "@/Components/global/Icons";

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
        <section className="relative py-6 px-6  overflow-hidden">

            <div className=" text-center flex flex-col gap-6">
                <SectionIntro
                    lgCenter
                    badge="Why GlobeVM"
                    title={`Why Businesses Choose`}
                    highlight="GlobeVM"
                    description="We don’t just fix problems after they happen. Our team monitors, secures, and maintains your environment around the clock to prevent costly disruptions. You get predictable performance, clear communication, and IT that actually supports your business goals."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                        >
                            <div
                                className=" p-6 border flex flex-col gap-2 border-neutral-30 rounded-3xl"
                            >
                                <div className={'flex items-center gap-4'}>
                                    <div className=' '>
                                        <MagicEditIcon className='w-8 h-8 text-primary-6'/>
                                    </div>
                                    <h3 className="font-bold">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-start text-small lg:text-base leading-[28px] text-neutral-100">
                                    {feature.description}
                                </p>
                            </div>
                            <div className={'mx-6 h-2  bg-primary-6 rounded-b-2xl'} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};