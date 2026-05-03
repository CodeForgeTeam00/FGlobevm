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
import QBox from "@/Components/page/SrvicesPage/QBox";
import BlogSection from "@/Components/page/SrvicesPage/PostSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import PreviewBar from "@/Components/global/PreviewBar";
import PrimarySection from "@/Components/global/PrimarySection";
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
        : await getServicePage(slug);

    if (!data) return { title: "Service Not Found" };

    return {
        title: data?.acf?.hero_section?.title || "Service",
        description: data?.acf?.hero_section?.description || "",
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

    console.log(subServices.add_services , '()')
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
                    <QBox
                        faqs={faqBox.faq ?? []}
                        title={faqBox.title ?? ""}
                        description={faqBox.description ?? ""}
                    />
                )}
                <BlogSection data={blogData?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}