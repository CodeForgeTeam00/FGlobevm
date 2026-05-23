import Container from "@/Components/global/Sections/Container";
import ServiceAreaCard from "@/Components/page/ServiceAreaLanding/ServiceAreaCard";
import ServiceAreaMapWrapper from "@/Components/page/ServiceAreaLanding/ServiceAreaMapWrapper";
import type { ServiceArea } from "@/Components/page/ServiceAreaLanding/ServiceAreaMap";
import { getServiceAreaLanding, getServiceAreaLandingPage } from "@/services/wp-service-area";
import { FAQAccordion } from "@/Components/global/FAQAccordion";
import SectionIntro from "@/Components/global/SectionIntro";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import type { Metadata } from "next";
import React from "react";
import {WhyChooseUs} from "@/Components/page/Home/WhyChooseUs";

const COORDINATES: Record<string, { lat: number; lng: number }> = {
    "managed-it-services-los-angeles": { lat: 34.0522, lng: -118.2437 },
    "encino-network-security-audits": { lat: 34.1594, lng: -118.5014 },
    "woodland-hills-managed-it-services": { lat: 34.1683, lng: -118.6059 },
    "sherman-oaks": { lat: 34.1508, lng: -118.4490 },
    "santa-clarita": { lat: 34.3917, lng: -118.5426 },
    "ventura-county": { lat: 34.2746, lng: -119.2290 },
    "simi-valley": { lat: 34.2694, lng: -118.7815 },
    "reseda": { lat: 34.2011, lng: -118.5365 },
    "sylmar": { lat: 34.3087, lng: -118.4676 },
    "san-fernando-valley": { lat: 34.2312, lng: -118.5298 },
    "thousand-oaks": { lat: 34.1706, lng: -118.8376 },
    "westlake-village": { lat: 34.1414, lng: -118.8209 },
};

function formatName(slug: string): string {
    return slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await getServiceAreaLandingPage();
    const yoast = pageData?.yoast_head_json;

    return {
        title: yoast?.title || "Service Areas | GlobeVM",
        description: yoast?.description || "Explore GlobeVM service areas across multiple cities.",
        alternates: {
            canonical: "https://www.globevm.com/service-area",
        },
    };
}

export default async function ServiceAreaListPage() {
    const [rawAreas, pageData] = await Promise.all([
        getServiceAreaLanding(),
        getServiceAreaLandingPage(),
    ]);
    const areas: ServiceArea[] = (rawAreas ?? [])
        .filter((item) => COORDINATES[item.slug])
        .map((item) => ({
            name: item.landing_service_area?.title || formatName(item.slug),
            slug: item.slug,
            lat: COORDINATES[item.slug].lat,
            lng: COORDINATES[item.slug].lng,
            services: Number(item.landing_service_area?.service_number) || 0,
            region: item.landing_service_area?.region || "Los Angeles",
        }));
    const faq = pageData?.faq_box;
    const servicesInfo = pageData?.services_options;
    return (
        <div className="relative">
            <Container>
                <div className="lg:py-10 py-4 flex flex-col gap-10">
                    <SectionIntro
                        badge={"Our Reach"}
                        title={"Professional Services Available Across Multiple Cities"}
                        description={"Explore the cities we currently serve and find out how our team can support your needs locally with fast, reliable service."}
                        lgCenter
                        as={"h1"}
                    />
                    <ServiceAreaMapWrapper areas={areas} />
                </div>
            </Container>
            <Container>
                <div className="lg:py-16 py-4">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            {servicesInfo?.title || "Professional Services Available Across Multiple Cities"}
                        </h2>
                        <p className="text-gray-500 text-sm lg:text-base lg:pt-2">
                            {servicesInfo?.description || "Our services are available in the cities below. Choose your location to explore what we offer in your area."}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {areas.map((area, index) => (
                            <ServiceAreaCard
                                key={area.slug}
                                area={area}
                            />
                        ))}
                    </div>
                </div>
            </Container>
            <WhyChooseUs isLocation={true} data={servicesInfo} />
            {faq && faq.faq_questions && faq.faq_questions.length > 0 && (
                <Container>
                    <div className="py-16">
                        <div className="flex flex-col lg:gap-10 gap-6">
                            <SectionIntro
                                title={faq.title}
                                description={faq.description}
                                lgCenter
                            />
                            <FAQAccordion
                                items={faq.faq_questions.map((q) => ({
                                    question: q.question,
                                    answer: q.answer,
                                }))}
                                variant="dark"
                            />
                        </div>
                    </div>
                </Container>
            )}
            <Container>
                <div className="pb-16">
                    <ContactCTA />
                </div>
            </Container>
        </div>
    );
}