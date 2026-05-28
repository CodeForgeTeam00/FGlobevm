
import React from 'react';
import { Download } from 'lucide-react';

export const LeadMagnet: React.FC = () => {
    return (
        <section className="px-6 py-24 max-w-7xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="relative group w-full max-w-[320px] flex-shrink-0">
                    <div className="absolute -inset-4 bg-red-100 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl transform group-hover:rotate-[-2deg] transition-transform duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                            alt="Guide Cover"
                            className="w-full h-auto aspect-[3/4] object-cover"
                        />
                        <div className="absolute inset-0 bg-[#c53030]/90 p-8 flex flex-col justify-end text-white border-8 border-white/20">
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-80">GlobeVM Special Report</span>
                            <h3 className="text-2xl font-black mb-4 leading-tight">
                                What We Call Security
                            </h3>
                            <p className="text-[10px] font-medium opacity-70 leading-relaxed uppercase">
                                A Comprehensive Guide for Small and Medium Businesses to Safeguard their Future
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="font-serif-heading text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                        The Cyber Security Crisis
                    </h2>
                    <p className="text-slate-400 text-[15px] lg:text-lg font-medium leading-relaxed mb-10 max-w-2xl">
                        Urgent And Critical Protections Every Small Business Must Have In Place NOW To Protect
                        Your Reputation, Your Profitability, and Your Data from Digital Predators.
                    </p>
                    <button className="flex items-center justify-center gap-3 bg-[#1da1f2] hover:bg-sky-500 text-white px-10 py-5 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-sky-200/50 active:scale-95 group mx-auto lg:mx-0">
                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        Download the Guide
                    </button>
                </div>

            </div>
        </section>
    );
};
