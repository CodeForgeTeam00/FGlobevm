"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
    number: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
                                             number,
                                             question,
                                             answer,
                                             isOpen,
                                             onClick,
                                         }) => {
    return (
        <div
            className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 border ${
                isOpen ? "border-sky-300 shadow-lg" : "border-transparent shadow-sm"
            }`}
        >
            <button
                onClick={onClick}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 group"
            >
                <span
                    className={`text-[15px] md:text-lg font-bold transition-colors ${
                        isOpen ? "text-primary-6" : "text-neutral-black"
                    }`}
                >
                    {number}. {question}
                </span>

                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isOpen
                            ? "bg-primary-6 text-white"
                            : "bg-slate-50 text-slate-400 border border-slate-100"
                    }`}
                >
                    {isOpen ? (
                        <Minus className="w-5 h-5" />
                    ) : (
                        <Plus className="w-5 h-5" />
                    )}
                </div>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 md:px-8 pb-8 pt-0 text-neutral-100 text-[14px] md:text-[15px] leading-relaxed font-medium">
                    {answer}
                </div>
            </div>
        </div>
    );
};

interface FAQSectionProps {
    faq: {
        question: string;
        answer: string;
    }[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faq }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 max-w-[1540px] mx-auto">
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
                    <h2 className="font-serif-heading text-xl md:text-3xl lg:text-4xl font-bold text-white leading-normal">
                        Frequently Asked <br /> Questions
                    </h2>

                    <div>
                        <p className="text-white/80 text-[14px] md:text-base lg:text-lg leading-relaxed font-medium pl-6 py-2">
                            Quick answers about our services, response times, security practices...
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {faq.map((item, index) => (
                        <FAQItem
                            key={index}
                            number={index + 1}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};