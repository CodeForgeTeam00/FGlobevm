"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface Props {
    faqs: FAQItem[];
    title?: string;
    description?: string;
}

function FAQItemComponent({
                              question,
                              answer,
                              isOpen,
                              onClick,
                          }: {
    question: string;
    answer?: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div
            className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isOpen
                    ? "bg-[#1da1f2] text-white border-transparent shadow-lg shadow-blue-500/20"
                    : "bg-white text-gray-900 border-gray-100 hover:border-gray-300 shadow-sm"
            }`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center gap-4">
                <h3 className="font-semibold text-base sm:text-lg leading-snug">
                    {question}
                </h3>
                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                            ? "bg-white text-[#1da1f2]"
                            : "bg-gray-50 text-gray-500 border border-gray-200"
                    }`}
                >
                    {isOpen ? (
                        <Minus size={16} strokeWidth={3} />
                    ) : (
                        <Plus size={16} strokeWidth={2} />
                    )}
                </div>
            </div>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="text-sm sm:text-base leading-relaxed opacity-90">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function QBox({ faqs, title, description }: Props) {
    const [openIndex, setOpenIndex] = useState<number>(1);

    return (
        <section className="py-20 px-4 sm:px-6 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                <div className="lg:col-span-5 relative">
                    <div className="absolute -top-20 -left-10 text-[15rem] font-serif text-emerald-50 opacity-60 -z-10 leading-none select-none">
                        ?
                    </div>
                    <div className="absolute top-10 left-20 text-[12rem] font-serif text-emerald-50 opacity-40 -z-10 leading-none select-none">
                        ?
                    </div>
                    <div className="absolute top-1/2 left-full w-3 h-3 bg-blue-100 rounded-full blur-[1px]" />
                    <div className="absolute bottom-10 left-1/2 w-2 h-2 bg-blue-100 rounded-full blur-[1px]" />

                    <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                        {title || "Frequently Asked"} <br /> {title ? "" : "Questions"}
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
                        {description ||
                            "Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what's included, how support works, and what to expect during onboarding."}
                    </p>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItemComponent
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() =>
                                setOpenIndex(openIndex === index ? -1 : index)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
