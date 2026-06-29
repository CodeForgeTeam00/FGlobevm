import React from "react";
import Link from "next/link";
import Container from "@/components/global/Sections/Container";
import Logo from "@/components/global/Logo";
import {getSocialMedia, getFooterSettings} from "@/services/wp-options";
import SocialItem from "@/components/global/SocialItem";
import {
    InstagramIcon,
    LinkedInIcon, LocationIcon,
    XIcon,
    YoutubeIcon,
} from "@/components/global/Icons";
import {Phone, Mail} from "lucide-react";
import Text from "@/components/global/text";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    facebook: InstagramIcon,
    x: XIcon,
    youtube: YoutubeIcon,
};

const ABOUT_LINKS = [
    {name: "About The Brand", href: "/about-us"},
    {name: "Contact Us", href: "/contact-us"},
    {name: "FAQ", href: "/faq"},
    {name: "Blog", href: "/blog"},
];

const OFFICES = [
    {
        name: "Woodland Hills",
        address: "20501 Ventura Blvd # 114 Woodland Hills, CA 91364",
    },
    {
        name: "Encino",
        address: "16661 Ventura Blvd, #224B, Encino, CA 91436",
    },
    {
        name: "Los Angeles",
        address: "10680 W Pico Blvd, Suite #300B Los Angeles, CA 90064",
    },
];

export default async function Footer() {
    const [socialData, footerSettings] = await Promise.all([
        getSocialMedia(),
        getFooterSettings(),
    ]);

    const socials = socialData;
    const footer = footerSettings;

    const socialLinks = [
        {name: "instagram", url: socials?.instagram},
        {name: "linkedin", url: socials?.linkedin},
        {name: "facebook", url: socials?.facebook},
        {name: "x", url: socials?.x},
        {name: "youtube", url: socials?.youtube},
    ].filter((s) => s.url);

    return (
        <footer className="lg:pt-[120px] mt-10 lg:mt-[128px] pt-10 lg:pt-16 bg-neutral-10">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[128px]">
                    <div className="flex flex-col gap-6">
                        <Logo className="text-[56px]"/>
                        <Text variant={'body-lg'} textColor={'light'} >
                            {footer?.description ?? ""}
                        </Text>
                        <div className="flex gap-2">
                            {socialLinks.map((social, index) => {
                                const IconComponent = ICON_MAP[social.name];
                                if (!IconComponent) return null;
                                return (
                                    <a
                                        key={index}
                                        href={social.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SocialItem>
                                            <IconComponent className="h-6 w-6 text-neutral-black  group-hover:text-primary-6"/>
                                        </SocialItem>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className={'grid grid-cols-2'}>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-lg">About</h3>
                            {ABOUT_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-500 text-sm hover:text-primary-6 transition"
                                >
                                  <Text as={'span'} className={'hover:text-primary-6 transition'} variant={'body-lg'} textColor={'light'}>
                                      {link.name}
                                  </Text>
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-lg">Contact US</h3>
                            {footer?.contact_us?.btn_num && (
                                <a
                                    href={footer.contact_us.btn_num.url}
                                    className="flex items-center gap-2 text-gray-500 text-sm hover:text-primary-6 transition"
                                >
                                    <Phone className="w-4 h-4"/>

                                    <Text as={'span'} className={'hover:text-primary-6 transition'} variant={'body-lg'} textColor={'light'}>
                                        {footer.contact_us.btn_num.number}
                                    </Text>
                                </a>
                            )}
                            {footer?.contact_us?.contact_email && (
                                <a
                                    href={`mailto:${footer.contact_us.contact_email}`}
                                    className="flex items-center gap-2 text-gray-500 text-sm hover:text-primary-6 transition"
                                >
                                    <Mail className="w-4 h-4"/>
                                    <Text as={'span'} className={'hover:text-primary-6 transition'} variant={'body-lg'} textColor={'light'}>
                                        {footer.contact_us.contact_email}
                                    </Text>

                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8">
                    <h3 className="font-bold text-lg mb-6">Our Offices:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {OFFICES.map((office) => (
                            <div key={office.name} className="flex items-start gap-3">
                                <LocationIcon className={'w-10  text-primary-6'} />
                                <div>
                                    <h4 className="text-primary-6 font-semibold text-sm">
                                        {office.name}
                                    </h4>
                                    <p className="text-neutral-black text-sm">{office.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
            <div className="mt-8 py-6 border-t border-gray-200 text-center">
                <p className="text-gray-400 text-sm">
                    © Copyright {new Date().getFullYear()}, All Rights Reserved For
                    GlobeVM
                </p>
            </div>
        </footer>
    );
}
