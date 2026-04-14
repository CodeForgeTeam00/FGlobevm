import React from "react";
import Image from "next/image";
import SectionIntro from "@/Components/global/SectionIntro";
import TableInfo from "@/Components/page/Home/WayChooseUsSection/TabeInfo";
import { WPImage } from "@/types/wp-common";

interface AboutStabilityProps {
    background: WPImage;
}

const STATS_DATA = [
    [
        { title: "99.9%", subtitle: "Uptime Guarantee" },
        { title: "15 Min", subtitle: "Response Time" },
    ],
    [
        { title: "24/7", subtitle: "System Monitoring" },
        { title: "500+", subtitle: "Endpoints Protected" },
    ],
];

export const AboutStability = ({ background }: AboutStabilityProps) => {
    return (
        <section className="relative px-6 lg:py-18 overflow-hidden">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="mb-6">
                        <SectionIntro
                            badge="PROACTIVE IT"
                            title="Proactive IT That Keeps Your Business"
                            highlight="Secure"
                            description="GlobeVM was created to help growing companies run reliable, secure, and scalable IT environments without the overhead of a full internal team. We specialize in virtual infrastructure, managed IT, and cybersecurity designed for real-world business operations."
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src={background.url}
                            alt={background.alt || "GlobeVM office"}
                            width={800}
                            height={600}
                            className="w-full"
                        />
                        <div className="lg:hidden">
                            <TableInfo data={STATS_DATA} />
                        </div>
                    </div>
                </div>
                <div className="w-full hidden lg:block max-w-[1304px] mx-auto">
                    <TableInfo data={STATS_DATA} />
                </div>
            </div>
        </section>
    );
};