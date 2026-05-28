import Container from "@/components/global/Sections/Container";
import SectionIntro from "@/components/global/SectionIntro";
import Text from "@/components/global/text";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import React from "react";

interface Offering {
    icon: { url: string; alt: string } | null;
    title: string;
    description: string;
}

interface Props {
    label: string;
    title: string;
    description: string;
    offerings: Offering[];
}


function FeatureCard({ title, description, icon }: Offering) {

    return (
        <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 h-full flex flex-col">
            <div className="mb-6">
                <img src={icon?.url} alt={icon?.alt}/>
            </div>
            <h3 className="text-[#1da1f2] font-bold text-lg mb-3 leading-tight">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

export default function WhyUsSection({ label, title, description, offerings }: Props) {
    return (
        <section className="py-12">
            <Container>
                <div className="relative z-10">
                    <div className=" grid grid-cols-2 justify-between lg:items-end gap-8 lg:gap-16 mb-16">
                        <SectionIntro
                            badge={label}
                            title={title}
                            isLight
                            as={'h2'}
                        />
                        <Text variant={'body-lg'} textColor={'white'} >
                            {description}
                        </Text>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {offerings.map((item, idx) => (
                            <FeatureCard key={idx} title={item.title} description={item.description}  icon={item.icon} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}