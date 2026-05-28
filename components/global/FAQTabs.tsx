"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import { FAQCategory, FAQItem } from "@/types/wp-options";

interface FAQTabsProps {
    categories: FAQCategory[];
    variant?: "light" | "dark";
}

function CategoryIcon({ icon, name }: { icon: FAQCategory["icon"]; name: string }) {
    if (icon) {
        return (
            <Image
                src={icon.url}
                alt={icon.alt || name}
                width={40}
                height={40}
                className="mb-2"
            />
        );
    }
    return <LayoutGrid className="!w-10 !h-10 mb-2" />;
}

export function FAQTabs({ categories, variant = "light" }: FAQTabsProps) {
    const [active, setActive] = useState("all");
    const allFaqs: FAQItem[] = categories.flatMap((cat) => cat.faqs);
    const tabs = [
        { value: "all", label: "All", icon: null, items: allFaqs },
        ...categories.map((cat, i) => ({
            value: String(i),
            label: cat.category_name,
            icon: cat.icon,
            items: cat.faqs,
        })),
    ];
    const activeTab = tabs.find((t) => t.value === active) ?? tabs[0];
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mx-auto gap-4 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActive(tab.value)}
                        className={`flex flex-col cursor-pointer items-center justify-center p-5 rounded-2xl border transition-all ${
                            active === tab.value
                                ? "border-primary-6 shadow-[0_0_0_2px_rgba(25,154,213,0.25)] "
                                : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                    >
                        <CategoryIcon icon={tab.icon} name={tab.label} />
                        <span className="text-small font-medium text-neutral-700">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {activeTab.items.length > 0 ? (
                    <FAQAccordion items={activeTab.items} variant={"dark"} />
                ) : (
                    <p className="text-center py-20 text-slate-400">
                        No questions available
                    </p>
                )}
            </div>
        </div>
    );
}