"use client"
import Image from "next/image";
import { useState } from 'react';
import { Share2, MessageCircle, Calendar, Play, Plus, Minus, Search, Home, ChevronRight } from 'lucide-react';
function FaqItem({ question, answer, isOpenDefault = false }: { question: string, answer: string, isOpenDefault?: boolean }) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#00a0e9] shadow-md' : 'border-gray-200'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${isOpen ? 'bg-[#00a0e9] text-white' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
            >
                <span className="font-medium text-lg">{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 bg-[#00a0e9] text-white/90 text-lg leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}


export function FaqBlock({ faqs }: { faqs: any[] }) {
    return (
        <div className="my-12">
            <h2 className="text-3xl font-bold font-serif mb-8 text-gray-900">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
                {faqs.map((faq: any, index: number) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer}  />
                ))}
            </div>
        </div>
    );
}
