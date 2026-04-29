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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getServicePage(slug);

    if (!data) return { title: "Service Not Found" };

    return {
        title: data.acf.hero_section.title,
        description: data.acf.hero_section.description,
    };
}

export default async function ServicePage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();

    let data;

    if (isEnabled && preview === "true" && id) {
        data = await getPreviewById(id);
    } else {
        data = await getServicePage(slug);
    }

    if (!data) notFound();

    const [services, rawPosts] = await Promise.all([
        getAllServices(),
        getBlogs({ per_page: 4 }),
    ]);

    const { acf } = data;
    const blogData = mapBlogsResponse(rawPosts);

    return (
        <div className="relative">
            {isEnabled && <PreviewBar slug={slug} type="services" />}
            <ServicesHeroSection
                title={data.title}
                label={acf.hero_section.label}
                description={acf.hero_section.description}
                image={acf.hero_section.image}
                keyFeatures={acf.hero_section.key_features}
            />
            <Container>
                <Features
                    offerings={acf.second_section.offerings}
                    description={acf.second_section.description}
                    title={acf.second_section.title}
                    label={acf.second_section.label}
                />
            </Container>
            <PrimarySection>
                <AllServices
                    label={acf.sub_services?.label ?? "Our Services"}
                    title={acf.sub_services?.title ?? ""}
                    description={acf.sub_services?.description ?? ""}
                    services={acf.sub_services?.add_service ?? []}
                />
            </PrimarySection>
            <Testimonials
                title={acf.client_feedback.title}
                comments={acf.client_feedback.comments}
                description={acf.client_feedback.description}
                label={acf.client_feedback.label}
            />
            <Container>
                <QBox
                    faqs={acf.faq_box.faq}
                    title={acf.faq_box.title}
                    description={acf.faq_box.description}
                />
                <BlogSection data={blogData?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}