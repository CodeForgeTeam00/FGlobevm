
import React from 'react';

export const AboutStability: React.FC = () => {
    return (
        <section className="relative py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side Text Content */}
                    <div className="z-10">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-sky-400 text-sky-500 text-[10px] font-bold tracking-widest uppercase mb-8">
                            WHO WE ARE
                        </div>
                        <h2 className="font-serif-heading text-[42px] lg:text-[54px] font-black text-[#111827] leading-[1.1] mb-8">
                            Built for Companies <br />
                            That Need <span className="text-sky-500 italic">Stability</span>
                        </h2>
                        <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-lg font-medium">
                            GlobeVM was created to help growing companies run reliable, secure, and
                            scalable IT environments without the overhead of a full internal team. We
                            specialize in virtual infrastructure, managed IT, and cybersecurity designed for
                            real-world business operations.
                        </p>
                    </div>

                    {/* Right Side Image Content */}
                    <div className="relative">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-1">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                                alt="Modern Office Building"
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Floating Stats Bar */}
                <div className="relative lg:-mt-20 z-30 mt-12">
                    <div className="bg-[#1da1f2] rounded-3xl p-8 lg:p-12 shadow-2xl shadow-sky-200 flex flex-wrap lg:flex-nowrap justify-between items-center gap-8 lg:divide-x lg:divide-white/20">

                        <div className="flex-1 text-center lg:text-left px-4">
                            <div className="font-serif-heading text-3xl font-black text-white mb-1">99.9%</div>
                            <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest">Uptime Guarantee</div>
                        </div>

                        <div className="flex-1 text-center lg:text-left px-4">
                            <div className="font-serif-heading text-3xl font-black text-white mb-1">15 Min</div>
                            <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest">Response Time</div>
                        </div>

                        <div className="flex-1 text-center lg:text-left px-4">
                            <div className="font-serif-heading text-3xl font-black text-white mb-1">24/7</div>
                            <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest">System Monitoring</div>
                        </div>

                        <div className="flex-1 text-center lg:text-left px-4">
                            <div className="font-serif-heading text-3xl font-black text-white mb-1">500+</div>
                            <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest">Endpoints Protected</div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
