import { FAQTabs } from "@/Components/global/FAQTabs";
import { getFAQCategories } from "@/services/shared";
import type { Metadata } from "next";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";
import Container from "@/Components/global/Sections/Container";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Frequently asked questions about GlobeVM IT and cybersecurity services.",
};

export default async function FAQPage() {
    const categories = await getFAQCategories();
    return (
        <div className={'min-h-screen mt-10'}>
            <Container>
                <div className={'flex flex-col lg:gap-10 gap-6 px-4 lg:px-2'}>
                    <SectionIntro
                        badge={'Your Questions'}
                        title={'Frequently Asked Questions'}
                        description={"Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what’s included, how support works, and what to expect during onboarding."}
                        lgCenter
                    />
                    <FAQTabs categories={categories ?? []} />
                </div>
            </Container>
        </div>
    );
}