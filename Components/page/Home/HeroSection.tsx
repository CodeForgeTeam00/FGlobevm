import React from 'react';

const HeroSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
                <div className="inline-block px-4 py-1 border border-yellow-600/50 rounded-full bg-yellow-900/10 text-yellow-400 text-xs font-bold tracking-wider uppercase">
                    ✦ Digital Studio
                </div>

                <h1 className="text-5xl lg:text-7xl font-serif leading-tight">
                    We Design & Build <br />
                    <span className="text-lime-400 italic">Premium</span> Web <br />
                    Experiences.
                </h1>

                <div className="flex items-center gap-12 pt-4">
                    <div>
                        <h3 className="text-3xl font-bold text-white">1500+</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Hours of Working</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white">550K+</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Lines of code</p>
                    </div>
                </div>

                <div className="pt-12">
                    <p className="text-sm text-gray-500 mb-4">Trusted by:</p>
                    <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-lg font-bold flex items-center gap-2"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> Goodwell</span>
                        <span className="text-lg font-bold flex items-center gap-2"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> Shutterframe</span>
                        <span className="text-lg font-bold flex items-center gap-2 hidden xl:flex"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> FocalPoint</span>
                    </div>
                </div>
            </div>

            {/* Right Content (3D Card) */}
            <div className="relative group perspective-1000 hidden md:block">
                <div className="relative z-10 transform transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-12 bg-white text-black p-1 rounded-2xl shadow-2xl shadow-lime-400/20 border-t-4 border-l-4 border-blue-500">
                    <div className="absolute -top-6 -left-6 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">Image</div>
                    <div className="bg-gray-100 rounded-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 relative">
                        <h2 className="text-4xl font-bold text-center uppercase leading-none tracking-tighter text-slate-800 mix-blend-multiply">
                            Create <br /> Content
                        </h2>
                        <div className="absolute bottom-10 right-10 w-24 h-32 bg-yellow-400 rounded-lg shadow-lg rotate-12 z-0"></div>
                        <div className="absolute bottom-0 z-10 w-full h-1/2 bg-gradient-to-t from-gray-200 to-transparent"></div>
                    </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500 -z-10"></div>
            </div>
        </div>
    );
};

export default HeroSection;
