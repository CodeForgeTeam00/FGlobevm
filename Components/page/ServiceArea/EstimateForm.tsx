"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, X, AlertCircle, CheckCircle } from "lucide-react";

const SERVICE_OPTIONS = [
    "Managed IT Services",
    "Cybersecurity Solutions",
    "Cloud Services",
    "Data Backup & Recovery",
    "Compliance Management",
    "Network Setup & Support",
    "Other",
];

const BUDGET_OPTIONS = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
];

const TIMELINE_OPTIONS = [
    "ASAP",
    "Within 1 week",
    "Within 1 month",
    "Within 3 months",
    "Just exploring",
];

const ALLOWED_TYPES = ["image/jpeg", "image/png", "text/plain", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const inputBase =
    "w-full bg-[#f8f9fa] border border-transparent focus:border-primary-6 focus:bg-white focus:ring-2 focus:ring-primary-6/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none appearance-none";

export default function EstimateForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        service_type: "",
        budget_range: "",
        timeline: "",
        description: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
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

        if (!form.name || !form.email) {
            setErrorMsg("Name and email are required");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("https://wordpress-1592566-6232100.cloudwaysapps.com/wp-json/gvm/v1/submit_service_area", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to submit");

            setStatus("success");
            setForm({ name: "", email: "", service_type: "", budget_range: "", timeline: "", description: "" });
            setFile(null);
        } catch {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100">
            <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3">
                Request Your Free Estimate
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-8">
                Tell us about your project. We'll confirm scope, timing, and next steps.
            </p>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900 ml-1">Name</label>
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
                            <label className="text-sm font-semibold text-gray-900 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="e.g: info@globevm.com..."
                                className={inputBase}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900 ml-1">Service Type</label>
                            <select
                                name="service_type"
                                value={form.service_type}
                                onChange={handleChange}
                                className={`${inputBase} ${!form.service_type ? "text-gray-400" : "text-gray-900"}`}
                            >
                                <option value="">Select a service...</option>
                                {SERVICE_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900 ml-1">Budget Range</label>
                            <select
                                name="budget_range"
                                value={form.budget_range}
                                onChange={handleChange}
                                className={`${inputBase} ${!form.budget_range ? "text-gray-400" : "text-gray-900"}`}
                            >
                                <option value="">Select your budget range...</option>
                                {BUDGET_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900 ml-1">Timeline</label>
                        <select
                            name="timeline"
                            value={form.timeline}
                            onChange={handleChange}
                            className={`${inputBase} ${!form.timeline ? "text-gray-400" : "text-gray-900"}`}
                        >
                            <option value="">When do you need this done?</option>
                            {TIMELINE_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900 ml-1">
                            Upload File <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
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
                                <div className="flex flex-col items-center gap-1">
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-sm text-gray-400">Choose a file or drag here</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 ml-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            Supported Formats: JPG, PNG, TXT, PDF
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900 ml-1">Project Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder='Briefly describe what you need (e.g. "We need a SaaS dashboard with user login and payments")'
                            rows={4}
                            className={`${inputBase} resize-none`}
                        />
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
                            <ArrowRight size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}