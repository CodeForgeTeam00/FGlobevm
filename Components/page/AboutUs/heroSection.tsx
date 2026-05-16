import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import Container from "@/Components/global/Sections/Container";
import { StatsBar } from "./StatsBar";
import SectionIntro from "@/Components/global/SectionIntro";
import { WPImage } from "@/types/wp-common";
import {Button} from "@/Components/Ui/button";
import Text from "@/Components/global/text";
import React from "react";

interface HeroSectionProps {
    featuredImage?: WPImage;
}

export default function HeroSection({ featuredImage }: HeroSectionProps) {
    const imageSrc = featuredImage?.url || "/assets/image/about-hero.jpg";

    return (
        <section
            aria-label="About GlobeVM"
            className="relative bg-black  mb-20"
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-20 pb-32 sm:pt-28 sm:pb-40">
                    <div className="flex flex-col gap-6">
                        <SectionIntro
                            badge="About us"
                            title="Proactive IT That Keeps Your Business Secure"
                            isLight
                            description="We manage, secure, and optimize your infrastructure so your team can focus on growth instead of downtime. From virtual environments to network protection, we keep your systems stable, fast, and protected."
                        />
                        <div className="flex flex-wrap items-center gap-4">

                            <Link
                                href="/contact-us"
                            >
                                <Button variant={'primary'} size="lg">
                                    <div className="flex items-center justify-center gap-2">
                                        <Calendar size={18}  className={"w-6 h-6 text-white"}/>
                                        <Text className={'group-hover:text-primary-6'} variant={'body-md'}>
                                            Get A Free Penetration Test</Text>
                                    </div>
                                </Button>


                            </Link>
                            <a
                                href="tel:3107504939" rel={'nofollow'}>

                                <Button variant={'outline'} size="lg">
                                    <div className="flex items-center justify-center gap-2">
                                        <Phone size={18}  className={"w-6 h-6 group-hover:text-primary-6"}/>
                                        <Text className={'group-hover:text-primary-6'} variant={'body-md'}> Book A Free Consultation</Text>
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="relative w-full hidden lg:block">
                        <Image
                            src={imageSrc}
                            alt="GlobeVM IT security professional"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </Container>

            <StatsBar />
        </section>
    );
}
