
import React from 'react';
import { Wand2 } from 'lucide-react';

const FEATURES = [
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions.',
    },
    {
        title: 'SEO',
        description: 'Bringing visuals to life through developing highly functional web solutions.',
    },
];

export const WhyChooseUs: React.FC = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Decorative Dot Grid Background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-10 pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#0ea5e9 1.5px, transparent 0)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full border border-sky-400 text-sky-500 text-[10px] font-bold tracking-widest uppercase mb-8">
                    WHY GLOBEVM
                </div>

                <h2 className="font-serif-heading text-4xl md:text-5xl font-black text-slate-900 mb-8">
                    Why Businesses Choose <span className="text-sky-500">GlobeVM</span>
                </h2>

                <p className="text-slate-400 max-w-4xl mx-auto text-sm md:text-base leading-relaxed mb-16 font-medium">
                    We don't just fix problems after they happen. Our team monitors, secures, and maintains your environment around the clock to prevent costly disruptions. You get predictable performance, clear communication, and IT that actually supports your business goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-50 text-left transition-all hover:translate-y-[-8px] hover:shadow-xl hover:shadow-sky-500/5"
                        >
                            <div className="mb-8">
                                <Wand2 className="w-10 h-10 text-sky-500" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif-heading text-xl font-bold text-slate-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                {feature.description}
                            </p>

                            {/* Bottom blue line indicator as per image */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-sky-500 rounded-t-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};