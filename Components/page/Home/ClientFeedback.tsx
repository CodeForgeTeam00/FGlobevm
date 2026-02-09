
import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ClientFeedback: React.FC = () => {
    return (
        <section className="relative py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Area */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-sky-400 text-sky-500 text-[10px] font-bold tracking-widest uppercase mb-8">
                        CLIENT FEEDBACK
                    </div>
                    <h2 className="font-serif-heading text-[42px] lg:text-[54px] font-black text-[#111827] leading-[1.1] mb-8">
                        Trusted by Businesses That Value <br />
                        <span className="text-sky-500 italic">Reliability</span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-[14px] md:text-base leading-relaxed font-medium">
                        Business owners trust GlobeVM to keep their operations secure and reliable. Our clients value our responsiveness,
                        technical expertise, and ability to prevent problems before they impact productivity.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">

                    {/* Left: Testimonial Card */}
                    <div className="relative bg-[#0ea5e9] rounded-[2.5rem] p-12 text-white flex flex-col justify-between overflow-hidden group shadow-2xl shadow-sky-200/50">
                        {/* Background Decorative Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

                        <div className="relative z-10">
                            <Quote className="w-12 h-12 text-white/40 mb-10" fill="currentColor" />
                            <h3 className="font-serif-heading text-3xl md:text-4xl font-black mb-6 leading-tight">
                                Refined Experiences
                            </h3>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                                "The service feels premium and the expertise is evident in every
                                detail. I love how the team maintains our infrastructure and quality even after
                                complex upgrades or migrations."
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="font-bold text-xl mb-1">Behnam Jafari</div>
                                <div className="text-white/60 text-sm font-bold uppercase tracking-widest">CTO @ TechFlow</div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                                <Star className="w-5 h-5 text-white/30" />
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                            <div className="w-2 h-2 rounded-full bg-white/30"></div>
                            <div className="w-2 h-2 rounded-full bg-white/30"></div>
                        </div>
                    </div>

                    {/* Right: Large Visual Image */}
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-full min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"
                            alt="Premium Experience"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>

                {/* Bottom Small Card: Happy Customers */}
                <div className="inline-flex items-center gap-12 bg-[#f8fafc] p-6 pr-12 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex -space-x-4">
                        {[
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                        ].map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border-4 border-[#f8fafc] object-cover"
                            />
                        ))}
                    </div>
                    <div>
                        <div className="font-serif-heading text-xl font-black text-slate-900">100+ Happy Customers</div>
                        <div className="text-slate-400 text-sm font-medium">Work with people and brands worldwide.</div>
                    </div>
                </div>

            </div>
        </section>
    );
};
