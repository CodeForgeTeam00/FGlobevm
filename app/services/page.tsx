import Container from "@/components/global/Sections/Container";
import PrimarySection from "@/components/global/PrimarySection";
import SectionIntro from "@/components/global/SectionIntro";
import BlogSection from "@/components/page/SrvicesPage/PostSection";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import { getServiceLandingPage, getServiceCategoryCards } from "@/services/wp-services";
import { getBlogs } from "@/services/wp-blog";
import { getBusinessPartner } from "@/services/wp-options";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Text from "@/components/global/text";
import  {ParentServiceHero}  from "@/components/page/serviceParent/HeroSection";
import { ClientFeedbackGrid } from "@/components/page/ServiceCategory/Clientfeedbackgrid";
import React from "react";
import type { Metadata } from "next";
import {WhyChooseUs} from "@/components/page/Home/WhyChooseUs";

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await getServiceLandingPage();
    const yoast = pageData?.yoast_head_json;

    return {
        title: yoast?.title || "IT Services | GlobeVM",
        description: yoast?.description || "Managed IT, cybersecurity, cloud solutions and more.",
        alternates: { canonical: "https://www.globevm.com/services" },
    };
}

export default async function ServicesLandingPage() {
    const [pageData, rawPosts, partners, categoryCards] = await Promise.all([
        getServiceLandingPage(),
        getBlogs({ per_page: 4 }),
        getBusinessPartner(),
        getServiceCategoryCards(),
    ]);

    const blogData = mapBlogsResponse(rawPosts);

    const hero = pageData?.hero_section;
    const industries = pageData?.industries;
    const testimonial = pageData?.testimonial;

    return (
        <div className="relative">
            {/* Hero */}
            <ParentServiceHero
                partners={partners || []}
                data={{
                    label: hero?.label ?? "",
                    title: hero?.title ?? "",
                    description: hero?.description ?? "",
                    image: pageData?.image ?? null,
                }}
            />
            <PrimarySection>
                <Container>
                    <div className="py-16 lg:py-24">
                        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
                            <div>
                                <span className="inline-flex items-center border border-white/30 text-white rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-6">
                                    Our Services
                                </span>
                                <Text variant="heading-md" as="h2" textColor="white">
                                    Managed IT and Cybersecurity That Scales With You
                                </Text>
                            </div>
                            <Text variant="body-md" textColor="white" className="opacity-80 lg:pt-12">
                                From infrastructure management and cloud environments to endpoint protection and network security, our services are designed to keep your systems running smoothly and your data protected.
                            </Text>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(categoryCards ?? []).map((card, index) => (
                                <Link
                                    key={index}
                                    href={`/services/${card.slug}`}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-6/10 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <path opacity="0.4" d="M25.0167 24.5833V36.65L5.01668 36.6833V24.5833L5 22.0833V11.7833C5 10.6667 5.56669 9.63329 6.48336 9.01662L13.15 4.56665C14.2667 3.81665 15.7333 3.81665 16.85 4.56665L23.5166 9.01662C24.45 9.63329 25 10.6667 25 11.7833V22.0833L25.0167 24.5833Z" fill="#199AD5"/>
                                            <path d="M36.6673 35.4167H34.5506V30.4167C36.1339 29.9 37.284 28.4167 37.284 26.6667V23.3334C37.284 21.15 35.5006 19.3667 33.3173 19.3667C31.134 19.3667 29.3506 21.15 29.3506 23.3334V26.6667C29.3506 28.4 30.4839 29.8667 32.0339 30.4V35.4167H3.33398C2.65065 35.4167 2.08398 35.9834 2.08398 36.6667C2.08398 37.35 2.65065 37.9167 3.33398 37.9167H33.2173C33.2506 37.9167 33.2673 37.9334 33.3006 37.9334C33.334 37.9334 33.3507 37.9167 33.384 37.9167H36.6673C37.3507 37.9167 37.9173 37.35 37.9173 36.6667C37.9173 35.9834 37.3507 35.4167 36.6673 35.4167Z" fill="#199AD5"/>
                                            <path d="M25.0167 24.5834H5.01668L5 22.0834H25L25.0167 24.5834Z" fill="#199AD5"/>
                                            <path d="M15 37.9166C14.3167 37.9166 13.75 37.35 13.75 36.6666V30.4166C13.75 29.7333 14.3167 29.1666 15 29.1666C15.6833 29.1666 16.25 29.7333 16.25 30.4166V36.6666C16.25 37.35 15.6833 37.9166 15 37.9166Z" fill="#199AD5"/>
                                            <path d="M15.0007 17.9167C16.6115 17.9167 17.9173 16.6109 17.9173 15C17.9173 13.3892 16.6115 12.0834 15.0007 12.0834C13.3898 12.0834 12.084 13.3892 12.084 15C12.084 16.6109 13.3898 17.9167 15.0007 17.9167Z" fill="#199AD5"/>
                                        </svg>
                                    </div>
                                    <Text variant="card-title-md" className="mb-2">
                                        {card.name}
                                    </Text>
                                    <Text variant="body-sm" textColor="muted" className="flex-grow mb-4">
                                        {card.description?.slice(0, 100) || ""}
                                    </Text>
                                    <span className="text-primary-6 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Show More <ArrowRight size={14} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </PrimarySection>
            {industries && industries.items && industries.items.length > 0 && (
                <div className="py-6 lg:py-20">
                    <Container>
                        <SectionIntro
                            badge={industries.label}
                            title={industries.title}
                            as="h2"
                            lgCenter
                            description={industries.description}
                        />
                        <div className="lg:pt-10 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {industries.items.map((item, idx) => {
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
                                                <Text as="h3" className="text-neutral-700" variant="card-title-lg">
                                                    {item.title}
                                                </Text>
                                                <Text variant="card-subtitle-lg" textColor="light">
                                                    {item.description}
                                                </Text>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </div>
            )}
                <Container fullWidth bemClass="why-chooseUs__section">
                    <WhyChooseUs />
                </Container>
            {/* Testimonials */}
            {testimonial && testimonial.items && testimonial.items.length > 0 && (
                <ClientFeedbackGrid
                    label={testimonial.label}
                    title={testimonial.title}
                    description={testimonial.description}
                    testimonials={testimonial.items}
                />
            )}

            {/* Blog + CTA */}
            <Container>
                <BlogSection data={blogData?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}