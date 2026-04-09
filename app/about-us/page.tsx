import HeroSection from "@/Components/page/AboutUs/heroSection";
import StorySection from "@/Components/page/AboutUs/StorySection";
import Container from "@/Components/global/Sections/Container";
import ValuesSection from "@/Components/page/AboutUs/ValuesSection";
import SocialBanner from "@/Components/global/SocialBanner";
import React from "react";
import {InstagramIcon} from "@/Components/global/Icons";
import TeamSection from "@/Components/page/AboutUs/TeamSection";
import FAQSection from "@/Components/page/AboutUs/QBox";

const socialData = [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon:  InstagramIcon},
    { name: "LinkedIn", icon:InstagramIcon },
    { name: "YouTube", icon: InstagramIcon },
];

export default async function AboutUsPage() {
    return (
        <div className="relative ">
            <HeroSection/>
            <Container>
                <StorySection/>
                <TeamSection/>
                <SocialBanner
                    title="Globe VM in Socials"
                    subtitle="Business owners trust"
                    socials={socialData}
                />
                <ValuesSection/>

            </Container>
            <FAQSection/>
        </div>
    );
}

