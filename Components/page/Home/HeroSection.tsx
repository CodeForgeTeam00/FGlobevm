import React from 'react';
import { Calendar, Phone, Home, BarChart3 } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center  topographic-bg overflow-hidden bg-white">
            <div className="max-w-[1540px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5 flex flex-col space-y-10 z-20 pt-8">
                    <div>
                        <div className="inline-block px-4 py-2 rounded-full border border-sky-400 text-sky-500 text-[11px] font-extrabold tracking-[0.2em] uppercase mb-10 bg-white/50 backdrop-blur-sm">
                            PROACTIVE IT
                        </div>
                        <h1 className="font-serif-heading text-[32px] lg:text-[40px] font-black text-[#111827] leading-[1.05] mb-8">
                            Proactive IT
                            That Keeps Your <br />
                            Business <span className="text-[#38bdf8]">Secure</span>
                        </h1>
                        <p className="text-[#64748b] text-[17px] leading-relaxed max-w-lg font-medium opacity-90">
                            We manage, secure, and optimize your infrastructure so your team can focus on
                            growth instead of downtime. From virtual environments to network protection,
                            we keep your systems stable, fast, and protected.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <button className="flex items-center justify-center gap-3 bg-[#1da1f2] hover:bg-sky-500 text-white px-9 py-5 rounded-2xl font-bold text-sm transition-all shadow-2xl shadow-sky-200 active:scale-95">
                            <Calendar className="w-5 h-5 fill-white/20" />
                            Book A Free Consulation
                        </button>
                        <button className="flex items-center justify-center gap-3 border border-slate-200 hover:bg-slate-50 text-[#1e293b] px-9 py-5 rounded-2xl font-bold text-sm transition-all bg-white shadow-sm active:scale-95">
                            <Phone className="w-5 h-5 text-slate-400" />
                            Get A Free Penetration Test
                        </button>
                    </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-2 gap-6 relative">
                    <div className="flex flex-col gap-6 pt-12">
                        <div className="bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 z-20
                        hover:translate-y-[-4px]
                        transition-transform duration-300">
                            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-8 shadow-lg">
                                <Home className="w-6 h-6 text-[#38bdf8] fill-[#38bdf8]/10" />
                            </div>
                            <div className="mb-8">
                                <span className="text-[14px] font-bold text-slate-400">25%</span>
                                <h3 className="text-[19px] font-extrabold text-slate-900 leading-[1.4] mt-3 tracking-tight">
                                    Stay informed with the latest tips, trends, and best practices in IT, virtualization
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                                    <span>+ 23 Performance</span>
                                </div>
                                <div className="w-full h-[6px] bg-[#f1f5f9] rounded-full">
                                    <div className="bg-[#4f46e5] h-full w-[65%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black text-white p-5 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-5 border border-white/10 hover:translate-y-[-4px] transition-transform duration-300">
                            <div className="w-16 h-16 rounded-full bg-[#1da1f2] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/20">
                                99
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-[18px]">Title</span>
                                <span className="text-slate-500 text-[14px] font-medium">Description</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 ">
                        <div className="relative w-full  z-10">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=100&w=800"
                                alt="IT Professional"
                                className="relative w-[400px] h-[400px] object-cover object-top rounded-[3.5rem] z-20 bg-[#0ea5e9]"
                            />
                        </div>
                        <div className="w-full aspect-[4/3] rounded-[3rem]   overflow-hidden  z-10 ">
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=100&w=600"
                                alt="Team Meeting"
                                className="w-[400px] rounded-[3rem]  object-cover  hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                    <div className="absolute -z-10 top-1/4 right-[-10%] w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
                    <div className="absolute -z-10 bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"></div>
                </div>

            </div>
        </section>
    );
};
