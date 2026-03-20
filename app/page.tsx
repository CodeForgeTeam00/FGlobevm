import { HeroSection } from "@/Components/page/Home/HeroSection/HeroSection";
import { TrustedBy } from "@/Components/page/Home/TrustedBy";
import Image from "next/image";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import { AboutStability } from "@/Components/page/Home/AboutStability";
import { WhyChooseUs } from "@/Components/page/Home/WhyChooseUs";
import { ManagedServices } from "@/Components/page/Home/ManagedServices";
import { ClientFeedback } from "@/Components/page/Home/ClientFeedback";
import { FAQSection } from "@/Components/page/Home/FAQSection";
import { BlogSection } from "@/Components/page/Home/BlogSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import Container from "@/Components/global/Sections/Container";
import { getHomePage } from "@/services/wp-pages";
import { getAllServices } from "@/services/wp-services";
import ServicesList from "@/Components/global/test";
import RevalidateButton from "@/Components/global/Test2";




export default async function Home() {
    const [pageData, servicesData] = await Promise.all([
        getHomePage(),
        getAllServices(),
    ]);
    return (
        <div className="relative">
            <Image
                className="absolute hidden lg:inline top-[160]"
                src={mask}
                alt="layout"
            />
            <Container bemClass={"hero__section"}>
                <RevalidateButton/>
                <ServicesList services={servicesData} />
                <HeroSection />
            </Container>
            <Container bemClass={"trusted-by__section"}>
                <TrustedBy />
            </Container>
            <Container fullWidth bemClass={"why-chooseUs__section"}>
                <WhyChooseUs />
            </Container>

            <Container bemClass={"about-stability__section"}>
                <AboutStability />
            </Container>

            <Container fullWidth bg={"lightGray"} bemClass={"managed-services__section"}>
                <ManagedServices />
            </Container>

            <Container bemClass={"managed-services__section"}>
                <ClientFeedback />
            </Container>

            <Container fullWidth bg={"primary"}>
                <FAQSection />
            </Container>
            <BlogSection />
            <ContactCTA />
            <Container bemClass={"trusted-by__section"}>
                <TrustedBy />
            </Container>
            <Container fullWidth bemClass={"why-chooseUs__section"}>
                <WhyChooseUs />
            </Container>

            <Container bemClass={"about-stability__section"}>
                <AboutStability />
            </Container>

            <Container fullWidth bg={"lightGray"} bemClass={"managed-services__section"}>
                <ManagedServices />
            </Container>

            <Container bemClass={"managed-services__section"}>
                <ClientFeedback />
            </Container>

            <Container fullWidth bg={"primary"}>
                <FAQSection />
            </Container>
            <BlogSection />
            <ContactCTA />
        </div>
    );
}

