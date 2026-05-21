import HeroSection from "@/Components/page/AboutUs/heroSection";
import StorySection from "@/Components/page/AboutUs/StorySection";
import Container from "@/Components/global/Sections/Container";
import ValuesSection from "@/Components/page/AboutUs/ValuesSection";
import TeamSection from "@/Components/page/AboutUs/TeamSection";
import {FAQAccordion} from "@/Components/global/FAQAccordion";
import {WpContent} from "@/Components/global/SeoBox";
import {getAboutPage} from "@/services/wp-pages";
import type {Metadata} from "next";
import {yoastToMetadata} from "@/lib/yoast-to-metadata";
import type {YoastSEO} from "@/types/yoast";
import PrimarySection from "@/Components/global/PrimarySection";
import JsonLd from "@/Components/global/JsonLd";
import {organizationSchema, webPageSchema, breadcrumbSchema, faqSchema} from "@/lib/seo/schemas";
import {SITE} from "@/lib/seo/site-config";
import {StatsBar} from "@/Components/page/AboutUs/StatsBar";
import {TrustedBy} from "@/Components/global/TrustedBy";
import {getBusinessPartner, getGlobalOptions, getServicePagesCards} from "@/services/wp-options";
import {getBlogs} from "@/services/wp-blog";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getAboutPage();
    if (data?.yoast_head_json) {
        return yoastToMetadata(data.yoast_head_json as YoastSEO, {
            canonicalOverride: "https://www.globevm.com/about-us",
        });
    }
    return {
        title: "About Us | GlobeVM",
        description:
            "Learn about GlobeVM Digital Services, our team, and our mission to provide managed IT and cybersecurity solutions.",
        alternates: {
            canonical: "https://www.globevm.com/about-us",
        },
    };
}

export default async function AboutUsPage() {

    const [data, partners] = await Promise.all([
        getAboutPage(),
        getBusinessPartner(),
    ]);
    const yoast = data?.yoast_head_json as YoastSEO | undefined;

    const schemas: object[] = [
        organizationSchema(),
        webPageSchema({
            title: yoast?.title || "About Us | GlobeVM",
            url: `${SITE.url}/about-us/`,
            description: yoast?.description ||
                "Learn about GlobeVM Digital Services, our team, and our mission to provide managed IT and cybersecurity solutions.",
        }),
        breadcrumbSchema([
            {name: "Home", url: `${SITE.url}/`},
            {name: "About Us", url: `${SITE.url}/about-us/`},
        ]),
    ];

    return (
        <>
            <JsonLd data={schemas}/>
            <div className="relative">
                <HeroSection featuredImage={data?.image}/>
                <StatsBar/>
                <Container bemClass="trusted-by__section">
                    <StorySection midSectionImage={data?.mid_section_image}/>
                    <TrustedBy partners={partners ?? []}/>
                </Container>
                {data?.team_section && (<TeamSection members={data.team_section}/>)}
                <Container>
                    <ValuesSection data={data?.cards ?? []}/>
                </Container>
                {data?.faq_section && (
                    <PrimarySection>
                        <div>
                            <div
                                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-20 mb-10">
                                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                                    Frequently Asked<br/>Questions
                                </h2>
                                <p className="text-white/80 text-sm lg:text-base leading-relaxed lg:max-w-1/2">
                                    Quick answers about our services, response times, security practices, and what
                                    working with GlobeVM looks like day to day. This section helps you understand what's
                                    included, how support works, and what to expect during onboarding.
                                </p>
                            </div>
                        </div>
                        <FAQAccordion items={data.faq_section} variant="light"/>
                    </PrimarySection>
                )}
                {data?.about_globevm && (
                    <WpContent content={data.about_globevm}/>
                )}
            </div>
        </>
    );
}
