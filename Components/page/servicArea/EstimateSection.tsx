import { Phone } from 'lucide-react';
import EstimateForm from './EstimateForm';
import Container from "@/Components/global/Sections/Container";

export default function EstimateSection() {
    return (
            < >
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] rounded-full bg-emerald-50/50 blur-3xl"></div>

                    {/* Simulating the wavy lines from the image with SVG */}
                    <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="waves" width="100" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                                <path d="M0 30 Q 25 10, 50 30 T 100 30" fill="none" stroke="currentColor" strokeWidth="1"/>
                                <path d="M0 40 Q 25 20, 50 40 T 100 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#waves)" />
                    </svg>
                </div>

                <Container >
                    <div className={'grid grid-cols-2'}>
                        <div className="">
                            <div className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-4 py-1.5 text-sm font-medium mb-8 bg-white/50 backdrop-blur-sm">
                                Proactive IT
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-[1.15]">
                                Proactive IT That Keeps Your Business <span className="text-[#1da1f2]">Secure</span>
                            </h1>

                            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10">
                                We manage, secure, and optimize your infrastructure so your team can focus on
                                growth instead of downtime. From virtual environments to network protection,
                                we keep your systems stable, fast, and protected.
                            </p>

                            <button className="bg-[#1da1f2] hover:bg-[#1a91da] text-white rounded-full px-8 py-4 font-semibold flex items-center gap-3 transition-all shadow-lg shadow-[#1da1f2]/20 hover:shadow-[#1da1f2]/40 hover:-translate-y-0.5">
                                <Phone size={20} className="fill-white/20" />
                                Call (310) 750-4939
                            </button>
                        </div>

                        {/* Right Content - Form */}
                        <div className=" w-full ">
                            <EstimateForm />
                        </div>
                    </div>

                </Container>
            </>
    );
}
