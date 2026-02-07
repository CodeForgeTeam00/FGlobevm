import React from 'react';
import { ServiceIcon } from '@/Components/global/Icons';

const WhyUsSection = () => {
    const features = [
        { id: '01', title: "Title Feature", desc: "lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text lorem Ipsum is simply dummy text." },
        { id: '02', title: "Title Feature", desc: "lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text lorem Ipsum is simply dummy text." },
        { id: '03', title: "Title Feature", desc: "lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text lorem Ipsum is simply dummy text." },
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div className="space-y-6 max-w-2xl">
                    <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                        ✦ Reason For Choose Us
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-serif leading-tight">
                        What Difference Between <span className="text-lime-400">US</span> <br />
                        and the others
                    </h2>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed max-w-md pb-2">
                    lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text lorem Ipsum is simply dummy text.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <div key={feature.id} className="relative bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl hover:border-lime-400/30 transition duration-300 group">

                        {/* Number Badge (Top Right) */}
                        <div className="absolute top-0 right-0 bg-lime-400 text-black font-bold font-mono text-sm px-4 py-3 rounded-bl-2xl rounded-tr-2xl">
                            {feature.id}
                        </div>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-full border border-lime-400/30 text-lime-400 flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:text-black transition duration-300">
                            <ServiceIcon />
                        </div>

                        <h3 className="text-xl font-serif text-white mb-4 group-hover:text-lime-400 transition">{feature.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed opacity-80">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUsSection;
