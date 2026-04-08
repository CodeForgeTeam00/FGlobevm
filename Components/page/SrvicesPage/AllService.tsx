import { ChevronRight, Server } from 'lucide-react';
import Container from "@/Components/global/Sections/Container";


const services = Array(12).fill({
    title: 'Service Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
});

export default function AllServices() {
    return (
        <section className="py-12   font-sans">
            <div className="bg-gradient-to-br from-[#166e9c] to-[#0f4d70] rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[80%] pointer-events-none opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M -50 100 Q 50 0 150 100 T 350 100" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M -50 120 Q 50 20 150 120 T 350 120" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M -50 140 Q 50 40 150 140 T 350 140" fill="none" stroke="white" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[120%] pointer-events-none opacity-[0.07]">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {[...Array(15)].map((_, i) => (
                            <circle key={i} cx="150" cy="150" r={30 + i * 8} fill="none" stroke="white" strokeWidth="0.5" />
                        ))}
                    </svg>
                </div>
                    <Container>
                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16">
                                <div className="flex-1">
                                    <div className="inline-block border border-white/30 text-white rounded-full px-5 py-1.5 text-xs font-medium mb-6 backdrop-blur-sm">
                                        Our Services
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                                        Managed IT and Cybersecurity <br className="hidden xl:block" /> That Scales With You
                                    </h2>
                                </div>
                                <div className="flex-1 lg:max-w-lg text-white/90 text-sm md:text-base leading-relaxed lg:pt-14">
                                    From infrastructure management and cloud environments to endpoint protection and network security, our services are designed to keep your systems running smoothly and your data protected. We provide proactive monitoring, fast response, and long-term stability.
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {services.map((service, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex gap-4 md:gap-5 group cursor-pointer">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                                                <Server className="w-5 h-5 md:w-6 md:h-6 text-sky-500" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">{service.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                                                {service.description}
                                            </p>
                                            <div className="text-sky-500 text-xs md:text-sm font-medium flex items-center gap-1 mt-auto w-fit">
                                                Show More <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
            </div>
        </section>
    );
}
