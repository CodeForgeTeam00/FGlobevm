import React from 'react';
import { ArrowRightIcon, MapPinIcon, MailIcon, PhoneIcon } from '@/Components/global/Icons';

const ContactSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Info */}
            <div className="space-y-10">
                <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                    ✦ Contact Us
                </div>
                <h2 className="text-4xl lg:text-6xl font-serif leading-tight">
                    Contact Us Today and <span className="text-lime-400">let's <br/> explore</span> How We Can Bring Your Vision to Life
                </h2>

                <div className="space-y-6 pt-4">
                    <div className="flex items-start gap-4">
                        <div className="text-lime-400 mt-1"><PhoneIcon /></div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Phone</p>
                            <p className="text-white font-medium">+1 341 224 12</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-lime-400 mt-1"><MailIcon /></div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Email</p>
                            <p className="text-white font-medium">Test@ourservices.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-lime-400 mt-1"><MapPinIcon /></div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Address</p>
                            <p className="text-white font-medium">LA, 31th alley, CA 12-1</p>
                        </div>
                    </div>
                </div>

                <button className="flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-sm hover:bg-white/10 transition">
                    Get Direction <ArrowRightIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Right Form */}
            <div className="bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl">
                <h3 className="text-2xl font-serif text-white mb-2">Request Your Free Estimate</h3>
                <p className="text-xs text-gray-500 mb-8">Tell us about your project. We'll confirm scope, timing, and next steps.</p>

                <form className="space-y-6">
                    {[
                        { step: '01', label: "What's your name?", place: 'Type your full name' },
                        { step: '02', label: "What's your email address?", place: 'example@gmail.com' },
                        { step: '03', label: "What's service are you looking for?", place: 'Web Design, Web Development ...' },
                        { step: '04', label: "Your message", place: 'Hello Merge, can you help me with ...' },
                    ].map((field) => (
                        <div key={field.step} className="group">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-6 h-6 rounded-full border border-gray-600 text-[10px] flex items-center justify-center text-gray-400 group-hover:border-lime-400 group-hover:text-lime-400 transition">{field.step}</span>
                                <label className="text-sm text-gray-300 group-hover:text-lime-400 transition">{field.label}</label>
                            </div>
                            <input type="text" placeholder={field.place} className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-lime-400 transition text-sm placeholder:text-gray-600" />
                        </div>
                    ))}

                    <div className="pt-4">
                        <button type="button" className="bg-lime-400 hover:bg-lime-300 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 transition w-full justify-center sm:w-auto">
                            Send Request <ArrowRightIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;
