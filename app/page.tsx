import Image from "next/image";

import { HeroSection } from "@/Components/page/Home/HeroSection/HeroSection";
import { TrustedBy } from "@/Components/page/Home/TrustedBy";
import { AboutStability } from "@/Components/page/Home/AboutStability";
import { WhyChooseUs } from "@/Components/page/Home/WhyChooseUs";
import { ManagedServices } from "@/Components/page/Home/ManagedServices";
import { ClientFeedback } from "@/Components/page/Home/ClientFeedback";
import { BlogSection } from "@/Components/page/Home/BlogSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import { FAQAccordion } from "@/Components/global/FAQAccordion";

import Container from "@/Components/global/Sections/Container";
import mask from "@/public/assets/image/heroSectionLayout.svg";

import { getGlobalOptions } from "@/services/wp-options";
import { getAllServices } from "@/services/wp-services";
import { getBlogs } from "@/services/wp-blog";
import { mapGlobalOptions } from "@/mappers/options.mapper";
import { mapBlogsResponse } from "@/mappers/blog-mapper";

export default async function Home() {
    const [options, services, rawPosts] = await Promise.all([
        getGlobalOptions(),
        getAllServices(),
        getBlogs({ per_page: 4 }),
    ]);

    const data = mapGlobalOptions(options);
    const blogData = mapBlogsResponse(rawPosts);

    if (!data) {
        return <div className="p-10">Failed to load page data.</div>;
    }

    return (
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
                <TrustedBy />
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

            <Container>
                <FAQAccordion items={data.faq} variant="dark" />
            </Container>
            <Container>
                <BlogSection posts={blogData?.posts ?? []} />
            </Container>
            <Container>
                <ContactCTA />
            </Container>
        </div>
    );
}