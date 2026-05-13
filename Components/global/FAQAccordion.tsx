"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQItem } from "@/types/wp-options";
type FAQVariant = "light" | "dark";
interface FAQAccordionProps {
    items: FAQItem[];
    variant?: FAQVariant;
}
export function FAQAccordion({ items, variant = "light" }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const isLight = variant === "light";
    return (
        <div className="flex flex-col gap-4">
            {items.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`rounded-[24px] overflow-hidden transition-colors duration-300 ${
                            isOpen
                                ? isLight
                                    ? "bg-white border border-sky-300"
                                    : "bg-primary-6 text-white"
                                : isLight
                                    ? "bg-white border border-transparent"
                                    : "bg-white border border-neutral-30   hover:border-primary-6"
                        } `}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full text-left px-5 py-4 lg:p-6 flex cursor-pointer items-center justify-between gap-4"
                        >
                            <span
                                className={`text-[15px] md:text-lg font-bold transition-colors ${
                                    isOpen
                                        ? isLight
                                            ? "text-primary-6"
                                            : "text-white"
                                        : "text-neutral-black"
                                }`}
                            >
                                {index + 1}. {faq.question}
                            </span>
                            <div
                                className={`flex-shrink-0 lg:w-10 w-6 h-6 lg:h-10 rounded-full flex items-center justify-center transition-all ${
                                    isOpen
                                        ? isLight
                                            ? "bg-primary-6 text-white"
                                            : "bg-white text-primary-6"
                                        : "bg-white text-neutral-black border border-neutral-30"
                                }`}
                            >
                                {isOpen ? (
                                    <Minus className="lg:w-5 w-3 lg:h-5 h-3" />
                                ) : (
                                    <Plus className="lg:w-5 w-3 lg:h-5 h-3" />
                                )}
                            </div>
                        </button>
                        <div
                            className={`grid transition-all  duration-300 ease-in-out ${
                                isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={`px-8 pb-8 text-[14px] md:text-[15px] leading-relaxed font-medium ${
                                        isOpen && !isLight
                                            ? "text-white/90"
                                            : "text-neutral-100"
                                    }`}
                                >
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}