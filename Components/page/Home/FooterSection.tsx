import React from 'react';
import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/Components/global/Icons';

const FooterSection = () => {
    return (
        <div className="flex flex-col h-full justify-between">
            {/* Top Yellow Banner */}
            <div className="bg-[#dfff1b] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-black relative overflow-hidden mt-4">
                <div className="relative z-10">
                    <h2 className="text-3xl font-serif font-bold mb-2">Need help? Talk to our expert.</h2>
                    <p className="text-sm opacity-80">Talk to our experts or Browse through more properties.</p>
                </div>
                <button className="relative z-10 bg-white px-6 py-3 rounded-full font-bold flex items-center gap-2 mt-4 md:mt-0 hover:scale-105 transition shadow-lg">
                    <PhoneIcon /> +1 341 224 12
                </button>
                {/* Decoration */}
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
            </div>

            {/* Middle Links Area */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12 border-b border-white/10">
                {/* Brand */}
                <div className="space-y-6">
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center relative">
                            <div className="absolute left-3 w-8 h-8 rounded-full border border-white bg-transparent"></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text.
                    </p>
                    <div className="flex gap-4">
                        {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/5 hover:bg-lime-400 hover:text-black flex items-center justify-center transition cursor-pointer text-gray-400"><ArrowRightIcon className="w-3 h-3" /></div>)}
                    </div>
                </div>

                {/* Links Columns */}
                <div>
                    <h4 className="font-serif text-white mb-6">Links</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        {['Company News', 'Careers', 'Partners', 'Privacy Policy'].map(link => <li key={link}><a href="#" className="hover:text-lime-400 transition">{link}</a></li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-serif text-white mb-6">Links</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        {['Contact Form', 'Contact Info', 'Contact Page', 'Contact Support'].map(link => <li key={link}><a href="#" className="hover:text-lime-400 transition">{link}</a></li>)}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-serif text-white mb-6">Subscribe to our newsletter</h4>
                    <p className="text-xs text-gray-500 mb-4">Lorem Ipsum is simply dummy text lorem Ipsum is simply.</p>
                    <div className="flex bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-lime-400 transition">
                        <input type="email" placeholder="Write your email" className="bg-transparent px-4 py-2 text-sm text-white focus:outline-none w-full placeholder:text-gray-600" />
                        <button className="bg-lime-400 text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-lime-300 transition whitespace-nowrap">Send Request</button>
                    </div>
                </div>
            </div>

            {/* Bottom Contact Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lime-400"><PhoneIcon /></div>
                    <div><p className="text-xs text-lime-400">Phone</p><p className="text-sm font-bold text-white">+1 341 224 12</p></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400"><MailIcon /></div>
                    <div><p className="text-xs text-lime-400">Email</p><p className="text-sm font-bold text-white">Test@ourservices.com</p></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400"><MapPinIcon /></div>
                    <div><p className="text-xs text-lime-400">Address</p><p className="text-sm font-bold text-white">LA, 31th alley, CA 12-1</p></div>
                </div>
            </div>

            <div className="py-6 border-t border-white/5 text-center text-xs text-gray-600">
                © Copyright 2026, All Rights Reserved by Glebvem Made with <span className="text-lime-400">love</span> in California
            </div>
        </div>
    );
};

export default FooterSection;
