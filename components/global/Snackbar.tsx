"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface Props {
    message: string;
    description?: string;
    type: "success" | "error";
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Snackbar({ message, description, type, isOpen, onClose, duration = 4000 }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [isOpen, onClose, duration]);

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90vw] max-w-md animate-slide-up">
            <div
                className={`flex items-start gap-3 rounded-2xl px-5 py-4 shadow-xl border ${
                    type === "success"
                        ? "bg-white border-green-200"
                        : "bg-white border-red-200"
                }`}
            >
                {type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-900">{message}</p>
                    {description && (
                        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                    )}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}