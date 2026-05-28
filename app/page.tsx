import type { Metadata } from "next";
import Image from "next/image";
import { HeroSection } from "@/components/page/Home/HeroSection/HeroSection";
import { TrustedBy } from "@/components/global/TrustedBy";
import { AboutStability } from "@/components/page/Home/AboutStability";
import { WhyChooseUs } from "@/components/page/Home/WhyChooseUs";
import { ManagedServices } from "@/components/page/Home/ManagedServices";
import { ClientFeedback } from "@/components/page/Home/ClientFeedback";
import { BlogSection } from "@/components/page/Home/BlogSection";
import { ContactCTA } from "@/components/page/Home/ContactCTA";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import Container from "@/components/global/Sections/Container";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import { getBusinessPartner, getGlobalOptions, getServicePagesCards } from "@/services/wp-options";
import { getBlogs } from "@/services/wp-blog";
import { mapGlobalOptions } from "@/mappers/options.mapper";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import PrimarySection from "@/components/global/PrimarySection";
import Text from "@/components/global/text";
import JsonLd from "@/components/global/JsonLd";
import { organizationSchema, webPageSchema, faqSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

export async function generateMetadata(): Promise<Metadata> {
    const options = await getGlobalOptions();
    const verification = {
        other: {
            "msvalidate.01": "E74273AAA5C350704506A7EA5DEF7393",
        },
    };
    if (options?.yoast_head_json) {
        const meta = yoastToMetadata(options.yoast_head_json as YoastSEO, {
            canonicalOverride: "https://www.globevm.com",
        });
        return {
            ...meta,
            verification,
        };
    }
    return {
        title: "GlobeVM | Managed IT, Cybersecurity & Cloud Services in Los Angeles",
        description: "Enterprise-grade managed IT, cybersecurity, and cloud solutions for businesses in Los Angeles, Encino, and Woodland Hills.",
        alternates: {
            canonical: "https://www.globevm.com",
        },
        verification,
    };
}

export default async function Home() {
    const [options, services, rawPosts, partners] = await Promise.all([
        getGlobalOptions(),
        getServicePagesCards(),
        getBlogs({ per_page: 4 }),
        getBusinessPartner(),
    ]);
    const data = mapGlobalOptions(options);
    const blogData = mapBlogsResponse(rawPosts);
    if (!data) {
        return <div className="p-10">Failed to load page data.</div>;
    }
    const yoast = options?.yoast_head_json as YoastSEO | undefined;
    const schemas: object[] = [
        organizationSchema(),
        webPageSchema({
            title: yoast?.title || "GlobeVM | Managed IT, Cybersecurity & Cloud Services in Los Angeles",
            url: `${SITE.url}/`,
            description: yoast?.description || "Enterprise-grade managed IT, cybersecurity, and cloud solutions for businesses in Los Angeles, Encino, and Woodland Hills.",
        }),
    ];
    return (
        <>
            <JsonLd data={schemas} />
            <div className="relative">
                <Image
                    className="absolute hidden lg:inline top-[160px]"
                    src={mask}
                    alt="layout"
                />
                <Container bemClass="hero__section">
                    <HeroSection
                        data={{
                            primaryImageUrl: data.hero.primaryImage.url,
                            secondaryImageUrl: data.hero.secondaryImage.url,
                            primaryAlt: data.hero.primaryImage.alt,
                            secondaryAlt: data.hero.secondaryImage.alt,
                        }}
                    />
                </Container>
                <Container bemClass="trusted-by__section">
                    <TrustedBy partners={partners ?? []} />
                </Container>
                <Container fullWidth bemClass="why-chooseUs__section">
                    <WhyChooseUs />
                </Container>
                <Container bemClass="about-stability__section">
                    <AboutStability background={data.backgroundImage} />
                </Container>
                <Container fullWidth bg="lightGray" bemClass="managed-services__section">
                    <ManagedServices services={services ?? []} />
                </Container>
                <Container bemClass="client-feedback__section">
                    <ClientFeedback
                        comments={data.comments.map((c) => ({
                            description: c.description,
                            the_author: c.author,
                            author_job: c.job,
                            the_star: String(c.stars),
                        }))}
                        image={data.sliderImage}
                    />
                </Container>
                <PrimarySection>
                    <div>
                        <div className="grid lg:grid-cols-2 lg:justify-between gap-4 lg:gap-20 mb-10">
                            <Text as={'h2'} textColor={"white"} variant={"heading-md"}>
                                Frequently Asked Questions
                            </Text>
                            <Text textColor={"white"} variant={"body-lg"}>
                                Quick answers about our services, response times, security practices, and what working with
                                GlobeVM looks like day to day. This section helps you understand what is included, how
                                support works, and what to expect during onboarding.
                            </Text>
                        </div>
                    </div>
                    <FAQAccordion items={data.faq} variant="light" />
                </PrimarySection>
                <Container>
                    <BlogSection posts={blogData?.posts ?? []} />
                </Container>
                <Container>
                    <ContactCTA />
                </Container>
            </div>
        </>
    );
}