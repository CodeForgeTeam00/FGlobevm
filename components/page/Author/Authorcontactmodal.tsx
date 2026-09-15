"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Text from "@/components/global/text";
import Snackbar from "@/components/global/Snackbar";

interface Props {
    authorName: string;
    authorSlug: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthorContactModal({ authorName, authorSlug, isOpen, onClose }: Props) {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [snackbar, setSnackbar] = useState<{ open: boolean; type: "success" | "error"; message: string; description: string }>({
        open: false,
        type: "success",
        message: "",
        description: "",
    });

    if (!isOpen && !snackbar.open) return null;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
            setErrorMsg("All fields are required");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/wp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    endpoint: "/gvm/v1/submit_profile_form",
                    data: {
                        name: form.name,
                        email: form.email,
                        message: form.message,
                        author_slug: authorSlug,
                    },
                }),
            });
            if (!res.ok) throw new Error("Failed");

            setForm({ name: "", email: "", message: "" });
            setStatus("idle");
            onClose();
            setSnackbar({
                open: true,
                type: "success",
                message: "Message Submitted Successfully",
                description: "Thank you! Your message has been received and will be reviewed shortly.",
            });
        } catch {
            setStatus("idle");
            onClose();
            setSnackbar({
                open: true,
                type: "error",
                message: "Failed to Send Message",
                description: "Something went wrong. Please try again later.",
            });
        }
    }

    const inputClass =
        "w-full bg-neutral-10 border border-neutral-30 focus:border-primary-6 focus:ring-2 focus:ring-primary-6/20 rounded-xl px-4 py-3 text-sm transition-all outline-none";

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-end lg:items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
                    <div className="relative bg-white w-full lg:max-w-md lg:rounded-2xl rounded-t-2xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <Text variant="heading-xs" as="h3" className="mb-1">
                                Sent Message To {authorName}
                            </Text>
                            <Text variant="body-sm" textColor="primary">
                                Please fill the form below
                            </Text>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-900 mb-1 block">
                                    Full Name <span className="text-primary-6 text-xs">(required)</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="enter your full name"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-900 mb-1 block">
                                    Email <span className="text-primary-6 text-xs">(required)</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="enter your email"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-900 mb-1 block">
                                    Your Message <span className="text-primary-6 text-xs">(required)</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="This is a Sample Text"
                                    rows={4}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            {errorMsg && (
                                <p className="text-red-500 text-sm">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-primary-6 hover:bg-primary-6/90 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer"
                            >
                                {status === "loading" ? "Sending..." : "Sent"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Snackbar
                message={snackbar.message}
                description={snackbar.description}
                type={snackbar.type}
                isOpen={snackbar.open}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            />
        </>
    );
}