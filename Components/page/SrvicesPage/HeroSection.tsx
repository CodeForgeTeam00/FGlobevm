import Image from "next/image";
import Container from "@/Components/global/Sections/Container";
import { Button } from "@/Components/Ui/button";
import { CalendarIcon, PhoneIcon } from "@/Components/global/Icons";
import { ServicePageData } from "@/types/wp-services";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";

interface Props {
    title: string;
    label: string;
    description: string;
    image: { url: string; alt: string };
    keyFeatures: {
        icon: { url: string; alt: string };
        title: string;
        description: string;
    }[];
}

export default function ServicesHeroSection({ title, label, description, image, keyFeatures }: Props) {
    return (
        <section className="relative  overflow-hidden max-w-[1920px] mx-auto">
            <div className="lg:flex w-full justify-between">
                <Container>
                    <div className="lg:min-w-[470px] lg:py-16 flex flex-col gap-6">
                        <div className={' lg:max-w-xl'}>
                            <SectionIntro
                                badge={label}
                                title={title}
                                description={description}
                            />
                        </div>
                        <div className="flex flex-col lg:justify-start justify-center sm:flex-row gap-2">
                            <Button variant="primary" size="lg">
                                <div className={'flex justify-center gap-2'}>
                                    <CalendarIcon className="w-5 h-5" />
                                    <p className="text-small">Book A Free Consultation</p>
                                </div>
                            </Button>
                            <Button variant="outline" size="lg">
                                <div className={'flex justify-center gap-2'}>
                                    <PhoneIcon className="w-5 h-5" />
                                    <p className="text-small">Get A Free Penetration Test</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </Container>
                {image?.url && (
                    <Image
                        src={image.url}
                        alt={image.alt || title}
                        width={808}
                        height={840}
                        className="relative object-cover  mt-8 lg:mt-0 w-full lg:max-w-[600px] xl:max-w-[808px] lg:h-[840px] lg:top-0"
                    />
                )}
            </div>
            <div className="bg-neutral-10 w-full  py-18 lg:pe-[120px] lg:ps-[190px] lg:absolute lg:translate-y-[-100%] max-w-[1454px]">
                <div className="grid md:grid-cols-3 p-6 lg:p-0 gap-20">
                    {keyFeatures.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-6">
                            {feature.icon &&
                                <Image
                                    src={feature?.icon?.url}
                                    alt={feature.icon?.alt || feature.title}
                                    width={64}
                                    height={64}
                                    className="w-16"
                                />
                            }
                            <div>
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
