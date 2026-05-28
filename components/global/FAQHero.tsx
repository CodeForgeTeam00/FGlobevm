import React from "react";

export function FAQHero() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-20 mb-10">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Frequently Asked<br />Questions
            </h2>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-xl">
                Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what's included, how support works, and what to expect during onboarding.
            </p>
        </div>
    );
}