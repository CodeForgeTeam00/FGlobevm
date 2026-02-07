import React from 'react';
import { ArrowRightIcon, ServiceIcon } from '@/Components/global/Icons';

const ServicesSection = () => {
    const services = [
        { title: "Web Design", desc: "Bringing visuals to life through developing highly functional web solutions." },
        { title: "Development", desc: "Bringing visuals to life through developing highly functional web solutions." },
        { title: "SEO", desc: "Bringing visuals to life through developing highly functional web solutions." },
        { title: "Development", desc: "Bringing visuals to life through developing highly functional web solutions." },
        { title: "Development", desc: "Bringing visuals to life through developing highly functional web solutions." },
        { title: "Development", desc: "Bringing visuals to life through developing highly functional web solutions." },
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-12">
                <div className="space-y-4">
                    <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                        ✦ Our Specializations
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif">
                        What Services We Provide To <br />
                        Our Clients In Here
                    </h2>
                </div>
                <button className="hidden lg:flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-full font-bold transition">
                    Request <ArrowRightIcon />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                    <div key={idx} className="group relative bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl hover:border-lime-400/50 transition duration-300 overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-lime-400/10 rounded-full blur-3xl group-hover:bg-lime-400/20 transition duration-500"></div>

                        <div className="w-10 h-10 border border-lime-400/30 rounded-full flex items-center justify-center mb-6 text-lime-400 group-hover:scale-110 transition duration-300">
                            <ServiceIcon />
                        </div>

                        <h3 className="text-xl font-serif text-white mb-3 group-hover:text-lime-400 transition">{service.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-8">{service.desc}</p>

                        <a href="#" className="flex items-center text-xs font-bold text-gray-500 group-hover:text-white transition uppercase tracking-wider">
                            Watch Pricing <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicesSection;
