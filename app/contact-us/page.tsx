import React from 'react';
import { Phone, Mail, Briefcase, Send, MapPin, Home, ChevronDown } from 'lucide-react';
import Container from "@/Components/global/Sections/Container";

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
            <div className="relative h-[450px] w-full flex flex-col items-center justify-center text-center">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 text-white px-4 mt-[-60px]">
                    <div className="flex items-center justify-center text-xs font-medium mb-6 space-x-2 text-gray-300">
                        <Home size={14} />
                        <span>Home</span>
                        <span className="text-gray-500">&gt;</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
                        From infrastructure management and cloud environments to endpoint protection and network security
                    </p>
                </div>
            </div>
            <div className=" px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                            <div className="mb-5">
                                <Phone className="text-[#209cee]" size={36} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif font-bold text-xl mb-2 text-gray-900">Contact Number</h3>
                            <p className="text-gray-500 text-sm">(310) 750-4939</p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                            <div className="mb-5">
                                <Mail className="text-[#209cee]" size={36} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif font-bold text-xl mb-2 text-gray-900">Email</h3>
                            <p className="text-gray-500 text-sm">info@globevm.com</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                            <div className="mb-5">
                                <Briefcase className="text-[#209cee]" size={36} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif font-bold text-xl mb-2 text-gray-900">Working hours</h3>
                            <p className="text-gray-500 text-sm">24 hours</p>
                        </div>

                        <div className="bg-[#209cee] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                            <div className="mb-5">
                                <Send className="text-white" size={36} strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif font-bold text-xl mb-2 text-white">Send Ticket</h3>
                            <p className="text-blue-100 text-sm">Speak to an Expert</p>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className=" mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
                            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900 tracking-tight">Our Offices</h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>

                            <div className="space-y-8">

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 rounded-full text-[#209cee] shrink-0 mt-1">
                                        <MapPin size={20} className="fill-[#209cee]/20" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Woodland Hills</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            20501 Ventura Blvd # 114 Woodland<br />Hills, CA 91364
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 rounded-full text-[#209cee] shrink-0 mt-1">
                                        <MapPin size={20} className="fill-[#209cee]/20" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Encino</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            16661 Ventura Blvd, #224B, Encino, CA<br />91436
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f0f8ff] p-3 rounded-full text-[#209cee] shrink-0 mt-1">
                                        <MapPin size={20} className="fill-[#209cee]/20" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Los Angeles</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            10880 W Pico Blvd, Suite #300B Los<br />Angeles, CA 90064
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 relative rounded-2xl overflow-hidden h-56 bg-gray-200 shadow-inner">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Map location"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-start space-x-3 shadow-lg">
                                    <MapPin size={18} className="text-[#209cee] shrink-0 mt-0.5 fill-[#209cee]/20" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 mb-1">Address</p>
                                        <p className="text-[11px] text-gray-500 leading-tight">
                                            2365 Westwood Blvd. Ste 23 Los<br />Angeles, CA 90064
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
                            <h2 className="text-3xl font-serif font-bold mb-3 text-gray-900 tracking-tight">Request Your Free Estimate</h2>
                            <p className="text-gray-500 text-sm mb-10">
                                Tell us about your project. We  ll confirm scope, timing, and next steps.
                            </p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Type Your Name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Type Your Phone..."
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3.5 rounded-xl border border-[#209cee] bg-white text-sm ring-4 ring-[#209cee]/10 outline-none transition-all placeholder:text-gray-800"
                                            placeholder="Focus and Typing...|"
                                            defaultValue="Focus and Typing...|"
                                        />
                                    </div>
                                    {/* ZIP Code */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Type Your Zip Code..."
                                        />
                                    </div>

                                    {/* Input Name 1 */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">Input Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Enter Your Text..."
                                        />
                                    </div>
                                    {/* Input Name 2 */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2">Input Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300"
                                            placeholder="Enter Your Text..."
                                        />
                                    </div>
                                </div>

                                {/* Project Type */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 mb-2">Project Type</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all appearance-none text-gray-400">
                                            <option value="" disabled selected>Select Project Type...</option>
                                            <option value="infrastructure">Infrastructure Management</option>
                                            <option value="cloud">Cloud Environments</option>
                                            <option value="security">Network Security</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                            <ChevronDown size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 mb-2">Message (optional)</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#209cee]/20 focus:border-[#209cee] outline-none transition-all placeholder:text-gray-300 resize-none"
                                        placeholder="Type Your Message"
                                    ></textarea>
                                    <div className="text-[10px] text-gray-400 mt-2 text-right">0 / 1000</div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        className="bg-[#209cee] hover:bg-[#1b88d1] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#209cee]/30"
                                    >
                                        Send Request
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}