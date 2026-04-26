"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WpContent } from "./SeoBox";

interface Props {
    content: string;
    title?: string;
}

export default function SeoBoxSection({ content, title }: Props) {
    const [expanded, setExpanded] = useState(false);

    if (!content) return null;

    return (
        <div className="mt-16 mb-10">
            {title && (
                <h2 className="text-3xl font-serif font-bold mb-4">{title}</h2>
            )}
            <div className={`relative ${!expanded ? "max-h-[120px] overflow-hidden" : ""}`}>
                <WpContent content={content} />
                {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                )}
            </div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-primary-6 text-sm font-medium flex items-center gap-1 mt-2 cursor-pointer"
            >
                {expanded ? "Show less" : "Show more"}
                <ChevronDown className={`w-4 h-4 transition ${expanded ? "rotate-180" : ""}`} />
            </button>
        </div>
    );
}