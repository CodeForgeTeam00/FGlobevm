
import React from 'react';
import SectionIntro from "@/Components/global/SectionIntro";
import AboutImage from "@/public/assets/image/aboutImage.jpg";
import Image from "next/image";

export const AboutStability= () => {
    const stats = [
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "15 Min", label: "Response Time" },
        { value: "24/7", label: "System Monitoring" },
        { value: "500+", label: "Endpoints Protected" },
    ];
    return (
        <section className="relative  px-6  overflow-hidden">
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <SectionIntro
                        badge="PROACTIVE IT"
                        title={`Proactive IT That Keeps Your Business`}
                        highlight="Secure"
                        description="We manage, secure, and optimize your infrastructure so your team can focus on growth instead of downtime. From virtual environments to network protection, we keep your systems stable, fast, and protected."
                    />
                    <div className="relative">
                        <div className="  ">
                            <Image
                                src={AboutImage}
                                alt="Modern Office Building"
                                className="w-full  object-cover"
                            />
                            <div className=" mt-[-100px] relative z-2 px-4">
                                <div className="bg-primary-6 rounded-3xl  p-8 lg:p-12  ">
                                    <div className="grid grid-cols-2 divide-y  divide-white/10 lg:grid-cols-4 ">
                                        {stats.map((item, index) => (
                                            <div
                                                key={index}
                                                className="py-6 px-4 text-center  lg:text-left flex flex-col items-center lg:items-start justify-center"
                                            >
                                                <div className=" text-white mb-1">
                                                    {item.value}
                                                </div>
                                                <div className="text-white/80 text-footnote  ">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};



// {/* Floating Stats Bar */}
