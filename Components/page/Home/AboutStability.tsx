import React from "react";
import Image from "next/image";
import SectionIntro from "@/Components/global/SectionIntro";
import TableInfo from "@/Components/page/Home/WayChooseUsSection/TabeInfo";
import {WPImage} from "@/types/wp-common";

interface AboutStabilityProps {
    background: WPImage;
}

const STATS_DATA = [
    [
        {title: "+30", subtitle: "Years of Experience"},
        {title: "+75", subtitle: "Businesses Protected"},
    ],
    [
        {title: "15 Min", subtitle: "Response Time"},
        {title: "+90%", subtitle: "Client Retention"},
    ],
];

export const AboutStability = ({background}: AboutStabilityProps) => {
    return (
        <section className="relative  lg:py-18 overflow-hidden">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="mb-6">
                        <SectionIntro
                            as={'h2'}
                            badge="PROACTIVE IT"
                            title="Proactive IT That Keeps Your Business Secure"
                            description=" Most MSPs stop at IT support. GlobeVM combines managed IT, advanced cybersecurity,
                            regulatory compliance, and digital services into one team. One point of contact. One partner accountable
                            for your entire technology environment"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src={background.url}
                            alt={background.alt || "GlobeVM office"}
                            width={800}
                            height={600}
                            className="w-full hover:scale-[101%] transition-transform duration-300"
                        />
                        <div className="lg:hidden">
                            <TableInfo data={STATS_DATA}/>
                        </div>
                    </div>
                </div>
                <div className="w-full hidden lg:block max-w-[1304px] mx-auto">
                    <TableInfo data={STATS_DATA}/>
                </div>
            </div>
        </section>
    );
};