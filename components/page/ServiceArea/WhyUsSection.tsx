import Container from "@/components/global/Sections/Container";
import SectionIntro from "@/components/global/SectionIntro";
import Text from "@/components/global/text";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import React from "react";
import {Title} from "@radix-ui/react-toast";

interface Offering {
    icon: { url: string; alt: string } | null;
    title: string;
    description: string;
    step?: number | null;
}

interface Props {
    label: string;
    title: string;
    description: string;
    offerings: Offering[];
    isStep?: boolean
}


function FeatureCard({title, description, icon, step}: Offering) {

    return (
        <div
            className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 h-full flex flex-col">
            {
                step && <div className={''}>
                    <p className={'text-neutral-50 text-xl lg:text-[40px]'}>{step}</p>
                </div>
            }
            <div className="">
                <img className={'w-14'} src={icon?.url} alt={icon?.alt}/>
            </div>
            <h3 className="text-[#1da1f2] font-bold text-lg mb-3 leading-tight">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

export default function WhyUsSection({label, title, description, offerings, isStep = false}: Props) {
    return (
        <section className="py-6 lg:py-12">
                <div className="relative z-10">
                    <div className=" grid lg:grid-cols-2 justify-between lg:items-end gap-2 lg:gap-16 mb-6 lg:mb-16">
                        <SectionIntro
                            badge={label}
                            title={title}
                            isLight
                            as={'h2'}
                        />
                        <Text variant={'body-lg'} className={'text-center lg:text-left'} textColor={'white'}>
                            {description}
                        </Text>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {offerings.map((item, idx) => (
                            <FeatureCard key={idx} step={isStep ? (idx+1) : null} title={item.title}
                                         description={item.description} icon={item.icon}/>
                        ))}
                    </div>
                </div>
        </section>
    );
}