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
export default function Home() {
    return (
        <div className="relative min-h-[100vh]">
            {/*<Image className={'absolute hidden lg:inline top-[160px]'} src={mask} alt={'layout'}/>*/}
            {/*<div className={'max-w-[1540px]  mx-auto '}>*/}
            {/*    <HeroSection/>*/}
            {/*    <TrustedBy/>*/}
            {/*    <WhyChooseUs/>*/}
            {/*    <AboutStability />*/}
            {/*</div>*/}



            {/*<ManagedServices />*/}
            {/*<ClientFeedback/>*/}
            {/*<FAQSection/>*/}
            {/*<BlogSection/>*/}
            {/*<ContactCTA/>*/}
            {/*<LeadMagnet/>*/}
        </div>
    );
}
