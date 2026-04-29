import React from "react";
import SectionIntro from "@/Components/global/SectionIntro";
import Container from "@/Components/global/Sections/Container";
import ServicesCard from "@/Components/global/Cards/ServicesCard";
import { WPService } from "@/types/wp-services";

interface ServicesListProps {
    services: WPService[];
}

export const ManagedServices = ({ services }: ServicesListProps) => {
    return (
        <div className="py-24 px-6 bg-[#fcfdfe]">
            <Container>
                <div className="flex flex-col lg:gap-10">
                    <SectionIntro
                        lgCenter
                        badge="WHAT WE DO"
                        title="Managed IT and Cybersecurity That Scales With You"
                        description="From infrastructure management and cloud environments to endpoint protection and network security, our services are designed to keep your systems running smoothly and your data protected. We provide proactive monitoring, fast response, and long-term stability."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <ServicesCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

