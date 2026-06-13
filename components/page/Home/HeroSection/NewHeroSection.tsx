import Link from "next/link";
import Image from "next/image";
import Container from "@/components/global/Sections/Container";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
import {useDictionary} from "@/lib/useDictionary";
import {CalendarIcon, PhoneIcon} from "@/components/global/Icons";
import {Button} from "@/components/ui/button";
import Text from "@/components/global/text";
import {WPImage} from "@/types/wp-common";
export function NewHeroSection({ image }: { image: WPImage }) {
    const dict = useDictionary();
    const content = dict.home.heroSection.content;
    const actions = [
        {
            label: content.primaryBtn,
            icon: CalendarIcon,
            variant: "primary" as const,
            href: "/contact-us",
            internal: true,
        },
        {
            label: content.secondaryBtn,
            icon: PhoneIcon,
            variant: "outline" as const,
            href: "tel:(310)750-4939",
            internal: false,
        },
    ];
    return (
        <section className="relative w-full  lg:h-screen lg:max-h-[820px] overflow-hidden">
            <Image
                src={image.url ?? null}
                alt={image.alt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover object-right"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 "
                style={{
                    background: `
                        linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%),
                        linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 50%)
                    `,
                }}
            />

            <Container>
                <div className="w-full h-full mt-4 lg:mt-[200px]">
                    <div className="max-w-[623px] flex flex-col mx-auto lg:mx-0">
                        <SectionIntro
                            isLight={true}
                            badge={content.badge}
                            title={content.title}
                            as="h1"
                            description={content.des}
                        />

                        <div className="hero__actions mt-6 w-full lg:mt-10 grid sm:grid-cols-2 gap-4">
                            {actions.map(({label, icon: Icon, variant, href, internal}) =>
                                internal ? (
                                    <Link className="w-full flex-1" href={href} key={label}>
                                        <Button className="w-full" variant={variant} size="lg">
                                            <div className="flex items-center justify-center gap-2">
                                                <Icon className="w-6 h-6 group-hover:text-primary-6"/>
                                                <Text
                                                    className="group-hover:text-primary-6"
                                                    variant="body-md"
                                                >
                                                    {label}
                                                </Text>
                                            </div>
                                        </Button>
                                    </Link>
                                ) : (
                                    <a
                                        className="w-full flex-1 flex mb-10 sm:mb-0"
                                        href={href}
                                        key={label}
                                    >
                                        <Button className="w-full" variant={variant} size="lg">
                                            <div className="flex items-center justify-center gap-2">
                                                <Icon className="w-6 h-6 group-hover:text-primary-6"/>
                                                <Text
                                                    className="group-hover:text-primary-6 text-nowrap"
                                                    variant="body-md"
                                                >
                                                    {label}
                                                </Text>
                                            </div>
                                        </Button>
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}