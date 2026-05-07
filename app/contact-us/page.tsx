import { Phone, Mail, Briefcase, Send } from "lucide-react";
import Image from "next/image";
import Container from "@/Components/global/Sections/Container";
import { OfficeList } from "@/Components/page/ContactUs/OfficeList";
import { ContactForm } from "@/Components/page/ContactUs/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with GlobeVM Digital Services for managed IT, cybersecurity, and cloud solutions.",
};

const INFO_CARDS = [
    {
        icon: Phone,
        title: "Contact Number",
        value: "(310) 750-4939",
        highlight: false,
    },
    {
        icon: Mail,
        title: "Email",
        value: "info@globevm.com",
        highlight: false,
    },
    {
        icon: Briefcase,
        title: "Working hours",
        value: "24 hours",
        highlight: false,
    },
    {
        icon: Send,
        title: "Send Ticket",
        value: "Speak to an Expert",
        highlight: true,
    },
];

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] pb-20">
            <section
                aria-label="Contact Hero"
                className="relative h-[450px] w-full flex flex-col items-center justify-center text-center"
            >
                <Image
                    src=""
                    alt="GlobeVM contact support team"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-white px-4 mt-[-60px]">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
                        From infrastructure management and cloud environments to
                        endpoint protection and network security
                    </p>
                </div>
            </section>

            <div className="px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                            className={
                                                card.highlight
                                                    ? "text-white"
                                                    : "text-[#209cee]"
                                            }
                                            size={36}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <h3
                                        className={`font-serif font-bold text-xl mb-2 ${
                                            card.highlight
                                                ? "text-white"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className={`text-sm ${
                                            card.highlight
                                                ? "text-blue-100"
                                                : "text-gray-500"
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
                            <OfficeList />
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </Container>
        </div>
    );
}