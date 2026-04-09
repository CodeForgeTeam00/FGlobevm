"use client";

import React, { useEffect, useState } from "react";
import {
    LayoutGrid,
    MessageSquare,
    Ticket,
    Shield,
    RefreshCw,
    Radio,
    Minus,
    Plus,
} from "lucide-react";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";



// --------------------
// Types
// --------------------
type Category = {
    id: string;
    name: string;
    icon: React.ElementType;
};

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

// --------------------
// Data
// --------------------
const CATEGORIES: Category[] = [
    { id: "general", name: "General Info", icon: LayoutGrid },
    { id: "support", name: "Support", icon: MessageSquare },
    { id: "billing", name: "Billing", icon: Ticket },
    { id: "security", name: "Security", icon: Shield },
    { id: "updates", name: "Updates", icon: RefreshCw },
    { id: "network", name: "Network", icon: Radio },
];

const MOCK_FAQS: Record<string, FAQ[]> = {
    security: [
        {
            id: "sec1",
            question: "How quickly do you respond to IT or security issues?",
            answer: "Our team monitors systems 24/7 and responds within minutes.",
        },
        {
            id: "sec2",
            question: "What types of security audits do you provide?",
            answer:
                "We provide penetration testing, vulnerability scanning, and compliance audits.",
        },
    ],
    general: [
        {
            id: "g1",
            question: "What services does GlobeVM provide?",
            answer:
                "Cloud infrastructure, virtual machines, and networking solutions.",
        },
    ],
    support: [
        {
            id: "s1",
            question: "What are your support hours?",
            answer: "We offer 24/7 support for critical issues.",
        },
    ],
    billing: [
        {
            id: "b1",
            question: "How does billing work?",
            answer: "Pay-as-you-go monthly billing.",
        },
    ],
    updates: [
        {
            id: "u1",
            question: "How often do you release updates?",
            answer: "Weekly improvements and monthly features.",
        },
    ],
    network: [
        {
            id: "n1",
            question: "What uptime do you guarantee?",
            answer: "99.99% uptime SLA.",
        },
    ],
};

// --------------------
// Fake API
// --------------------
const fetchFaqsByCategory = async (categoryId: string): Promise<FAQ[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_FAQS[categoryId] || []);
        }, 400);
    });
};

// --------------------
// Component
// --------------------
export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState<string>("security");
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            setLoading(true);
            const data = await fetchFaqsByCategory(activeCategory);

            if (!ignore) {
                setFaqs(data);
                setOpenIndex(null); // close all when switching tab
                setLoading(false);
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, [activeCategory]);

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
                    className="w-full text-left p-6 md:p-8 flex cursor-pointer items-center justify-between gap-4 group"
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
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1.5 mb-4 text-sm text-sky-500 border border-sky-200 rounded-full">
                        Your Questions
                    </div>

                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>

                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Quick answers about services, support, and security.
                    </p>
                </div>

                {/* Tabs */}
                <Tabs
                    defaultValue="security"
                    onValueChange={(val: string) => setActiveCategory(val)}
                >
                    <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 h-auto bg-transparent mb-10">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;

                            return (
                                <TabsTrigger
                                    key={cat.id}
                                    value={cat.id}
                                    className="flex flex-col items-center justify-center p-5 rounded-2xl border
                                        data-[state=active]:border-sky-500
                                        data-[state=active]:bg-sky-50
                                        transition"
                                >
                                    <Icon className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">{cat.name}</span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    {CATEGORIES.map((cat) => (
                        <TabsContent className={'mt-20'} key={cat.id} value={cat.id}>
                            {loading ? (
                                <div className="text-center py-20 text-slate-400">Loading...</div>
                            ) : faqs.length > 0 ? (
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <FAQItem
                                            key={faq.id}
                                            number={index + 1}
                                            question={faq.question}
                                            answer={faq.answer}
                                            isOpen={openIndex === index}
                                            onClick={() =>
                                                setOpenIndex(openIndex === index ? null : index)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-slate-400">
                                    No questions available
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}