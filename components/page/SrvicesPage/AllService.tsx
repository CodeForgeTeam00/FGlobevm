import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/global/Sections/Container";
import {Card} from "@/types/wp-services";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
import Text from "@/components/global/text";
import Link from "next/link";
interface Props {
    label: string;
    title: string;
    description: string;
    services: Card[];
}
export default function AllServices({ label, title, description, services  }: Props) {
    return (
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {services.map((service, idx) => (
                                <Link href={service.slug}>
                                    <div
                                        key={idx}
                                        className="bg-neutral-0 p-6 flex gap-4 rounded-3xl "
                                    >
                                        <div className="flex-shrink-0  ">
                                            <div className="w-12 h-12 md:w-18 md:h-18 rounded-full bg-neutral-10 flex items-center justify-center ">
                                                <Image
                                                    src={service.icon.url}
                                                    alt={service.icon.alt || service.title}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 lg:w-10 lg:h-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Text as={'h3'} variant={'card-title-lg'}>
                                                {service.title}
                                            </Text>
                                            <Text variant={'card-subtitle-lg'} textColor={'light'}>
                                                {service.description}
                                            </Text>

                                            <div className="text-primary-6  flex items-center gap-1 mt-auto ">
                                                <Text variant={'link'}>
                                                    Show More
                                                </Text>
                                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
    );
}