import Container from "@/components/global/Sections/Container";
import PrimarySection from "@/components/global/PrimarySection";
import SectionIntro from "@/components/global/SectionIntro";
import { BlogSection } from "@/components/page/Home/BlogSection";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import { getServiceLandingPage, getServiceCategoryCards } from "@/services/wp-services";
import { getBlogs } from "@/services/wp-blog";
import { getBusinessPartner } from "@/services/wp-options";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Text from "@/components/global/text";
import  {ParentServiceHero}  from "@/components/serviceParent/HeroSection";
import { ClientFeedbackGrid } from "@/components/page/ServiceCategory/Clientfeedbackgrid";
import React from "react";
import type { Metadata } from "next";

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
    const whyChoose = pageData?.why_choose;
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

            {/* Service Cards */}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(categoryCards ?? []).map((card, index) => (
                                <Link
                                    key={index}
                                    href={`/services/${card.slug}`}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-6/10 flex items-center justify-center mb-4">
                                        <div className="w-6 h-6 bg-primary-6/20 rounded" />
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

            {/* Industries */}
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

            {/* Why Choose Us */}
            {whyChoose && whyChoose.items && whyChoose.items.length > 0 && (
                <Container>
                    <section className="py-6 lg:py-20">
                        <SectionIntro
                            badge={whyChoose.label}
                            title={whyChoose.title}
                            as="h2"
                            lgCenter
                            description={whyChoose.description}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:pt-10 pt-6">
                            {whyChoose.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 border border-neutral-30 hover:shadow-md hover:border-primary-6/30 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-6/10 flex items-center justify-center mb-4">
                                        {item.icon?.url ? (
                                            <Image src={item.icon.url} alt={item.icon.alt || ""} width={24} height={24} />
                                        ) : (
                                            <div className="w-6 h-6 bg-primary-6/30 rounded" />
                                        )}
                                    </div>
                                    <Text variant="card-title-md" className="mb-2">{item.title}</Text>
                                    <Text variant="body-sm" textColor="muted">{item.description}</Text>
                                </div>
                            ))}
                        </div>
                    </section>
                </Container>
            )}

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
                <BlogSection posts={blogData?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}