"use client";

import { useState, useRef } from "react";
import { ChevronDown, Upload, X, AlertCircle, CheckCircle } from "lucide-react";
import Text from "@/Components/global/text";

const SUBJECT_OPTIONS = [
    "General Inquiry",
    "Project Estimate",
    "IT Support",
    "Cybersecurity Consultation",
    "Other",
];

const ALLOWED_TYPES = ["image/jpeg", "image/png", "text/plain", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MESSAGE_MAX = 100;

const inputBase =
    "w-full bg-[#f8f9fa] border border-transparent focus:border-primary-6 focus:bg-white focus:ring-2 focus:ring-primary-6/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none appearance-none placeholder:text-gray-300";

export function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });
    const [honeypot, setHoneypot] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        if (name === "message" && value.length > MESSAGE_MAX) return;
        setForm({ ...form, [name]: value });
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!ALLOWED_TYPES.includes(f.type)) {
            setErrorMsg("Only JPG, PNG, TXT, PDF files allowed");
            return;
        }
        if (f.size > MAX_FILE_SIZE) {
            setErrorMsg("File must be under 5MB");
            return;
        }
        setErrorMsg("");
        setFile(f);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (!f) return;
        if (!ALLOWED_TYPES.includes(f.type)) {
            setErrorMsg("Only JPG, PNG, TXT, PDF files allowed");
            return;
        }
        if (f.size > MAX_FILE_SIZE) {
            setErrorMsg("File must be under 5MB");
            return;
        }
        setErrorMsg("");
        setFile(f);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (honeypot) {
            setStatus("success");
            setForm({ name: "", phone: "", email: "", subject: "", message: "" });
            setFile(null);
            return;
        }

        if (!form.name || !form.email) {
            setErrorMsg("Name and email are required");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("phone", form.phone);
            formData.append("email", form.email);
            formData.append("subject", form.subject);
            formData.append("message", form.message);
            formData.append("company_website", honeypot);

            if (file) {
                formData.append("file", file);
            }

            const res = await fetch(
                "https://wordpress-1592566-6232100.cloudwaysapps.com/wp-json/gvm/v1/submit_contact_us",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Backend error:", res.status, errorText);
                throw new Error(`Server returned ${res.status}`);
            }

            setStatus("success");
            setForm({ name: "", phone: "", email: "", subject: "", message: "" });
            setFile(null);
        } catch (err) {
            console.error("Submit error:", err);
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="lg:col-span-8 bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
            <Text variant={'heading-sm'}>
                Request Your Free Estimate
            </Text>
            <Text variant={'card-subtitle-lg'} textColor={'light'} className="mb-8">
                Tell us about your project. We'll confirm scope, timing, and next steps.
            </Text>

            {status === "success" ? (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 rounded-2xl p-6">
                    <CheckCircle size={24} />
                    <div>
                        <p className="font-semibold">Request sent!</p>
                        <p className="text-sm">We'll get back to you shortly.</p>
                    </div>
                </div>
            ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            width: "1px",
                            height: "1px",
                            padding: 0,
                            margin: "-1px",
                            overflow: "hidden",
                            clip: "rect(0,0,0,0)",
                            whiteSpace: "nowrap",
                            border: 0,
                        }}
                    >
                        <label htmlFor="company_website">Company Website</label>
                        <input
                            type="text"
                            id="company_website"
                            name="company_website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                                Name
                            </Text>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g: John Carter..."
                                className={inputBase}
                            />
                        </div>
                        <div className="space-y-2">
                            <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                                Phone
                            </Text>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="e.g: (310) 750-4939"
                                className={inputBase}
                            />
                        </div>
                    </div>

                    {/* Email + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                                Email
                            </Text>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="e.g: info@globevm.com.."
                                className={inputBase}
                            />
                        </div>
                        <div className="space-y-2">
                            <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                                Subject
                            </Text>
                            <div className="relative">
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={`${inputBase} pr-12 ${!form.subject ? "text-gray-300" : "text-gray-900"}`}
                                >
                                    <option value="">Select a subject</option>
                                    {SUBJECT_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload File */}
                    <div className="space-y-2">
                        <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                            Upload File <span className="text-gray-400 font-normal">(Optional)</span>
                        </Text>
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                            className="bg-[#f8f9fa] border-2 border-dashed border-gray-200 rounded-2xl px-5 py-6 text-center cursor-pointer hover:border-primary-6/40 transition-colors"
                        >
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".jpg,.jpeg,.png,.txt,.pdf"
                                onChange={handleFile}
                                className="hidden"
                            />
                            {file ? (
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                    <span>{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-gray-400">
                                    <Upload size={18} />
                                    <span className="text-sm">Choose a file or drag here</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 ml-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            Supported Formats: JPG, PNG, TXT, PDF
                        </p>
                    </div>

                    {/* Message + char counter */}
                    <div className="space-y-2">
                        <Text variant={'body-md'} as={'label'} className={'ms-4'}>
                            Message
                        </Text>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What can we help you with? (project, question, support...)"
                            rows={4}
                            maxLength={MESSAGE_MAX}
                            className={`${inputBase} resize-none`}
                        />
                        <p className="text-xs text-gray-400 ml-1">
                            {form.message.length} / {MESSAGE_MAX}
                        </p>
                    </div>

                    {errorMsg && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle size={14} /> {errorMsg}
                        </p>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-primary-6 hover:bg-primary-6/90 disabled:opacity-60 text-white rounded-xl px-7 py-3.5 font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary-6/20 cursor-pointer"
                        >
                            {status === "loading" ? "Sending..." : "Send Request"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}