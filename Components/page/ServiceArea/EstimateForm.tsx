import { ArrowRight } from 'lucide-react';

export default function EstimateForm() {
    return (
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100">
            <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3">
                Request Your Free Estimate
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-8">
                Tell us about your project. We'll confirm scope, timing, and next steps.
            </p>

            <form className="space-y-5" >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900 ml-1">First Name</label>
                        <input
                            type="text"
                            placeholder="Type Your Name..."
                            className="w-full bg-[#f8f9fa] border-transparent focus:border-[#1da1f2] focus:bg-white focus:ring-2 focus:ring-[#1da1f2]/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900 ml-1">Last Name</label>
                        <input
                            type="text"
                            placeholder="Type Your Name..."
                            className="w-full bg-[#f8f9fa] border-transparent focus:border-[#1da1f2] focus:bg-white focus:ring-2 focus:ring-[#1da1f2]/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Type Your Email..."
                        className="w-full bg-[#f8f9fa] border-transparent focus:border-[#1da1f2] focus:bg-white focus:ring-2 focus:ring-[#1da1f2]/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 ml-1">Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Type Your Phone..."
                        className="w-full bg-[#f8f9fa] border-transparent focus:border-[#1da1f2] focus:bg-white focus:ring-2 focus:ring-[#1da1f2]/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 ml-1">Message</label>
                    <textarea
                        placeholder="This is a Sample Text"
                        rows={4}
                        className="w-full bg-[#f8f9fa] border-transparent focus:border-[#1da1f2] focus:bg-white focus:ring-2 focus:ring-[#1da1f2]/20 rounded-2xl px-5 py-3.5 text-sm transition-all outline-none resize-none"
                    ></textarea>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-[#1da1f2] hover:bg-[#1a91da] text-white rounded-xl px-7 py-3.5 font-medium flex items-center gap-2 transition-colors shadow-lg shadow-[#1da1f2]/20"
                    >
                        Send Request
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </form>
        </div>
    );
}
