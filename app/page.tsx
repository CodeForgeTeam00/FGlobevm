import SectionLayout from '../Components/layout/SectionLayout';
import HeroSection from '../Components/page/Home/HeroSection';
import ServicesSection from '../Components/page/Home/ServicesSection';
import AboutSection from '../Components/page/Home/AboutSection';
import TestimonialSection from '../Components/page/Home/TestimonialSection';
import PortfolioSection from '../Components/page/Home/PortfolioSection';
import ContactSection from '../Components/page/Home/ContactSection';
import FooterSection from '../Components/page/Home/FooterSection';
import WhyUsSection from '../Components/page/Home/WhyUsSection';
export default function Home() {
    return (
        <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

            {/* 01: Hero */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="01" activeNav="Home" nextSectionText="Our Services">
                    <HeroSection />
                </SectionLayout>
            </div>

            {/* 02: Services */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="02" activeNav="Our Services" nextSectionText="Why Us?">
                    <ServicesSection />
                </SectionLayout>
            </div>
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="03" activeNav="Why us?" nextSectionText="About Us">
                    <WhyUsSection />
                </SectionLayout>
            </div>
            {/* 03: About Us */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="03" activeNav="About us" nextSectionText="Testimonial">
                    <AboutSection />
                </SectionLayout>
            </div>

            {/* 04: Testimonial */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="04" activeNav="Testimonial" nextSectionText="Portfolio">
                    <TestimonialSection />
                </SectionLayout>
            </div>

            {/* 05: Portfolio */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="05" activeNav="Portfolio" nextSectionText="Contact us">
                    <PortfolioSection />
                </SectionLayout>
            </div>

            {/* 06: Contact Us */}
            <div className="w-full h-screen snap-start">
                <SectionLayout pageIndex="06" activeNav="Contact us" nextSectionText="Footer">
                    <ContactSection />
                </SectionLayout>
            </div>

            {/* 07: Footer */}
            <div className="w-full h-screen snap-start">
                {/* Footer might need a slightly different layout wrapper or just content, but reusing SectionLayout maintains the sidebar look */}
                <SectionLayout pageIndex="07" activeNav="Contact us" nextSectionText="Back to Top">
                    <FooterSection />
                </SectionLayout>
            </div>

        </div>
    );
}
