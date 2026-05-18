import {Rocket} from "lucide-react";
import Image from "next/image";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";
import Text from "@/Components/global/text";

interface Service {
    icon: { url: string; alt: string } | null;
    title: string;
    description: string;
}

interface Props {
    label: string;
    title: string;
    description: string;
    services: Service[];
}

function ServiceCard({title, description, icon}: Service) {
    return (
        <div className={'p-6 pt-0  border flex flex-col items-start  hover:border-primary-6 hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)]  border-neutral-30 rounded-3xl'}>
            <div className={'w-full flex justify-end'}>
                <div className={'py-5 px-4  rounded-b-4xl    bg-primary-6'}>
                    {icon?.url ? (
                        <Image src={icon.url} alt={icon.alt || title} width={22} height={22} className="w-6 h-6 text-white" />
                    ) : (
                        <Rocket size={24} className="text-white"/>
                    )}
                </div>
            </div>
            <div className={'flex flex-col gap-4'}>
                <Text variant={'card-title-lg'}>
                    {title}
                </Text>
                <Text variant={'card-subtitle-lg'} >
                    {description}
                </Text>
            </div>
        </div>
    );
}


export default function ServicesSection({label, title, description, services}: Props) {
    return (
        <section className="py-24 relative flex flex-col gap-6 lg:gap-10">
            <SectionIntro
                badge={label}
                title={title}
                description={description}
                lgCenter
                as={"h2"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
}
