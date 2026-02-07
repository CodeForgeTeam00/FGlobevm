import React from 'react';
import { ArrowRightIcon } from '@/Components/global/Icons';

const PortfolioSection = () => {
    const projects = [
        { cat: 'Entertainment', date: '22 Apr, 2023', title: 'Replenish male greater signs seas.', img: '/api/placeholder/400/300' },
        { cat: 'Business', date: '22 Apr, 2023', title: 'Days have firmament moved fifth.', img: '/api/placeholder/400/300' },
        { cat: 'Business', date: '22 Apr, 2023', title: 'Days have firmament moved fifth.', img: '/api/placeholder/400/300' },
        { cat: 'Corporate', date: '22 Apr, 2023', title: 'Days have firmament moved fifth.', img: '/api/placeholder/400/300' },
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-10">
                <div className="space-y-4">
                    <div className="inline-block px-4 py-1 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold tracking-wider uppercase">
                        ✦ Portfolio
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif">
                        Our Latest <span className="text-lime-400">Products</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-lg">
                        Lorem Ipsum is simply dummy text lorem Ipsum is simply dummy textlorem Ipsum is simply dummy text.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 mt-6 lg:mt-0">
                    {['All', 'Business', 'Entertainment', 'Corporate'].map((filter, idx) => (
                        <button key={filter} className={`px-4 py-2 rounded-full text-xs border transition ${idx === 0 ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-lime-400 hover:text-lime-400'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, idx) => (
                    <div key={idx} className={`group relative rounded-2xl overflow-hidden bg-[#111] ${idx === 0 ? 'lg:col-span-2' : ''}`}>
                        <div className="relative h-64 w-full overflow-hidden">
                            <img src={project.img} alt={project.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                                {idx === 0 && '✦'} {project.cat}
                            </div>
                            <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white group-hover:bg-lime-400 group-hover:text-black transition">
                                <span className="-rotate-45"><ArrowRightIcon className="w-4 h-4" /></span>
                            </div>
                        </div>

                        <div className="p-6">
                            {idx === 0 ? (
                                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur p-4 rounded-xl border-l-4 border-lime-400">
                                    <h3 className="text-xl text-lime-400 font-serif mb-1">{project.title}</h3>
                                    <p className="text-xs text-gray-400">{project.date}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] text-gray-400 uppercase">+ {project.cat}</span>
                                        <span className="text-[10px] text-gray-500">{project.date}</span>
                                    </div>
                                    <h3 className="text-lg font-serif text-white group-hover:text-lime-400 transition">{project.title}</h3>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioSection;
