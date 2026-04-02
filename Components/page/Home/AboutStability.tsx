
import React from 'react';
import SectionIntro from "@/Components/global/SectionIntro";
import TableInfo from "@/Components/page/Home/WayChooseUsSection/TabeInfo";


interface AboutStabilityProps {
    background: {} ;
}
export const AboutStability= ({background}:AboutStabilityProps) => {
    const myData = [
        [
            { title: "99.9%", subtitle: "Uptime Guarantee" },
            { title: "15 Min", subtitle: "Response Time" },
        ],
        [
            { title: "24/7", subtitle: "System Monitoring" },
            { title: "500+", subtitle: "Endpoints Protected" },
        ],
    ];
    return (
        <section className="relative  px-6 lg:py-18  overflow-hidden">
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <div className={'mb-6'}>
                        <SectionIntro
                            badge="PROACTIVE IT"
                            title={`Proactive IT That Keeps Your Business`}
                            highlight="Secure"
                            description="GlobeVM was created to help growing companies run reliable, secure, and scalable IT environments without the overhead of a full internal team. We specialize in virtual infrastructure, managed IT, and cybersecurity designed for real-world business operations."
                        />
                    </div>
                    <div className="relative">
                        <div className="  ">
                            {/*<Image*/}
                            {/*    src={AboutImage}*/}
                            {/*    alt="Modern Office Building"*/}
                            {/*    className="w-full  "*/}
                            {/*/>*/}
                            <img src={background.url} alt=""  className="w-full" />
                            <div className={'lg:hidden'}>
                                <TableInfo  data={myData} />
                            </div>
                        </div>
                    </div>
                </div>
                <div  className={'w-full hidden lg:block max-w-[1304] mx-auto '}>
                    <TableInfo  data={myData} />
                </div>
            </div>
        </section>
    );
};
