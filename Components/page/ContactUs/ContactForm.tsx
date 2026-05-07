"use client";

import { ChevronDown } from "lucide-react";

export function ContactForm() {
    return (
        <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
            <h2 className="text-3xl font-serif font-bold mb-3 text-gray-900 tracking-tight">
                Request Your Free Estimate
            </h2>
            <p className="text-gray-500 text-sm mb-10">
                Tell us about your project. We will confirm scope, timing, and
                next steps.
            </p>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                            placeholder="Type Your Name..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                            placeholder="Type Your Phone..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                            placeholder="Type Your Email..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-900 mb-2">
                            ZIP Code
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                            placeholder="Type Your Zip Code..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-900 mb-2">
                        Project Type
                    </label>
                    <div className="relative">
                        <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all appearance-none text-gray-400">
                            <option value="" disabled selected>
                                Select Project Type...
                            </option>
                            <option value="infrastructure">
                                Infrastructure Management
                            </option>
                            <option value="cloud">Cloud Environments</option>
                            <option value="security">Network Security</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-900 mb-2">
                        Message (optional)
                    </label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300 resize-none"
                        placeholder="Type Your Message"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-[#209cee] hover:bg-[#1b88d1] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#209cee]/30"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
}