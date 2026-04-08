import Container from "@/Components/global/Sections/Container";

const features = Array(4).fill({
    title: "24/7 Availability",
    description: "Bringing visuals to life through developing highly functional web solutions."
});
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
}
 function FeatureCard({ title, description }: FeatureCardProps) {
    return (
        <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 h-full flex flex-col">

            {/* Custom Icon matching the design */}
            <div className="mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Building Base */}
                    <path d="M14 28V14L24 9V28H14Z" fill="#e0f2fe"/>
                    <path d="M8 28V18L14 15V28H8Z" fill="#bae6fd"/>

                    {/* Windows */}
                    <rect x="16" y="16" width="2" height="2" fill="#7dd3fc" />
                    <rect x="20" y="16" width="2" height="2" fill="#7dd3fc" />
                    <rect x="16" y="20" width="2" height="2" fill="#7dd3fc" />
                    <rect x="20" y="20" width="2" height="2" fill="#7dd3fc" />

                    {/* Badge/Clock */}
                    <circle cx="26" cy="22" r="7" fill="#1da1f2"/>
                    <path d="M26 19V22.5L28 24.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <h4 className="text-[#1da1f2] font-bold text-lg mb-3 leading-tight">
                {title}
            </h4>

            <p className="text-gray-500 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}


export default function WhyUsSection() {
    return (
        <section className="py-12">
            <div className="bg-gradient-to-br from-[#1681b3] to-[#0d597f] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-blue-900/10">

                {/* Background Decorative SVGs */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    <path d="M-100,-100 C200,100 300,400 200,600" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M-50,-100 C250,100 350,400 250,600" fill="none" stroke="white" strokeWidth="1" />
                </svg>

                <svg className="absolute bottom-0 right-0 w-[40rem] h-[40rem] opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M10 100 Q 50 50 100 100 T 190 100" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M10 120 Q 50 70 100 120 T 190 120" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>

                <div className="relative z-10">
                    {/* Header Area */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-16">
                        <div>
                            <div className="inline-flex items-center border border-white/30 text-white rounded-full px-4 py-1.5 text-xs font-medium mb-6 backdrop-blur-sm">
                                Why us
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[1.2]">
                                Why Businesses Choose <br className="hidden sm:block" /> GlobeVM
                            </h2>
                        </div>

                        <div className="lg:pt-14">
                            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
                                From infrastructure management and cloud environments to endpoint protection and network
                                security, our services are designed to keep your systems running smoothly and your data
                                protected. We provide proactive monitoring, fast response, and long-term stability.
                            </p>
                        </div>
                    </div>

                    {/* Cards Grid */}
                        <Container>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <FeatureCard
                                        key={index}
                                        title={feature.title}
                                        description={feature.description}
                                    />
                                ))}
                            </div>
                        </Container>
                </div>
            </div>
        </section>
    );
}
