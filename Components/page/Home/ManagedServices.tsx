
import React from 'react';
import { ChevronRight, Server } from 'lucide-react';
import SectionIntro from "@/Components/global/SectionIntro";
import Container from "@/Components/global/Sections/Container";
import ServicesCard from "@/Components/global/Cards/ServicesCard";

const SERVICES = [
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},
    { title: 'Service Title', href:"#" , description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '},

];

export const ManagedServices: React.FC = () => {
    return (
        <div className="py-24 px-6  bg-[#fcfdfe]">
            <Container>
                <div className='flex flex-col lg:gap-10'>
                    <SectionIntro
                        lgCenter
                        badge=" WHAT WE DO"
                        title={`  Managed IT and Cybersecurity That   `}
                        highlight=" Scales With You"
                        description="  From infrastructure management and cloud environments to endpoint protection and network security, our
                    services are designed to keep your systems running smoothly and your data protected. We provide proactive
                    monitoring, fast response, and long-term stability."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SERVICES.map((service, index) => (
                            <ServicesCard key={index} data={service}/>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};
