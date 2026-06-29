import { getServicePage } from "@/services/wp-services";
import { getBlogs } from "@/services/wp-blog";
import { getPreviewById } from "@/lib/preview";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import { notFound, redirect } from "next/navigation";
import { draftMode } from "next/headers";
import Container from "@/components/global/Sections/Container";
import ServicesHeroSection from "@/components/page/SrvicesPage/HeroSection";
import Features from "@/components/page/SrvicesPage/WayChooseUsSection";
import AllServices from "@/components/page/SrvicesPage/AllService";
import Testimonials from "@/components/page/SrvicesPage/Testimonials";
import BlogSection from "@/components/page/SrvicesPage/PostSection";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import PreviewBar from "@/components/global/PreviewBar";
import PrimarySection from "@/components/global/PrimarySection";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
import Image from "next/image";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";
import SeoBoxSection from "@/components/global/SeoBoxSection";
import Text from "@/components/global/text";

interface Props {
    params: Promise<{ category: string; service: string }>;
    searchParams: Promise<{ preview?: string; id?: string }>;
}

export async function generateMetadata({
                                           params,
                                           searchParams,
                                       }: Props): Promise<Metadata> {
    const { category, service } = await params;
    const { preview, id } = await searchParams;
    const isPreview = preview === "true" && !!id;
    const data = isPreview
        ? await getPreviewById(id!)
        : await getServicePage(service);

    if (!data) return { title: "Service Not Found" };

    // Always use the service's true category for the canonical URL
    const trueCategory = data?.category?.slug ?? category;

    if (data.yoast_head_json) {
        return yoastToMetadata(data.yoast_head_json as YoastSEO, {
            canonicalOverride: `https://www.globevm.com/services/${trueCategory}/${service}`,
        });
    }
    return {
        title: data?.acf?.hero_section?.title || "Service",
        description: data?.acf?.hero_section?.description || "",
        alternates: {
            canonical: `https://www.globevm.com/services/${trueCategory}/${service}`,
        },
    };
}

export default async function ServicePage({ params, searchParams }: Props) {
    const { category, service } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();
    const isPreview = preview === "true" && !!id;

    let data;
    if (isPreview) {
        data = await getPreviewById(id!);
    } else {
        data = await getServicePage(service);
    }
    if (!data) notFound();

    if (!isPreview && data.category?.slug && data.category.slug !== category) {
        redirect(`/services/${data.category.slug}/${service}/`);
    }

    const rawPosts = await getBlogs({ per_page: 4 });

    const acf = data?.acf ?? {};
    const hero = acf.hero_section ?? {};
    const second = acf.second_section ?? {};
    const subServices = acf.sub_services ?? {};
    const feedback = acf.client_feedback ?? {};
    const faqBox = acf.faq_box ?? {};
    const seoBox = acf.seo_box ?? {};

    const blogData = mapBlogsResponse(rawPosts);

    const yoast = data?.yoast_head_json as YoastSEO | undefined;
    const pageTitle = data?.title || hero.title || "Service";

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || pageTitle,
            url: `${SITE.url}/services/${category}/${service}/`,
            description: yoast?.description || hero.description || "",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Services", url: `${SITE.url}/services/` },
            { name: pageTitle, url: `${SITE.url}/services/${category}/${service}/` },
        ]),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <div className="relative">
                {(isEnabled || isPreview) && (
                    <PreviewBar slug={service} type="services" />
                )}

                <ServicesHeroSection
                    title={data.title ?? ""}
                    label={hero.label ?? ""}
                    description={hero.description ?? ""}
                    image={hero.image && typeof hero.image === "object" ? hero.image : null}
                    keyFeatures={hero.key_features ?? []}
                />

                {(second.title || (second.offerings && second.offerings.length > 0)) && (
                    <div className={'lg:py-10 '}>
                        <Container>
                            <SectionIntro
                                badge={second.label}
                                title={second.title}
                                as={"h2"}
                                lgCenter={true}
                                description={second.description}
                            />
                            <div className={`grid grid-cols-1 mt-6 lg:mt-10 md:grid-cols-3  gap-4 md:gap-6`} >
                                {second.offerings.map((service:{ title: string; description: string } , idx:number) => {
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
                        </Container>
                    </div>
                )}

                {(subServices.title ||
                    (subServices.add_services && subServices.add_services.length > 0)) && (
                    <PrimarySection>
                        <AllServices
                            isPrimary={true}
                            isLg={true}
                            label={subServices.label ?? "Our Services"}
                            title={subServices.title ?? ""}
                            description={subServices.description ?? ""}
                            services={subServices.add_services ?? []}
                        />
                    </PrimarySection>
                )}

                {(feedback.title || (feedback.comments && feedback.comments.length > 0)) && (
                    <div className={"max-w-[1920px] mx-auto"}>
                        <Testimonials
                            title={feedback.title ?? ""}
                            comments={feedback.comments ?? []}
                            description={feedback.description ?? ""}
                            label={feedback.label ?? ""}
                        />
                    </div>
                )}

                <Container>
                    {(faqBox.title || (faqBox.faq && faqBox.faq.length > 0)) && (
                        <div
                            className={
                                "grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-6 relative items-center lg:py-24"
                            }
                        >
                            <Image
                                src="/assets/image/Question.svg"
                                className={"w-[50%] hidden lg:flex h-[740px] top-[2px] absolute"}
                                alt="question"
                                width={200}
                                height={812}
                            />
                            <div className={"lg:me-32 flex flex-col items-center"}>
                                <SectionIntro
                                    title={faqBox.title}
                                    description={faqBox.description}
                                    as={"h2"}
                                />
                            </div>
                            <FAQAccordion items={faqBox.faq} variant="dark" />
                        </div>
                    )}
                    <BlogSection data={blogData?.posts ?? []} />
                    <ContactCTA />
                    <SeoBoxSection content={seoBox.content ?? "hallo"} title={seoBox.title}/>
                </Container>
            </div>
        </>
    );
}