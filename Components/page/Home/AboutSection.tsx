import React from 'react';
import { ArrowRightIcon } from '@/Components/global/Icons';

const AboutSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image Area */}
            <div className="relative">
                <div className="relative z-10 w-full h-[500px] bg-gray-800 rounded-t-full rounded-b-3xl overflow-hidden border border-white/10 group">
                    {/* Placeholder for Image */}
                    <img src="/api/placeholder/600/800" alt="Team" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />

                    {/* Floating Yellow Banner */}
                    <div className="absolute bottom-8 -left-4 bg-lime-400 text-black py-3 px-6 -rotate-2 font-bold text-sm shadow-xl whitespace-nowrap z-20">
                        We Design & Build Premium Web Experiences. ✦
                    </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-lime-400/20 blur-[100px] -z-10 rounded-full"></div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
                <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                    ✦ About Us
                </div>

                <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
                    We Help You Build <br/>
                    Your <span className="text-lime-400 italic">Dream</span> Project
                </h2>

                <div className="flex gap-4">
                    <button className="bg-white/10 text-white px-4 py-1 rounded-full text-xs hover:bg-white/20 transition">Short bio</button>
                    <button className="text-gray-500 px-4 py-1 rounded-full text-xs hover:text-white transition">Long bio</button>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    Dominion let first, won't seasons brought. Face moveth cattle, a also, fifth subdue. Life after the kind them likeness. Our, midst beginning face all itself.
                </p>

                <div className="flex items-center gap-12 pt-4">
                    <div>
                        <h3 className="text-5xl font-serif text-lime-400">12+</h3>
                        <p className="text-sm text-white font-bold mt-2">Years</p>
                        <p className="text-xs text-gray-500">Experience Working</p>
                    </div>

                    <button className="bg-lime-400 hover:bg-lime-300 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105">
                        Lets Start <ArrowRightIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
