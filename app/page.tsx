import {HeroSection} from "@/Components/page/Home/HeroSection";
import {TrustedBy} from "@/Components/page/Home/TrustedBy";
import {AboutStability} from "@/Components/page/Home/AboutStability";
import {WhyChooseUs} from "@/Components/page/Home/WhyChooseUs";
import {ManagedServices} from "@/Components/page/Home/ManagedServices";
import {ClientFeedback} from "@/Components/page/Home/ClientFeedback";
import {FAQSection} from "@/Components/page/Home/FAQSection";
import {BlogSection} from "@/Components/page/Home/BlogSection";
import {ContactCTA} from "@/Components/page/Home/ContactCTA";
import {LeadMagnet} from "@/Components/page/Home/LeadMagnet";
export default function Home() {
    return (
        <div className="">
            <HeroSection/>
            <TrustedBy/>
            <WhyChooseUs/>
            <AboutStability />
            <ManagedServices />
            <ClientFeedback/>
            <FAQSection/>
            <BlogSection/>
            <ContactCTA/>
            <LeadMagnet/>
        </div>
    );
}
