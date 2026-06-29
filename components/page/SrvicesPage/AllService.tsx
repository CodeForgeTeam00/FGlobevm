import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Container from "@/components/global/Sections/Container";
import { Card } from "@/types/wp-services";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
import Text from "@/components/global/text";
import Link from "next/link";

interface Props {
    label: string;
    title: string;
    description: string;
    services: Card[];
    isPrimary?: boolean;
    isLg?: boolean;
}

export default function AllServices({
                                        label,
                                        title,
                                        description,
                                        services,
                                        isPrimary = false,
                                        isLg = false,
                                    }: Props) {
    return (
        <Container>
            <div className="relative z-10">
                <div
                    className={`grid lg:items-center gap-8 lg:gap-16 mb-6 lg:mb-16 ${
                        isPrimary && "grid-cols-2 !lg:items-end justify-between "
                    }`}
                >
                    <SectionIntro
                        badge={label}
                        title={title}
                        description={!isPrimary ? description : null}
                        isLight={isPrimary}
                        lgCenter={!isPrimary}
                        as={"h2"}
                    />
                    {isPrimary && (
                        <Text variant={"body-lg"} textColor={"white"}>
                            {description}
                        </Text>
                    )}
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-6 ${isLg && "lg:grid-cols-3"} `} >
                    {services.map((service, idx) => {
                        const card = (
                            <div className="bg-neutral-0 border border-neutral-30 p-6 flex gap-4 rounded-3xl h-full">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 md:w-18 md:h-18 rounded-full bg-neutral-10 flex items-center justify-center">
                                        {service.icon?.url && (
                                            <Image
                                                src={service.icon.url}
                                                alt={service.icon.alt || service.title}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6 lg:w-10 lg:h-10"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Text as={"h3"} variant={"card-title-lg"}>
                                        {service.title}
                                    </Text>
                                    <Text variant={"card-subtitle-lg"} textColor={"light"}>
                                        {service.description}
                                    </Text>
                                    {service.slug && (
                                        <div className="text-primary-6 flex items-center gap-1 mt-auto">
                                            <Text variant={"link"}>Show More</Text>
                                            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );

                        return service.slug ? (
                            <Link key={idx} href={service.slug}>
                                {card}
                            </Link>
                        ) : (
                            <div key={idx}>{card}</div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}