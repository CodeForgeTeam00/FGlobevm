
import React from 'react';
import { Phone } from 'lucide-react';

export const ContactCTA: React.FC = () => {
    return (
        <section className="">
            <div className="bg-[#f8fafc] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 shadow-sm">
                <div>
                    <h2 className="font-serif-heading text-3xl md:text-4xl font-black text-slate-900 mb-3 text-center md:text-left">
                        Need help? Talk to our expert.
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base font-medium text-center md:text-left">
                        Talk to our experts or Browse through more properties.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-3 bg-[#1da1f2] hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-sky-200/50 active:scale-95 whitespace-nowrap">
                    <Phone className="w-5 h-5 fill-white/20" />
                    Contact US
                </button>
            </div>
        </section>
    );
};
