import { getCategoryService } from "@/services/wp-services";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/global/Sections/Container";
import PrimarySection from "@/components/global/PrimarySection";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import { CategoryServiceHero } from "@/components/page/ServiceCategory/HeroSection";
import { ServiceFeatures } from "@/components/page/ServiceCategory/ServiceFeatures";
import AllServices from "@/components/page/SrvicesPage/AllService";
import WhyUsSection from "@/components/page/ServiceArea/WhyUsSection";
import BlogSection from "@/components/page/SrvicesPage/PostSection";
import React from "react";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import { getBlogs } from "@/services/wp-blog";
import SectionIntro from "@/components/global/SectionIntro";
import Text from "@/components/global/text";
import { getServiceAreaLanding } from "@/services/wp-service-area";
import ServiceAreaCard from "@/components/page/ServiceAreaLanding/ServiceAreaCard";
import { ClientFeedbackGrid } from "@/components/page/ServiceCategory/Clientfeedbackgrid";
import EstimateForm from "@/components/page/ServiceArea/EstimateForm";
import type { Card } from "@/types/wp-services";
import SeoBoxSection from "@/components/global/SeoBoxSection";
import Image from "next/image";
import {ChevronRight} from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const data = await getCategoryService(category);
    if (!data) return { title: "Service Category Not Found" };

    const hero = data.acf.hero_section;
    return {
        title: hero.title || data.name || "Services",
        description: hero.description || "",
        alternates: { canonical: `${SITE.url}/services/${category}` },
    };
}

export default async function ServiceCategoryPage({ params }: Props) {
    const { category } = await params;
    const data = await getCategoryService(category);
    if (!data) notFound();

    const [rawAreas, rawPosts] = await Promise.all([
        getServiceAreaLanding(),
        getBlogs({ per_page: 4 }),
    ]);

    const { acf } = data;
    const hero = acf.hero_section;
    const services = acf.services_section;
    const proc = acf.process_section;
    const industries = acf.industry_section;
    const faqs = acf.faq_section;
    const serviceAriaSections = acf.service_area_section;
    const seoBox = acf.seo_box
    const pageTitle = hero.title || data.name || "Services";
    const blogData = mapBlogsResponse(rawPosts);


    const areas = (rawAreas ?? []).filter((a) => a.landing_service_area);
    areas.map((area) => {

        console.log(area.landing_service_area.title)
    })

    const schemas: object[] = [
        webPageSchema({
            title: pageTitle,
            url: `${SITE.url}/services/${category}/`,
            description: hero.description || "",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Services", url: `${SITE.url}/services/` },
            { name: pageTitle, url: `${SITE.url}/services/${category}/` },
        ]),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <div className="relative flex flex-col">
                <CategoryServiceHero data={hero} />
                <div className={"bg-neutral-10 w-full"}>
                    <ServiceFeatures />
                </div>
                <div className={"lg:py-20 py-6"}>
                    <AllServices
                        isPrimary={false}
                        label={services.label}
                        services={services.items as Card[]}
                        title={services.title}
                        description={services.description}
                        isLg={true}
                    />
                </div>
                <PrimarySection>
                    <WhyUsSection
                        label={proc.label}
                        title={proc.title}
                        description={proc.description}
                        isStep={true}
                        offerings={proc.items}
                    />
                </PrimarySection>
                <div className={"py-6 lg:py-20"}>
                    <Container>
                        <SectionIntro
                            badge={industries.label}
                            title={industries.title}
                            as={"h2"}
                            lgCenter={true}
                            description={industries.description}
                        />
                        <div className={'lg:pt-10 pt-6'}>
                            <div className={`grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-6`} >
                                {industries.items.map((service, idx) => {
                                    const number = String(idx + 1).padStart(2, "0");
                                    return (
                                        <div
                                            key={idx}
                                            className="relative bg-white border border-neutral-30 rounded-3xl p-6 md:p-8 h-full overflow-hidden"
                                        >
                        <span
                            aria-hidden="true"
                            className="absolute top-4 right-6 text-4xl md:text-5xl font-bold text-neutral-30 select-none pointer-events-none"
                        >
                            {number}.
                        </span>

                                            <div className="flex flex-col gap-3 pr-16">
                                                <Text as="h3" className={'text-neutral-700'} variant="card-title-lg">
                                                    {service.title}
                                                </Text>
                                                <Text variant="card-subtitle-lg" textColor="light">
                                                    {service.description}
                                                </Text>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </div>
                <div className={"bg-neutral-10 w-full py-6 lg:py-32"}>
                    <Container>
                        <div className="grid lg:grid-cols-2 justify-between lg:items-end gap-2 lg:gap-16 mb-6 lg:mb-16">
                            <SectionIntro
                                badge={serviceAriaSections.label}
                                title={serviceAriaSections.title}
                                as={"h2"}
                            />
                            <Text
                                variant={"body-lg"}
                                className={"text-center lg:text-left"}
                                textColor={"light"}
                            >
                                {serviceAriaSections.description}
                            </Text>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {areas.map((area) => (
                                <ServiceAreaCard
                                    key={area.slug}
                                    area={area.landing_service_area!}
                                    title={area.landing_service_area.title}
                                />
                            ))}
                        </div>
                    </Container>
                </div>
                <ClientFeedbackGrid />
                <PrimarySection>
                    <div className={"grid lg:grid-cols-2 gap-6 lg:gap-32"}>
                        <div className="flex flex-col gap-6">
                            <SectionIntro
                                isLight
                                title={serviceAriaSections.title}
                                description={serviceAriaSections.description}
                                as={"h2"}
                            />
                            <FAQAccordion items={faqs.faq} variant={"light"} />
                        </div>
                        <EstimateForm params={"service"} />
                    </div>
                </PrimarySection>
                <Container>
                    <BlogSection data={blogData?.posts ?? []} />
                    <ContactCTA />
                    {
                        seoBox &&
                        <SeoBoxSection content={seoBox.content ?? "hallo"} title={seoBox.title}/>
                    }
                </Container>
            </div>
        </>
    );
}