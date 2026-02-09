"use client";
import {useState} from "react";
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
    number: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ number, question, answer, isOpen, onClick }) => {
    return (
        <div
            className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border ${isOpen ? 'border-sky-300 shadow-lg' : 'border-transparent shadow-sm'}`}
        >
            <button
                onClick={onClick}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 group"
            >
        <span className={`text-[15px] md:text-lg font-bold transition-colors ${isOpen ? 'text-sky-500' : 'text-slate-800'}`}>
          {number}. {question}
        </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 text-[14px] md:text-[15px] leading-relaxed font-medium">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    const faqs = [
        {
            question: "How quickly do you respond to IT or security issues?",
            answer: "Our team monitors systems around the clock and responds to critical issues within minutes, not hours. Most problems are identified and handled before they impact your operations, and urgent incidents follow a defined escalation process to restore stability as fast as possible."
        },
        {
            question: "How quickly do you respond to IT or security issues?",
            answer: "We offer guaranteed response times based on the severity level. For high-priority security threats, we have an immediate response protocol to isolate the threat and begin remediation steps instantly."
        },
        {
            question: "Do you support cloud, on-premise, and hybrid environments?",
            answer: "Yes, we specialize in multi-environment setups. Whether you are fully in the cloud, maintaining physical servers, or running a hybrid infrastructure, we have the expertise to manage and secure your entire ecosystem seamlessly."
        },
        {
            question: "How do you protect our data from ransomware and breaches?",
            answer: "We implement a multi-layered security approach including 24/7 monitoring, advanced firewalls, endpoint protection, and automated backups. We also conduct regular penetration testing and employee security awareness training to ensure your perimeter remains unbreachable."
        }
    ];

    return (
        <section className="px-6 py-20 max-w-7xl mx-auto">
            <div className="bg-[#1da1f2] rounded-[3.5rem] p-8 md:p-16 lg:p-24 shadow-2xl shadow-sky-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
                    <h2 className="font-serif-heading text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        Frequently Asked <br /> Questions
                    </h2>
                    <div className="max-w-md">
                        <p className="text-white/80 text-[14px] md:text-base leading-relaxed font-medium border-l-2 border-white/20 pl-6 py-2">
                            Quick answers about our services, response times, security practices, and what working with
                            GlobeVM looks like day to day. This section helps you understand what's included, how support
                            works, and what to expect during onboarding.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 max-w-5xl">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            number={index + 1}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
