import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Container from "@/Components/global/Sections/Container";
import {Card} from "@/types/wp-services";

interface SubService {
    icon: { url: string; alt: string };
    title: string;
    description: string;
}

interface Props {
    label: string;
    title: string;
    description: string;
    services: Card[];
}

export default function AllServices({ label, title, description, services }: Props) {
    console.log(services , '[hallo]')
    return (
                <Container>
                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16">
                            <div className="flex-1">
                                <div className="inline-block border border-white/30 text-white rounded-full px-5 py-1.5 text-xs font-medium mb-6 backdrop-blur-sm">
                                    {label}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                                    {title}
                                </h2>
                            </div>
                            <div className="flex-1 lg:max-w-lg text-white/90 text-sm md:text-base leading-relaxed lg:pt-14">
                                {description}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {services.map((service, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-4 md:gap-5 group cursor-pointer"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                                            <Image
                                                src={service.icon.url}
                                                alt={service.icon.alt || service.title}
                                                width={24}
                                                height={24}
                                                className="w-5 h-5 md:w-6 md:h-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                                            {service.description}
                                        </p>
                                        <div className="text-sky-500 text-xs md:text-sm font-medium flex items-center gap-1 mt-auto w-fit">
                                            Show More <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
    );
}