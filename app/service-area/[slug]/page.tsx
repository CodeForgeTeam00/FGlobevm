import { getServiceAreaPage } from "@/services/wp-service-area";
import { getPreviewById } from "@/lib/preview";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/Components/global/Sections/Container";
import EstimateSection from "@/Components/page/servicArea/EstimateSection";
import ServicesSection from "@/Components/page/servicArea/ServicesSection";
import WhyUsSection from "@/Components/page/servicArea/WhyUsSection";
import TestimonialsSection from "@/Components/page/servicArea/TestimonialsSection";
import QBox from "@/Components/page/servicArea/QBox";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import PreviewBar from "@/Components/global/PreviewBar";
import type { Metadata } from "next";

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

    console.log(faqBox , 'faqBox')
    return (
        <div className="relative">
            {(isEnabled || isPreview) && <PreviewBar slug={slug} type="service_area_page" />}

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
                <WhyUsSection
                    label={offering.label ?? ""}
                    title={offering.title ?? ""}
                    description={offering.description ?? ""}
                    offerings={offering.offerings ?? []}
                />
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
                    <QBox
                        title={faqBox.title ?? ""}
                        description={faqBox.description ?? ""}
                        faqs={faqBox.faq ?? []}
                    />
                )}
                <ContactCTA />
            </Container>
        </div>
    );
}