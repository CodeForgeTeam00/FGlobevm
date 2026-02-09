
import React from 'react';
import { ChevronRight, Server } from 'lucide-react';

const SERVICES = [
    { title: 'Service Title', highlighted: true },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
    { title: 'Service Title', highlighted: false },
];

export const ManagedServices: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-[#fcfdfe]">
            <div className="max-w-7xl mx-auto text-center">
                <div className="inline-block px-4 py-1.5 rounded-full border border-sky-400 text-sky-500 text-[10px] font-bold tracking-widest uppercase mb-8 bg-white">
                    WHAT WE DO
                </div>

                <h2 className="font-serif-heading text-[42px] lg:text-[54px] font-black text-[#111827] leading-[1.1] mb-8">
                    Managed IT and Cybersecurity That <br />
                    <span className="text-sky-500 italic">Scales</span> With You
                </h2>

                <p className="text-slate-400 max-w-3xl mx-auto text-[14px] leading-relaxed mb-20 font-medium">
                    From infrastructure management and cloud environments to endpoint protection and network security, our
                    services are designed to keep your systems running smoothly and your data protected. We provide proactive
                    monitoring, fast response, and long-term stability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className={`group bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-left flex flex-col items-start transition-all hover:shadow-xl hover:-translate-y-1 border ${service.highlighted ? 'border-sky-400 border-l-[6px]' : 'border-transparent'}`}
                        >
                            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-8">
                                <Server className="w-6 h-6 text-sky-500" />
                            </div>
                            <h3 className="font-serif-heading text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            </p>
                            <button className="flex items-center gap-1 text-sky-500 text-[12px] font-bold hover:gap-2 transition-all">
                                Show More <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
