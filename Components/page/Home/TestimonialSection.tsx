import React from 'react';
import { QuoteIcon, StarIcon } from '@/Components/global/Icons';

const TestimonialSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center h-full">
            {/* Left Content (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
                <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                    ✦ Our Client Says
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
                    Hear from Our <br />
                    <span className="relative inline-block">
                     Satisfied
                     <svg className="absolute -bottom-2 left-0 w-full h-3 text-lime-400" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </span> <br />
                    Customers
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                </p>

                {/* Trusted Logos */}
                <div className="pt-12">
                    <p className="text-sm text-gray-500 mb-4">Trusted by:</p>
                    <div className="flex flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-lg font-bold flex items-center gap-2"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> Goodwell</span>
                        <span className="text-lg font-bold flex items-center gap-2"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> Shutterframe</span>
                        <span className="text-lg font-bold flex items-center gap-2"><div className="w-4 h-4 bg-gray-400 rounded-sm"></div> FocalPoint</span>
                    </div>
                </div>
            </div>

            {/* Right Content (3 cols) - Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <div className="relative bg-[#111] p-10 rounded-3xl border border-white/5 max-w-lg w-full shadow-2xl">
                    <div className="absolute -top-6 -left-6"><QuoteIcon /></div>

                    <h3 className="text-2xl font-serif text-white mb-4 mt-2">Awesome Design and Support</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        "Day shall form years which rule made first, make a our night life herb midst isn't fish give lights land morning lesser. Said cattle. Day shall form years which rule made first."
                    </p>

                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                                <img src="/api/placeholder/100/100" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Veronica Weiss</h4>
                                <p className="text-xs text-gray-500">Web-Designer</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-gray-500">Review Score</span>
                            <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                            </div>
                        </div>
                    </div>

                    {/* Bottom lime border */}
                    <div className="absolute bottom-0 left-10 right-10 h-1 bg-lime-400 rounded-t-full shadow-[0_0_20px_rgba(163,230,53,0.5)]"></div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;
