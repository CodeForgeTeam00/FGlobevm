import React from "react";
import SectionIntro from "@/Components/global/SectionIntro";
import {Button} from "@/Components/Ui/button";
import {CalendarIcon, PhoneIcon} from "@/Components/global/Icons";
import {useDictionary} from "@/lib/useDictionary";
import Text from "@/Components/global/text";
import Link from "next/link";

export const HeroContent: React.FC = () => {
    const dict = useDictionary();
    const content = dict.home.heroSection.content;
    const actions = [
        {
            label: content.primaryBtn,
            icon: CalendarIcon,
            variant: "primary" as const,
            href: '/contact-us',
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
        <div className="hero__content w-full lg:pt-12 pt-5 flex flex-col gap-14 lg:max-w-[477px] 2xl:!max-w-[636px]">
            <SectionIntro
                badge={content.badge}
                title={content.title}
                as={'h1'}
                description={content.des}
            />
            <div className="hero__actions flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                {actions.map(({label, icon: Icon, variant, href, internal}) => (

                    internal ? <Link href={href} key={label}>
                            <Button variant={variant} size="lg">
                                <div className="flex items-center justify-center gap-2">
                                    <Icon className="w-6 h-6 group-hover:text-primary-6"/>
                                    <Text className={'group-hover:text-primary-6'} variant={'body-md'}>{label}</Text>
                                </div>
                            </Button>
                        </Link>
                        :
                        <a href={href} key={label}>
                            <Button variant={variant} size="lg">
                                <div className="flex items-center justify-center gap-2">
                                    <Icon className="w-6 h-6 group-hover:text-primary-6"/>
                                    <Text className={'group-hover:text-primary-6'} variant={'body-md'}>{label}</Text>
                                </div>
                            </Button>
                        </a>

                ))}
            </div>

        </div>
    );
};



