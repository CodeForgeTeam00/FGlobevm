import React from "react";
import SectionIntro from "@/components/global/SectionIntro";
import Container from "@/components/global/Sections/Container";
import ServicesCard from "@/components/global/Cards/ServicesCard";
import {CPTCardItem} from "@/types/wp-options";
import {ServiceCategoryCard} from "@/types/wp-services";

interface ServicesListProps {
    services: ServiceCategoryCard[];
}

export const ManagedServices = ({ services }: ServicesListProps) => {
    return (
        <div className="lg:py-24 py-6  bg-[#fcfdfe]">
            <Container>
                <div className="flex flex-col lg:gap-10 gap-6">
                    <SectionIntro
                        lgCenter
                        badge="WHAT WE DO"
                        title=" IT, Cybersecurity, and Compliance from One Team"
                        as={'h2'}
                        description="From infrastructure management and cloud environments to endpoint protection and network security, our services are designed to keep your systems running smoothly and your data protected. We provide proactive monitoring, fast response, and long-term stability."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                        {services.map((service, index) => (
                            <ServicesCard key={index} service={service} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

