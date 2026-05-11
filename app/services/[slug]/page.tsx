import { getServicePage, getAllServices } from "@/services/wp-services";
import { getBlogs } from "@/services/wp-blog";
import { getPreviewById } from "@/lib/preview";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/Components/global/Sections/Container";
import ServicesHeroSection from "@/Components/page/SrvicesPage/HeroSection";
import Features from "@/Components/page/SrvicesPage/WayChooseUsSection";
import AllServices from "@/Components/page/SrvicesPage/AllService";
import Testimonials from "@/Components/page/SrvicesPage/Testimonials";
import BlogSection from "@/Components/page/SrvicesPage/PostSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import PreviewBar from "@/Components/global/PreviewBar";
import PrimarySection from "@/Components/global/PrimarySection";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import {FAQAccordion} from "@/Components/global/FAQAccordion";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";
import Image from "next/image";
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
        : await getServicePage(slug);

    if (!data) return { title: "Service Not Found" };

    if (data.yoast_head_json) {
        return yoastToMetadata(data.yoast_head_json as YoastSEO, {
            canonicalOverride: `https://www.globevm.com/services/${slug}`,
        });
    }
    return {
        title: data?.acf?.hero_section?.title || "Service",
        description: data?.acf?.hero_section?.description || "",
        alternates: {
            canonical: `https://www.globevm.com/services/${slug}`,
        },
    };
}
export default async function ServicePage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();
    const isPreview = preview === "true" && !!id;
    let data;
    if (isPreview) {
        data = await getPreviewById(id!);
    } else {
        data = await getServicePage(slug);
    }
    if (!data) notFound();
    const [, rawPosts] = await Promise.all([
        getAllServices(),
        getBlogs({ per_page: 4 }),
    ]);
    const acf = data?.acf ?? {};
    const hero = acf.hero_section ?? {};
    const second = acf.second_section ?? {};
    const subServices = acf.sub_services ?? {};
    const feedback = acf.client_feedback ?? {};
    const faqBox = acf.faq_box ?? {};


    const blogData = mapBlogsResponse(rawPosts);
    return (
        <div className="relative">
            {(isEnabled || isPreview) && <PreviewBar slug={slug} type="services" />}

            <ServicesHeroSection
                title={data.title ?? ""}
                label={hero.label ?? ""}
                description={hero.description ?? ""}
                image={hero.image && typeof hero.image === 'object' ? hero.image : null}
                keyFeatures={hero.key_features ?? []}
            />

            {(second.title || (second.offerings && second.offerings.length > 0)) && (
                <Container>
                    <Features
                        offerings={second.offerings ?? []}
                        description={second.description ?? ""}
                        title={second.title ?? ""}
                        label={second.label ?? ""}
                    />
                </Container>
            )}

            {(subServices.title || (subServices.add_service && subServices.add_service.length > 0)) && (
                <PrimarySection>
                    <AllServices
                        label={subServices.label ?? "Our Services"}
                        title={subServices.title ?? ""}
                        description={subServices.description ?? ""}

                        services={subServices.add_services ?? []}
                    />
                </PrimarySection>

            )}

            {(feedback.title || (feedback.comments && feedback.comments.length > 0)) && (
                <Testimonials
                    title={feedback.title ?? ""}
                    comments={feedback.comments ?? []}
                    description={feedback.description ?? ""}
                    label={feedback.label ?? ""}
                />
            )}

            <Container>
                {(faqBox.title || (faqBox.faq && faqBox.faq.length > 0)) && (
                    <div className={'grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-6 relative items-center lg:py-[96px] ] '}>
                        <Image src="/assets/image/Question.svg" className={'w-[50%] hidden lg:flex h-[740px] top-[2px]  absolute'} alt="question" width={200} height={812} />
                        <div className={'lg:me-[128px] flex flex-col items-center '}>
                            <SectionIntro
                                title={faqBox.title}
                                description={faqBox.description}
                            />
                        </div>
                        <FAQAccordion items={faqBox.faq} variant="dark"/>
                    </div>
                )}
                <BlogSection data={blogData?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}