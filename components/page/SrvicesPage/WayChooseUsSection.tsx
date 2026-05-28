import Image from "next/image";
import { ServicePageData } from "@/types/wp-services";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
import Text from "@/components/global/text";

interface Props {
    offerings: {
        icon: { url: string; alt: string };
        title: string;
        description: string;
    }[];
    description: string;
    title: string;
    label:string
}

export default function Features({ offerings, description  , title, label}: Props) {
    return (
        <section className="py-20  flex flex-col gap-10 bg-white font-sans">
            <SectionIntro
                badge={label}
                title={title}
                description={description}
                lgCenter
                as={'h2'}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerings.map((item, index) => (
                    <div key={index} className="border border-slate-100 rounded-2xl p-8 hover:border-primary-6 hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)]  bg-white">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={item.icon?.url || ""}
                                alt={item.icon?.alt || item.title}
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <Text as={'h3'} variant={"card-title-lg"} textColor={'primary'}>
                                {item.title}
                            </Text>
                        </div>
                        <Text variant={"card-subtitle-lg"} textColor={'light'}>
                            {item.description}
                        </Text>
                    </div>
                ))}
            </div>
        </section>
    );
}
