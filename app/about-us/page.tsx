import HeroSection from "@/Components/page/AboutUs/heroSection";
import StorySection from "@/Components/page/AboutUs/StorySection";
import Container from "@/Components/global/Sections/Container";
import ValuesSection from "@/Components/page/AboutUs/ValuesSection";
import TeamSection from "@/Components/page/AboutUs/TeamSection";
import { FAQAccordion } from "@/Components/global/FAQAccordion";
import { WpContent } from "@/Components/global/SeoBox";
import { getAboutPage } from "@/services/wp-pages";
import type { Metadata } from "next";

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
                <section className="py-24">
                    <FAQAccordion items={data.faq_section} variant="light" />
                </section>
            )}
            {data?.about_globevm && (
                <WpContent content={data.about_globevm} />
            )}
        </div>
    );
}