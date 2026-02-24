import {HeroSection} from "@/Components/page/Home/HeroSection/HeroSection";
import {TrustedBy} from "@/Components/page/Home/TrustedBy";
import mask from "@/public/assets/image/heroSectionLayout.svg"
import Image from "next/image";
import {AboutStability} from "@/Components/page/Home/AboutStability";
import {WhyChooseUs} from "@/Components/page/Home/WhyChooseUs";
import {ManagedServices} from "@/Components/page/Home/ManagedServices";
import {ClientFeedback} from "@/Components/page/Home/ClientFeedback";
import {FAQSection} from "@/Components/page/Home/FAQSection";
import {BlogSection} from "@/Components/page/Home/BlogSection";
import {ContactCTA} from "@/Components/page/Home/ContactCTA";
import {LeadMagnet} from "@/Components/page/Home/LeadMagnet";
import Container from "@/Components/global/Sections/Container";
export default function Home() {
    return (
        <div className="relative">
            <Image className={'absolute hidden lg:inline top-[160]'} src={mask} alt={'layout'}/>
            <Container bemClass={'hero__section'}>
                <HeroSection/>
            </Container>
            <Container bemClass={'trusted-by__section'}>
                <TrustedBy/>
            </Container>
            <Container fullWidth  bemClass={'why-chooseUs__section'}>
                <WhyChooseUs/>
            </Container>
            <Container bemClass={'about-stability__section'}>
                <AboutStability />
            </Container>
            <Container fullWidth bg={'lightGray'} bemClass={'managed-services__section'}>
                <ManagedServices />
            </Container>
            <Container  bemClass={'managed-services__section'}>
                <ClientFeedback/>
            </Container>
            <Container fullWidth bg={'primary'}>
                <FAQSection/>
            </Container>

            <BlogSection/>
            <ContactCTA/>
        </div>
    );
}
