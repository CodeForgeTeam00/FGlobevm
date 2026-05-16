import { Phone, Mail, Briefcase, Send } from "lucide-react";
import Image from "next/image";
import Container from "@/Components/global/Sections/Container";
import { OfficesWithMap } from "@/Components/page/ContactUs/OfficesWithMap";
import { ContactForm } from "@/Components/page/ContactUs/ContactForm";
import type { Metadata } from "next";
import { getContactPage } from "@/services/wp-pages";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import JsonLd from "@/Components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getContactPage();

    if (data?.yoast_head_json) {
        return yoastToMetadata(data.yoast_head_json as YoastSEO, {
            canonicalOverride: "https://www.globevm.com/contact-us/",
        });
    }

    return {
        title: data?.title || "Contact Us | GlobeVM",
        description: data?.description ||
            "Get in touch with GlobeVM Digital Services for managed IT, cybersecurity, and cloud solutions.",
        alternates: {
            canonical: "https://www.globevm.com/contact-us/",
        },
    };
}

const INFO_CARDS = [
    { icon: Phone, title: "Contact Number", value: "(310) 750-4939", highlight: false },
    { icon: Mail, title: "Email", value: "info@globevm.com", highlight: false },
    { icon: Briefcase, title: "Working hours", value: "24 hours", highlight: false },
];

export default async function ContactUsPage() {
    const data = await getContactPage();

    const heroTitle = data?.title || "Contact Us";
    const heroDescription = data?.description ||
        "From infrastructure management and cloud environments to endpoint protection and network security";
    const heroImage = data?.image;

    const yoast = data?.yoast_head_json as YoastSEO | undefined;

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || heroTitle,
            url: `${SITE.url}/contact-us/`,
            description: yoast?.description || heroDescription,
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Contact Us", url: `${SITE.url}/contact-us/` },
        ]),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <div className="min-h-screen bg-[#fafafa] pb-20">
                <section
                    aria-label="Contact Hero"
                    className="relative h-[450px] w-full flex flex-col items-center justify-center text-center"
                >
                    {heroImage?.url && (
                        <Image
                            src={heroImage.url}
                            alt={heroImage.alt || heroTitle}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 text-white px-4 mt-[-60px]">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                            {heroTitle}
                        </h1>
                        <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
                            {heroDescription}
                        </p>
                    </div>
                </section>
                <div className="px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {INFO_CARDS.map((card) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={card.title}
                                        className={`rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1 ${
                                            card.highlight
                                                ? "bg-[#209cee] shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
                                                : "bg-white"
                                        }`}
                                    >
                                        <div className="mb-5">
                                            <Icon
                                                className={card.highlight ? "text-white" : "text-[#209cee]"}
                                                size={36}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <h3
                                            className={`font-serif font-bold text-xl mb-2 ${
                                                card.highlight ? "text-white" : "text-gray-900"
                                            }`}
                                        >
                                            {card.title}
                                        </h3>
                                        <p
                                            className={`text-sm ${
                                                card.highlight ? "text-blue-100" : "text-gray-500"
                                            }`}
                                        >
                                            {card.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </Container>
                </div>

                <Container>
                    <div className="mt-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
                                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900 tracking-tight">
                                    Our Offices
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    Serving businesses across Los Angeles and beyond
                                </p>
                                <OfficesWithMap />
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
