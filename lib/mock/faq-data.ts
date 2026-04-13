import { FAQItem } from "@/types/wp-options";

export type FAQCategory = {
    id: string;
    name: string;
    icon: string;
    items: FAQItem[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
    {
        id: "general",
        name: "General Info",
        icon: "LayoutGrid",
        items: [
            {
                question: "What services does GlobeVM provide?",
                answer: "Cloud infrastructure, virtual machines, and networking solutions.",
            },
            {
                question: "What services does GlobeVM provide?",
                answer: "Cloud infrastructure, virtual machines, and networking solutions.",
            },
        ],
    },
    {
        id: "support",
        name: "Support",
        icon: "MessageSquare",
        items: [
            {
                question: "What are your support hours?",
                answer: "We offer 24/7 support for critical issues.",
            },
        ],
    },
    {
        id: "billing",
        name: "Billing",
        icon: "Ticket",
        items: [
            {
                question: "How does billing work?",
                answer: "Pay-as-you-go monthly billing.",
            },
        ],
    },
    {
        id: "security",
        name: "Security",
        icon: "Shield",
        items: [
            {
                question: "How quickly do you respond to IT or security issues?",
                answer: "Our team monitors systems 24/7 and responds within minutes.",
            },
            {
                question: "What types of security audits do you provide?",
                answer: "We provide penetration testing, vulnerability scanning, and compliance audits.",
            },
        ],
    },
    {
        id: "updates",
        name: "Updates",
        icon: "RefreshCw",
        items: [
            {
                question: "How often do you release updates?",
                answer: "Weekly improvements and monthly features.",
            },
        ],
    },
    {
        id: "network",
        name: "Network",
        icon: "Radio",
        items: [
            {
                question: "What uptime do you guarantee?",
                answer: "99.99% uptime SLA.",
            },
        ],
    },
];