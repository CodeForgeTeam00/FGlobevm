import Container from "@/Components/global/Sections/Container";
import AllServices from "@/Components/page/SrvicesPage/AllService";
import QBox from "@/Components/page/servicArea/QBox";
import {ContactCTA} from "@/Components/page/Home/ContactCTA";
import EstimateSection from "@/Components/page/servicArea/EstimateSection";
import ServicesSection from "@/Components/page/servicArea/ServicesSection";
import WhyUsSection from "@/Components/page/servicArea/WhyUsSection";
import TestimonialsSection from "@/Components/page/servicArea/TestimonialsSection";
export default async function Services() {
    return (
        <div className="relative ">
            <EstimateSection/>
            <Container>
                <ServicesSection/>
            </Container>
            <WhyUsSection/>
            <TestimonialsSection/>
            <Container>
                <QBox/>
                <ContactCTA/>
            </Container>
        </div>
    );
}

