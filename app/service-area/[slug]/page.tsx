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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getServiceAreaPage(slug);

    if (!data) return { title: "Service Area Not Found" };

    return {
        title: data.acf.hero_section.title,
        description: data.acf.hero_section.description,
    };
}

export default async function ServiceAreaPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();

    let data;

    if (isEnabled && preview === "true" && id) {
        data = await getPreviewById(id);
    } else {
        data = await getServiceAreaPage(slug);
    }

    if (!data) notFound();

    const { acf } = data;

    return (
        <div className="relative">
            {isEnabled && <PreviewBar slug={slug} type="service_area_page" />}
            <EstimateSection
                label={acf.hero_section?.label}
                title={acf.hero_section?.title}
                description={acf.hero_section?.description}
            />
            <Container>
                <ServicesSection
                    label={acf.second_section?.label}
                    title={acf.second_section?.title}
                    description={acf.second_section?.description}
                    services={acf.second_section?.services}
                />
            </Container>
            <WhyUsSection
                label={acf.offering_section?.label}
                title={acf.offering_section?.title}
                description={acf.offering_section?.description}
                offerings={acf.offering_section?.offerings}
            />
            <TestimonialsSection
                label={acf.client_feedback?.label}
                title={acf.client_feedback?.title}
                description={acf.client_feedback?.description}
                comments={acf.client_feedback?.comments}
            />
            <Container>
                <QBox
                    title={acf.faq_box?.title}
                    description={acf.faq_box?.description}
                    faqs={acf.faq_box?.faq}
                />
                <ContactCTA />
            </Container>
        </div>
    );
}