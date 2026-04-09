"use client"
import { useState } from 'react';

import { Plus, Minus } from 'lucide-react';
import Container from "@/Components/global/Sections/Container";

interface FAQItemProps {
    question: string;
    answer?: string;
    isOpen: boolean;
    onClick: () => void;
}

 function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className="bg-white rounded-[1.5rem] p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            onClick={onClick}
        >
            <div className="flex justify-between items-center gap-4">
                <h3 className={`font-semibold text-base sm:text-lg leading-snug transition-colors ${isOpen ? 'text-[#1da1f2]' : 'text-gray-900'}`}>
                    {question}
                </h3>
                <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? 'bg-[#1da1f2] text-white' : 'bg-white text-gray-400 border border-gray-200'
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
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed pr-12">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}


const faqs = [
    {
        id: 1,
        question: "1. How quickly do you respond to IT or security issues?",
        answer: "Our team monitors systems around the clock and responds to critical issues within minutes, not hours. Most problems are identified and handled before they impact your operations, and urgent incidents follow a defined escalation process to restore stability as fast as possible."
    },
    {
        id: 2,
        question: "2. How quickly do you respond to IT or security issues?",
        answer: "Our team monitors systems around the clock and responds to critical issues within minutes, not hours. Most problems are identified and handled before they impact your operations, and urgent incidents follow a defined escalation process to restore stability as fast as possible."
    },
    {
        id: 3,
        question: "3. Do you support cloud, on-premise, and hybrid environments?",
        answer: "Yes, we have extensive experience managing fully cloud-based infrastructures, traditional on-premise servers, and complex hybrid environments tailored to your specific business needs."
    },
    {
        id: 4,
        question: "4. How do you protect our data from ransomware and breaches?",
        answer: "We employ a multi-layered security approach including real-time endpoint protection, regular immutable backups, employee security training, and strict access controls to ensure your data remains secure."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number>(1); // Default open the second one to match image

    return (
        <section className="py-24">
            <div className="bg-gradient-to-br from-[#1681b3] to-[#0d597f] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-blue-900/10">

                {/* Background Decorative SVGs */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    <path d="M-100,-100 C200,100 300,400 200,600" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M-50,-100 C250,100 350,400 250,600" fill="none" stroke="white" strokeWidth="1" />
                </svg>

                <svg className="absolute bottom-0 right-0 w-[40rem] h-[40rem] opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M10 100 Q 50 50 100 100 T 190 100" fill="none" stroke="white" strokeWidth="0.5" />
                    <path d="M10 120 Q 50 70 100 120 T 190 120" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>

                <Container>
                    <div className="relative z-10">
                        {/* Header Area */}
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-16">
                            <div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[1.2]">
                                    Frequently Asked <br className="hidden sm:block" /> Questions
                                </h2>
                            </div>

                            <div className="lg:pt-4">
                                <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
                                    Quick answers about our services, response times, security practices, and what working with GlobeVM looks like day to day. This section helps you understand what's included, how support works, and what to expect during onboarding.
                                </p>
                            </div>
                        </div>

                        {/* FAQ List */}
                        <div className="flex flex-col gap-4">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
