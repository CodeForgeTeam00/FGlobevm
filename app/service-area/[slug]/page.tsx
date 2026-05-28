import { getServiceAreaPage } from "@/services/wp-service-area";
import { getPreviewById } from "@/lib/preview";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/global/Sections/Container";
import EstimateSection from "@/components/page/ServiceArea/EstimateSection";
import ServicesSection from "@/components/page/ServiceArea/ServicesSection";
import WhyUsSection from "@/components/page/ServiceArea/WhyUsSection";
import TestimonialsSection from "@/components/page/ServiceArea/TestimonialsSection";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import PreviewBar from "@/components/global/PreviewBar";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import SectionIntro from "@/components/global/SectionIntro";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import React from "react";
import Image from "next/image";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import PrimarySection from "@/components/global/PrimarySection";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string; id?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const isPreview = preview === "true" && !!id;

    const data = isPreview
        ? await getPreviewById(id!)
        : await getServiceAreaPage(slug);

    if (!data) return { title: "Service Area Not Found" };

    const item = Array.isArray(data) ? data[0] : data;

    if (!item) return { title: "Service Area Not Found" };

    if (item.yoast_head_json) {
        return yoastToMetadata(item.yoast_head_json as YoastSEO, {
            canonicalOverride: `https://www.globevm.com/service-area/${slug}`,
        });
    }

    return {
        title: item?.acf?.hero_section?.title || "Service Area",
        description: item?.acf?.hero_section?.description || "",
        alternates: {
            canonical: `https://www.globevm.com/service-area/${slug}`,
        },
    };
}

export default async function ServiceAreaPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();
    const isPreview = preview === "true" && !!id;

    let data;

    if (isPreview) {
        data = await getPreviewById(id!);
    } else {
        data = await getServiceAreaPage(slug);
    }

    if (!data) notFound();

    const item = Array.isArray(data) ? data[0] : data;
    const acf = item?.acf ?? {};
    const hero = acf.hero_section ?? {};
    const second = acf.second_section ?? {};
    const offering = acf.offering_section ?? {};
    const feedback = acf.client_feedback ?? {};
    const faqBox = acf.faq_box ?? {};

    const yoast = item?.yoast_head_json as YoastSEO | undefined;
    const pageTitle = item?.title || hero.title || "Service Area";

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || pageTitle,
            url: `${SITE.url}/service-area/${slug}/`,
            description: yoast?.description || hero.description || "",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Service Areas", url: `${SITE.url}/service-area/` },
            { name: pageTitle, url: `${SITE.url}/service-area/${slug}/` },
        ]),
    ];

    // if (faqBox.faq && faqBox.faq.length > 0) {
    //     schemas.push(
    //         faqSchema(
    //             faqBox.faq.map((f: any) => ({
    //                 question: f.question,
    //                 answer: f.answer,
    //             }))
    //         )
    //     );
    // }

    return (
        <>
            <JsonLd data={schemas} />
            <div className="relative">
                {(isEnabled || isPreview) && <PreviewBar slug={slug} type="service_area_page" />}
                <Image
                    className="absolute hidden lg:inline top-20"
                    src={mask}
                    alt="layout"
                />
                <EstimateSection
                    label={hero.label ?? ""}
                    title={hero.title ?? ""}
                    description={hero.description ?? ""}
                />
                {(second.title || (second.services && second.services.length > 0)) && (
                    <Container>
                        <ServicesSection
                            label={second.label ?? ""}
                            title={second.title ?? ""}
                            description={second.description ?? ""}
                            services={second.services ?? []}
                        />
                    </Container>
                )}
                {(offering.title || (offering.offerings && offering.offerings.length > 0)) && (
                    <PrimarySection>
                        <WhyUsSection
                            label={offering.label ?? ""}
                            title={offering.title ?? ""}
                            description={offering.description ?? ""}
                            offerings={offering.offerings ?? []}
                        />
                    </PrimarySection>
                )}
                {(feedback.title || (feedback.comments && feedback.comments.length > 0)) && (
                    <TestimonialsSection
                        label={feedback.label ?? ""}
                        title={feedback.title ?? ""}
                        description={feedback.description ?? ""}
                        comments={feedback.comments ?? []}
                    />
                )}
                <Container>
                    {(faqBox.title || (faqBox.faq && faqBox.faq.length > 0)) && (
                        <div className={"grid items-center"}>
                            <div className={"flex flex-col lg:gap-10 gap-6"}>
                                <SectionIntro
                                    title={faqBox.title}
                                    description={faqBox.description}
                                    lgCenter
                                    as={'h2'}
                                />
                                <FAQAccordion items={faqBox.faq} variant="dark" />
                            </div>
                        </div>
                    )}
                    <div className={"lg:mt-10 mt-6"}>
                        <ContactCTA />
                    </div>
                </Container>
            </div>
        </>
    );
}