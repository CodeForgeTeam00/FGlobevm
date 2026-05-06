import { getServiceAreaPage } from "@/services/wp-service-area";
import { getPreviewById } from "@/lib/preview";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/Components/global/Sections/Container";
import EstimateSection from "@/Components/page/ServiceArea/EstimateSection";
import ServicesSection from "@/Components/page/ServiceArea/ServicesSection";
import WhyUsSection from "@/Components/page/ServiceArea/WhyUsSection";
import TestimonialsSection from "@/Components/page/ServiceArea/TestimonialsSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import PreviewBar from "@/Components/global/PreviewBar";
import type { Metadata } from "next";
import SectionIntro from "@/Components/global/SectionIntro";
import {FAQAccordion} from "@/Components/global/FAQAccordion";
import React from "react";
import Image from "next/image";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import PrimarySection from "@/Components/global/PrimarySection";

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

    return {
        title: data?.acf?.hero_section?.title || "Service Area",
        description: data?.acf?.hero_section?.description || "",
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
        console.log(data)
    }

    if (!data) notFound();

    const acf = data[0]?.acf ?? {};
    const hero = acf.hero_section ?? {};
    const second = acf.second_section ?? {};
    const offering = acf.offering_section ?? {};
    const feedback = acf.client_feedback ?? {};
    const faqBox = acf.faq_box ?? {};


    return (
        <div className="relative  ">
            {(isEnabled || isPreview) && <PreviewBar slug={slug} type="service_area_page" />}
            <Image
                className="absolute hidden lg:inline top-20 "
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
                    <div className={'grid  items-center'}>
                        <div className={'flex flex-col lg:gap-10 gap-6'}>
                            <SectionIntro
                                title={faqBox.title}
                                description={faqBox.description}
                                lgCenter
                            />
                            <FAQAccordion items={faqBox.faq} variant="dark"/>
                        </div>

                    </div>
                )}
                <div className={' lg:mt-10 mt-6'}>
                    <ContactCTA />
                </div>
            </Container>
        </div>
    );
}