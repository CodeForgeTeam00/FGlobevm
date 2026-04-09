import { Calendar, Phone } from 'lucide-react';
import Container from "@/Components/global/Sections/Container";

export default function HeroSection() {
    return (
        <section className="relative bg-black pt-20 pb-32 sm:pt-28 sm:pb-40 px-4 sm:px-6 lg:px-8 mb-20">

            {/* Background Image (Right side) */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-60 lg:opacity-100">
                {/* Using a placeholder that matches the vibe of the smiling man in the dark background */}
                <img
                    src="https://picsum.photos/seed/smilingman/1000/1000"
                    alt="Professional IT Expert"
                    className="w-full h-full object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_20%)]"
                    referrerPolicy="no-referrer"
                />
            </div>
            <Container>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-2xl">

                        {/* Badge */}
                        <div className="inline-flex items-center border border-[#1da1f2]/40 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-medium tracking-wide mb-8 bg-black/50 backdrop-blur-sm">
                            About us
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.15]">
                            Proactive IT That Keeps Your Business <span className="text-[#1da1f2]">Secure</span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
                            We manage, secure, and optimize your infrastructure so your team can focus on
                            growth instead of downtime. From virtual environments to network protection,
                            we keep your systems stable, fast, and protected.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="bg-[#1da1f2] hover:bg-[#1a91da] text-white rounded-xl px-6 py-3.5 font-medium flex items-center gap-2.5 transition-colors shadow-lg shadow-[#1da1f2]/20">
                                <Calendar size={18} />
                                Book A Free Consulation
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-gray-900 rounded-xl px-6 py-3.5 font-medium flex items-center gap-2.5 transition-colors">
                                <Phone size={18} className="text-gray-500" />
                                Get A Free Penetration Test
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
            
            {/* Stats Bar (Positioned at the bottom overlapping the section edge) */}
            <div className="absolute bottom-0 left-0 w-full translate-y-1/2 px-4 sm:px-6 lg:px-8 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row shadow-2xl shadow-black/10 rounded-2xl overflow-hidden">

                        {/* Stats Container */}
                        <div className="flex-grow bg-white grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">

                            <div className="p-6 sm:p-8 text-center flex flex-col justify-center">
                                <div className="text-3xl sm:text-4xl font-serif text-[#1da1f2] mb-1">99.9%</div>
                                <div className="text-xs sm:text-sm text-[#1da1f2] font-medium">Uptime Guarantee</div>
                            </div>

                            <div className="p-6 sm:p-8 text-center flex flex-col justify-center">
                                <div className="text-3xl sm:text-4xl font-serif text-gray-900 mb-1">15 Min</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">Response Time</div>
                            </div>

                            <div className="p-6 sm:p-8 text-center flex flex-col justify-center">
                                <div className="text-3xl sm:text-4xl font-serif text-gray-900 mb-1">24/7</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">System Monitoring</div>
                            </div>

                            <div className="p-6 sm:p-8 text-center flex flex-col justify-center">
                                <div className="text-3xl sm:text-4xl font-serif text-gray-900 mb-1">500+</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">Endpoints Protected</div>
                            </div>

                        </div>

                        {/* Blue CTA Box */}
                        <div className="bg-[#1da1f2] text-white p-8 lg:w-64 flex items-center justify-center text-center">
                            <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                                Why Choose <br /> GlobeVM
                            </h3>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}
