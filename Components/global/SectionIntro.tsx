import React from "react";

interface SectionIntroProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
                                                       badge,
                                                       title,
                                                       highlight,
                                                       description,
                                                   }) => {
    return (
        <div>
            {badge && (
                <div
                    className="inline-block px-4 py-2 rounded-full border border-sky-400 text-sky-500 text-[11px] font-extrabold tracking-[0.2em] uppercase mb-10 bg-white/50 backdrop-blur-sm">
                    {badge}
                </div>
            )}

            <h1 className="font-serif-heading text-[32px] lg:text-[40px] font-black text-[#111827] leading-[1.05] mb-8">
                {title}{" "}
                {highlight && <span className="text-[#38bdf8]">{highlight}</span>}
            </h1>

            {description && (
                <p className="text-[#64748b] text-[17px] leading-relaxed max-w-lg font-medium opacity-90">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionIntro;
