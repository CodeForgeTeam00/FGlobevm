import HeroSection from "@/Components/page/AboutUs/heroSection";
import StorySection from "@/Components/page/AboutUs/StorySection";
import Container from "@/Components/global/Sections/Container";
import ValuesSection from "@/Components/page/AboutUs/ValuesSection";
import TeamSection from "@/Components/page/AboutUs/TeamSection";
import { FAQAccordion } from "@/Components/global/FAQAccordion";
import { WpContent } from "@/Components/global/SeoBox";
import { getAboutPage } from "@/services/wp-pages";
import type { Metadata } from "next";
import PrimarySection from "@/Components/global/PrimarySection";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about GlobeVM Digital Services, our team, and our mission to provide managed IT and cybersecurity solutions.",
};


export default async function AboutUsPage() {
    const data = await getAboutPage();
    console.log(data)
    return (
        <div className="relative">
            <HeroSection featuredImage={data?.featured_image} />
            <Container>
                <StorySection midSectionImage={data?.mid_section_image} />
                {data?.team_section && (
                    <TeamSection members={data.team_section} />
                )}
                <ValuesSection />
            </Container>
            {data?.faq_section && (
                    <PrimarySection>
                        <div>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-20 mb-10">
                                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                                    Frequently Asked<br />Questions
                                </h2>
                                <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-1/2">
                                    Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what's included, how support works, and what to expect during onboarding.
                                </p>
                            </div>
                        </div>
                        <FAQAccordion items={data.faq_section} variant="light" />
                    </PrimarySection>
            )}
            {data?.about_globevm && (
                <WpContent content={data.about_globevm} />
            )}
        </div>
    );
}
