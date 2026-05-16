import { FAQTabs } from "@/Components/global/FAQTabs";
import { getFAQCategories } from "@/services/shared";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";
import Container from "@/Components/global/Sections/Container";
import JsonLd from "@/Components/global/JsonLd";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getFAQCategories();

    const yoast = data?.yoast_head_json;

    if (yoast) {
        return yoastToMetadata(yoast as YoastSEO, {
            canonicalOverride: "https://www.globevm.com/faq",
        });
    }
    return {
        title: "FAQ | GlobeVM",
        description: "Frequently asked questions about GlobeVM IT and cybersecurity services.",
        alternates: {
            canonical: "https://www.globevm.com/faq",
        },
    };
}

export default async function FAQPage() {
    const data = await getFAQCategories();

    const yoast = data?.yoast_head_json as YoastSEO | undefined;

    const allFaqs = (data?.faq_categories ?? []).flatMap((cat: any) =>
        (cat.faqs ?? []).map((q: any) => ({
            question: q.question,
            answer: q.answer,
        }))
    );

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || "FAQ | GlobeVM",
            url: `${SITE.url}/faq/`,
            description: yoast?.description || "Frequently asked questions about GlobeVM IT and cybersecurity services.",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "FAQ", url: `${SITE.url}/faq/` },
        ]),
    ];

    if (allFaqs.length > 0) {
        schemas.push(faqSchema(allFaqs));
    }

    return (
        <>
            <JsonLd data={schemas} />
            <div className={"min-h-screen mt-10"}>
                <Container>
                    <div className={"flex flex-col lg:gap-10 gap-6 px-4 lg:px-2"}>
                        <SectionIntro
                            badge={"Your Questions"}
                            title={"Frequently Asked Questions"}
                            description={"Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what's included, how support works, and what to expect during onboarding."}
                            lgCenter
                        />
                        <FAQTabs categories={data?.faq_categories ?? []} />
                    </div>
                </Container>
            </div>
        </>
    );
}