import Link from "next/link";
import Image from "next/image";
import Container from "@/components/global/Sections/Container";
import React from "react";
import SectionIntro from "@/components/global/SectionIntro";
import Text from "@/components/global/text";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/components/global/Icons";
import { WPImage } from "@/types/wp-common";



interface HeroSectionData {
    description: string;
    image: WPImage | null;
    label: string;
    our_benefits?: string[];
    title: string;
}

interface Props {
    data: HeroSectionData;
}

export function CategoryServiceHero({ data }: Props) {
    return (
        <section className="w-full py-4 lg:py-16">
            <Container>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="flex flex-col order-2 lg:order-1">
                        <SectionIntro
                            badge={data.label}
                            title={data.title}
                            as={"h1"}
                            description={data.description}
                        />

                        {(data.our_benefits?.length ?? 0) > 0 && (
                            <div className="mt-2 flex flex-col gap-2">
                                <Text variant={"heading-xs"}>Our Benefits</Text>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {data.our_benefits?.map((benefit, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-gray-700 text-sm"
                                        >
                                            <div className="w-5 h-5 flex justify-center rounded-full items-center bg-[#75DCBA] flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="10"
                                                    height="8"
                                                    viewBox="0 0 10 8"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.5775 7.1675C3.3775 7.1675 3.1875 7.0875 3.0475 6.9475L0.2175 4.1175C-0.0725 3.8275 -0.0725 3.3475 0.2175 3.0575C0.5075 2.7675 0.9875 2.7675 1.2775 3.0575L3.5775 5.3575L8.7175 0.2175C9.0075 -0.0725 9.4875 -0.0725 9.7775 0.2175C10.0675 0.5075 10.0675 0.987499 9.7775 1.2775L4.1075 6.9475C3.9675 7.0875 3.7775 7.1675 3.5775 7.1675Z"
                                                        fill="#1AC48B"
                                                    />
                                                </svg>
                                            </div>
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={"mt-6 lg:mt-10 flex"}>
                            <Link className={"w-full"} href={"/contact-us"}>
                                <Button size={"lg"} variant={"primary"}>
                                    <div className={"flex items-center gap-2"}>
                                        <CalendarIcon className={"w-6 h-6"} />
                                        Book A Free Consultation
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {data.image?.url && (
                        <div className="relative w-full order-1 lg:order-2 aspect-[4/3] rounded-3xl overflow-hidden">
                            <Image
                                src={data.image.url}
                                alt={data.image.alt || data.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}