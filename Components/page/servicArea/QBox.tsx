"use client"
import { useState } from 'react';
import {FAQSection} from "@/Components/page/Home/FAQSection";

const faqs = [
    {
        question: "1. How quickly do you respond to IT or security issues?",
        answer: "Our team monitors systems around the clock and responds to critical issues within minutes, not hours. Most problems are identified and handled before they impact your operations, and urgent incidents follow a defined escalation process to restore stability as fast as possible."
    },
    {
        question: "2. How quickly do you respond to IT or security issues?",
        answer: "Our team monitors systems around the clock and responds to critical issues within minutes, not hours. Most problems are identified and handled before they impact your operations, and urgent incidents follow a defined escalation process to restore stability as fast as possible."
    },
    {
        question: "3. Do you support cloud, on-premise, and hybrid environments?",
        answer: "Yes, we have extensive experience managing fully cloud-based infrastructures, traditional on-premise servers, and complex hybrid environments tailored to your specific business needs."
    },
    {
        question: "4. How do you protect our data from ransomware and breaches?",
        answer: "We employ a multi-layered security approach including real-time endpoint protection, regular immutable backups, employee security training, and strict access controls to ensure your data remains secure."
    }
];

import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer?: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className={`border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                isOpen
                    ? 'bg-[#1da1f2] text-white border-transparent shadow-lg shadow-blue-500/20'
                    : 'bg-white text-gray-900 border-gray-100 hover:border-gray-300 shadow-sm'
            }`}
            onClick={onClick}
        >
            <div className="flex justify-between items-center gap-4">
                <h3 className="font-semibold text-base sm:text-lg leading-snug">{question}</h3>
                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-white text-[#1da1f2]' : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}
                >
                    {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={2} />}
                </div>
            </div>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
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

export default function QBox() {
    const [openIndex, setOpenIndex] = useState<number>(1); // Default open the second one to match image

    return (
        <section className="py-20 px-4 sm:px-6  overflow-hidden">
                <div className=" flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
        </section>
    );
}