import React, { ReactNode } from 'react';
import { ArrowRightIcon, MenuIcon } from '@/Components/global/Icons';

interface SectionLayoutProps {
    children: ReactNode;
    activeNav?: string;
    pageIndex: string; // e.g., "01"
    totalPages?: string; // e.g., "07"
    nextSectionText?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
                                                         children,
                                                         activeNav = 'Home',
                                                         pageIndex,
                                                         totalPages = '07',
                                                         nextSectionText = 'Our Services',
                                                     }) => {
    const navItems = ['Home', 'Our Services', 'Why us?', 'About us', 'Testimonial', 'Portfolio', 'Contact us'];

    return (
        <div className="relative w-full h-screen bg-[#080808] text-white overflow-hidden font-sans selection:bg-lime-400 selection:text-black">

            {/* --- Background Elements --- */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-400/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* --- Header / Navigation --- */}
            <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 md:px-12">
                <button className="p-2 hover:bg-white/10 rounded-full transition"><MenuIcon /></button>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <div className="flex items-center gap-2 mr-4">
                        <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center relative">
                            <div className="absolute left-3 w-6 h-6 rounded-full border border-white/50 bg-transparent"></div>
                        </div>
                    </div>
                    {navItems.map((item) => (
                        <a key={item} href="#" className={`transition-colors duration-300 ${activeNav === item ? 'text-lime-400' : 'text-gray-400 hover:text-white'}`}>
                            {item}
                        </a>
                    ))}
                </nav>
                <div className="w-10"></div>
            </header>

            {/* --- Left Sidebar (Socials) --- */}
            <aside className="absolute left-0 top-0 h-full w-20 hidden lg:flex flex-col justify-end items-center py-12 z-40 border-r border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="flex flex-col gap-12 items-center mb-20">
                    {['Instagram', 'Dribbble', 'Twitter'].map((social, idx) => (
                        <div key={social} className="relative group">
                            <a href="#" className={`block -rotate-90 whitespace-nowrap text-xs tracking-widest uppercase transition-all ${idx === 0 ? 'text-white font-bold' : 'text-gray-500 hover:text-lime-400'}`}>
                                {social}
                            </a>
                            {idx === 0 && <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-lime-400"></div>}
                        </div>
                    ))}
                </div>
            </aside>

            {/* --- Right Sidebar (Pagination) --- */}
            <aside className="absolute right-0 top-0 h-full w-20 hidden lg:flex flex-col justify-between items-center z-40 border-l border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="h-full flex flex-col justify-center items-center gap-2">
                    <span className="text-xs font-mono text-lime-400 -rotate-90">{pageIndex}</span>
                    <div className="w-[1px] h-24 bg-gray-800 relative">
                        <div className="absolute top-0 w-full h-1/3 bg-lime-400"></div>
                    </div>
                    <span className="text-xs font-mono text-gray-500 -rotate-90">{totalPages}</span>
                </div>
                <button className="w-full h-20 bg-lime-400 hover:bg-lime-300 text-black flex items-center justify-center transition-colors">
                    <span className="rotate-180"><ArrowRightIcon /></span>
                </button>
            </aside>

            {/* --- Main Content Injection Point --- */}
            <main className="relative z-10 w-full h-full pt-28 pb-12 px-8 lg:px-32 flex flex-col justify-center">
                {children}

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-400">
                    <span>{nextSectionText}</span>
                    <div className="border border-gray-600 rounded-full p-1">
                        <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SectionLayout;
