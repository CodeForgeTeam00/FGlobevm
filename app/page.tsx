import {HeroSection} from "@/Components/page/Home/HeroSection/HeroSection";
import {TrustedBy} from "@/Components/page/Home/TrustedBy";
import Image from "next/image";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import {AboutStability} from "@/Components/page/Home/AboutStability";
import {WhyChooseUs} from "@/Components/page/Home/WhyChooseUs";
import {ManagedServices} from "@/Components/page/Home/ManagedServices";
import {ClientFeedback} from "@/Components/page/Home/ClientFeedback";
import {FAQSection} from "@/Components/page/Home/FAQSection";
import {BlogSection} from "@/Components/page/Home/BlogSection";
import {ContactCTA} from "@/Components/page/Home/ContactCTA";
import Container from "@/Components/global/Sections/Container";
import {getAllServices} from "@/services/wp-services";
import {getGlobalOptions} from "@/services/wp-home";


export default async function Home() {
    const [pageData, servicesData] = await Promise.all([
        getGlobalOptions(),
        getAllServices(),
    ]);
    return (
        <div className="relative ">
            <Image
                className="absolute hidden lg:inline top-[160]"
                src={mask}
                alt="layout"
            />
            <Container bemClass={"hero__section"}>
                <HeroSection data={pageData.acf.hero_section_images}/>
            </Container>
            <Container bemClass={"trusted-by__section"}>
                <TrustedBy/>
            </Container>
            <Container fullWidth bemClass={"why-chooseUs__section"}>
                <WhyChooseUs/>
            </Container>
            <Container bemClass={"about-stability__section"}>
                <AboutStability background={pageData.acf.background_image}/>
            </Container>
            <Container fullWidth bg={"lightGray"} bemClass={"managed-services__section"}>
                <ManagedServices services={servicesData}/>
            </Container>
            <Container bemClass={"managed-services__section"}>
                <ClientFeedback image={pageData.acf.slider_section_image} comments={pageData.acf.comment_field}/>
            </Container>
            <Container fullWidth bg={"primary"}>
                <FAQSection faq={pageData.acf.faq}/>
            </Container>
            <BlogSection/>
            <ContactCTA/>
        </div>
    );
}

