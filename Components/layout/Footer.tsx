
import React from 'react';
import { Linkedin, Instagram, Send, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="pt-20 pb-12 px-6 bg-white border-t border-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Info */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white overflow-hidden p-1.5 shadow-lg shadow-sky-200">
                                <div className="w-full h-full border-2 border-white/50 rounded-full flex items-center justify-center font-bold text-[10px]">GVM</div>
                            </div>
                            <div className="font-bold text-xl tracking-tighter text-slate-800 uppercase">
                                Globe <span className="text-sky-500">VM</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8 font-medium">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua.
                        </p>
                        <div className="flex gap-5">
                            {[
                                { icon: <Linkedin className="w-4 h-4" />, link: '#' },
                                { icon: <Instagram className="w-4 h-4" />, link: '#' },
                                { icon: <Send className="w-4 h-4" />, link: '#' },
                                { icon: <Youtube className="w-4 h-4" />, link: '#' },
                            ].map((social, i) => (
                                <a key={i} href={social.link} className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-100 text-sky-500 hover:bg-sky-500 hover:text-white transition-all">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* About Links */}
                    <div className="lg:col-span-3">
                        <h3 className="font-serif-heading text-xl font-black text-slate-900 mb-8">About</h3>
                        <ul className="space-y-4">
                            {['About The Brand', 'Contact Us', 'FAQ', 'Blog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-sky-500 text-sm font-medium transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4">
                        <h3 className="font-serif-heading text-xl font-black text-slate-900 mb-8">Contact US</h3>
                        <ul className="space-y-5">
                            <li>
                                <a href="tel:3107504939" className="flex items-center gap-3 text-slate-400 hover:text-sky-500 transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                                        <Phone className="w-4 h-4 text-sky-500" />
                                    </div>
                                    <span className="text-sm font-medium">(310) 750-4939</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@globevm.com" className="flex items-center gap-3 text-slate-400 hover:text-sky-500 transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                                        <Mail className="w-4 h-4 text-sky-500" />
                                    </div>
                                    <span className="text-sm font-medium">info@globevm.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Office Locations */}
                <div className="border-t border-slate-100 pt-16 mb-16">
                    <h3 className="font-serif-heading text-xl font-black text-slate-900 mb-10">Our Offices:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                city: 'Woodland Hills',
                                address: '20501 Ventura Blvd # 114 Woodland Hills, CA 91364'
                            },
                            {
                                city: 'Encino',
                                address: '16661 Ventura Blvd, #224B, Encino, CA 91436'
                            },
                            {
                                city: 'Los Angeles',
                                address: '10680 W Pico Blvd, Suite #300B Los Angeles, CA 90064'
                            }
                        ].map((office, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center p-1.5 shadow-sm shadow-sky-200">
                                        <div className="w-full h-full bg-sky-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sky-500 text-sm mb-2">{office.city}</h4>
                                    <p className="text-slate-800 text-sm leading-relaxed font-semibold">
                                        {office.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-8 border-t border-slate-50">
                    <p className="text-slate-400 text-xs font-bold tracking-tight uppercase">
                        © Copyright 2024, All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};
