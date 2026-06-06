import Image from "next/image";
import Link from "next/link";
import {Calendar, Phone} from "lucide-react";
import Container from "@/components/global/Sections/Container";
import {StatsBar} from "./StatsBar";
import SectionIntro from "@/components/global/SectionIntro";
import {WPImage} from "@/types/wp-common";
import {Button} from "@/components/ui/button";
import Text from "@/components/global/text";
import React from "react";

interface HeroSectionProps {
    featuredImage?: WPImage;
}

export default function HeroSection({featuredImage}: HeroSectionProps) {
    const imageSrc = featuredImage?.url || "";

    return (
        <section
            aria-label="About GlobeVM"
            className="relative   py-16 bg-black">
            <Container >
                <div className="grid lg:grid-cols-2  items-start sm:items-center relative ">
                    <div className="flex flex-col z-2 top-12 lg:top-0 absolute lg:relative lg:max-w-[636px] gap-6">
                        <SectionIntro
                            badge="About us"
                            title="The Team Behind GlobeVM — 30+ Years of IT Expertise"
                            isLight
                            as={'h1'}
                            description="We manage, secure, and optimize your infrastructure so your business stays protected. From virtual environments to network protection, we keep your systems stable, fast, and running."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                className={'w-full'}
                                href="/contact-us"
                            >
                                <Button className={'w-full'} variant={'primary'} size="lg">
                                    <div className="flex items-center justify-center gap-2">
                                        <Calendar size={18}  className={"w-6 h-6 text-white"}/>
                                        <Text className={'group-hover:text-primary-6'} variant={'body-md'}>
                                            Get A Free Penetration Test</Text>
                                    </div>
                                </Button>
                            </Link>
                            <a
                                className={'w-full'}
                                href="tel:3107504939" rel={'nofollow'}>
                                <Button className={'w-full'} variant={'outline'} size="lg">
                                    <div className="flex items-center justify-center gap-2">
                                        <Phone size={18}  className={"w-6 h-6 group-hover:text-primary-6"}/>
                                        <Text className={'group-hover:text-primary-6'} variant={'body-md'}> Book A Free Consultation</Text>
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className=" xl:w-[637px] mx-auto   lg:relative sm:w-3/5 lg:w-[500px]   lg:block">
                        <Image
                            src={featuredImage?.url || ""}
                            alt={ featuredImage?.alt ||"GlobeVM IT security professional"}
                            width={1200}
                            height={600}
                            priority
                            className="object-cover !relative  h-[600px] bottom-0  object-center"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
