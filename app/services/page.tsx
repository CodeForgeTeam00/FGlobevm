import ServicesHeroSection from "@/Components/page/SrvicesPage/HeroSection";
import Features from "@/Components/page/SrvicesPage/WayChooseUsSection";
import Container from "@/Components/global/Sections/Container";
import AllServices from "@/Components/page/SrvicesPage/AllService";
import Testimonials from "@/Components/page/SrvicesPage/Testimonials";
import QBox from "@/Components/page/SrvicesPage/QBox";
import BlogSection from "@/Components/page/SrvicesPage/PostSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";

import { getBlogs } from "@/services/wp-blog";

export default async function Services() {
    const blog = await getBlogs({ per_page: 4 });

    return (
        <div className="relative">
            <ServicesHeroSection />
            <Container>
                <Features />
            </Container>
            <AllServices />
            <Testimonials />
            <Container>
                <QBox />
                <BlogSection data={blog?.posts ?? []} />
                <ContactCTA />
            </Container>
        </div>
    );
}