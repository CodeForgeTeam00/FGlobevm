import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/types/wp-blog";
import SectionIntro from "@/Components/global/SectionIntro";
interface BlogSectionProps {
    posts: BlogPost[];
}
export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
    if (!posts.length) return null;
    const [featured, ...sidebar] = posts;
    return (
        <section className="py-24 ">
            <div className="text-center mb-16">
                <SectionIntro
                    lgCenter
                    as={'h2'}
                    title={"Insights & Updates"}
                    description={"    Stay informed with the latest tips, trends, and best practices in IT, virtualization, and cybersecurity."}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Link
                    href={`/blog/${featured.slug}`}
                    className="lg:col-span-3 relative rounded-[2.5rem] overflow-hidden group min-h-[650px]"
                >
                    <Image
                        src={featured.image?.url || ""}
                        alt={featured.image?.alt || featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                        <span className="inline-block px-3 py-1 rounded-md bg-primary-6 text-white text-[10px] font-bold uppercase mb-4">
                            {featured.categoryName}
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 max-w-xl leading-snug">
                            {featured.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-6 text-white/70 text-xs font-medium">
                            <span>By {featured.author.name}</span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {featured.date}
                            </span>
                        </div>
                    </div>
                </Link>
                <div className="flex flex-col gap-6">
                    {sidebar.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="relative flex-1 min-h-[160px] rounded-[1.5rem] overflow-hidden group"
                        >
                            <Image
                                src={post.image?.url || ""}
                                alt={post.image?.alt || post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <span className="text-[9px] font-bold text-white/50 uppercase mb-2">
                                    {post.categoryName}
                                </span>
                                <h3 className="text-white text-sm font-bold mb-3 line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-4 text-[10px] text-white/60 font-medium">
                                    <span>By {post.author.name}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};