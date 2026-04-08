

const services = Array(8).fill({
    title: "Service Title",
    description: "Bringing visuals to life through developing highly functional web solutions."
});

import { Rocket } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    description: string;
}

 function ServiceCard({ title, description }: ServiceCardProps) {
    return (
        <div className="relative bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group overflow-hidden flex flex-col h-full">

            {/* Decorative subtle background element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100/50 transition-colors duration-500 pointer-events-none"></div>

            {/* Top Right Badge */}
            <div className="absolute top-0 right-0 bg-[#1da1f2] text-white w-14 h-14 flex items-center justify-center rounded-bl-[1.5rem] group-hover:bg-[#1a91da] transition-colors shadow-sm">
                <Rocket size={22} strokeWidth={1.5} className="text-white" />
            </div>

            <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 pr-10 relative z-10">
                {title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                {description}
            </p>
        </div>
    );
}

export default function ServicesSection() {
    return (
        <section className="py-24 relative">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                <div className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-6 bg-white shadow-sm">
                    Our Services
                </div>

                <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-[1.2]">
                    Managed IT and Cybersecurity That <br className="hidden sm:block" />
                    <span className="text-[#1da1f2]">Scales</span> With You
                </h2>

                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    From infrastructure management and cloud environments to endpoint protection and network security,
                    our services are designed to keep your systems running smoothly and your data protected. We provide
                    proactive monitoring, fast response, and long-term stability.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    );
}
