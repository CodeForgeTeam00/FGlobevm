
import React from 'react';
import { Calendar, User, MessageCircle } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        category: 'Category Name',
        title: 'Welcome to Minimalist Sophistication with Maximum Style',
        author: 'Behnam Jafari',
        date: '11 May 2025',
        comments: '220 Comments',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 2,
        category: 'Category Name',
        title: 'Welcome to Minimalist Sophistication with Maximum Style',
        author: 'Behnam Jafari',
        date: '11 May 2025',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        category: 'Category Name',
        title: 'Welcome to Minimalist Sophistication with Maximum Style',
        author: 'Behnam Jafari',
        date: '11 May 2025',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        category: 'Category Name',
        title: 'Welcome to Minimalist Sophistication with Maximum Style',
        author: 'Behnam Jafari',
        date: '11 May 2025',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    }
];

export const BlogSection: React.FC = () => {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-serif-heading text-4xl md:text-5xl font-black text-slate-900 mb-6">
                    Insights & Updates
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                    Stay informed with the latest tips, trends, and best practices in IT, virtualization, and cybersecurity. Our
                    blog shares actionable advice, industry news, and expert insights to help your business stay secure,
                    efficient, and ahead of the curve.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured Post */}
                <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden group h-[500px] lg:h-auto min-h-[500px]">
                    <img
                        src={BLOG_POSTS[0].image}
                        alt="Featured"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="inline-block px-3 py-1 rounded-md bg-sky-500 text-white text-[10px] font-bold uppercase mb-4">
                            {BLOG_POSTS[0].category}
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 max-w-xl leading-snug">
                            {BLOG_POSTS[0].title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-6 text-white/70 text-xs font-medium">
                            <span className="flex items-center gap-2">By {BLOG_POSTS[0].author}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {BLOG_POSTS[0].date}</span>
                            <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> {BLOG_POSTS[0].comments}</span>
                        </div>
                    </div>
                </div>
                {/* Sidebar Posts */}
                <div className="flex flex-col gap-6">
                    {BLOG_POSTS.slice(1).map((post) => (
                        <div
                            key={post.id}
                            className="relative flex-1 min-h-[160px] rounded-[1.5rem] overflow-hidden group"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <span className="text-[9px] font-bold text-white/50 uppercase mb-2">
                                    {post.category}
                                </span>
                                <h4 className="text-white text-sm font-bold mb-3 line-clamp-2 leading-tight">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-4 text-[10px] text-white/60 font-medium">
                                    <span>By {post.author}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
