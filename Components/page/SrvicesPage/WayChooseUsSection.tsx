import Image from "next/image";
import { ServicePageData } from "@/types/wp-services";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";

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
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerings.map((item, index) => (
                    <div key={index} className="border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={item.icon?.url || ""}
                                alt={item.icon?.alt || item.title}
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <h3 className="text-xl font-serif font-bold text-sky-500">
                                {item.title}
                            </h3>
                        </div>
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
