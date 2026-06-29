import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/types/wp-blog";
import SectionIntro from "@/components/global/SectionIntro";
import Text from "@/components/global/text";
interface BlogSectionProps {
    posts: BlogPost[];
}
export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
    if (!posts.length) return null;
    const [featured, ...sidebar] = posts;
    return (
        <section className="lg:py-24 py-6 ">
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
                    className="lg:col-span-3 relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden group min-h-[184px] lg:min-h-[650px]"
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
                        <Text textColor={'white'} variant={'card-title-md'}>
                            {featured.title}
                        </Text>
                        <div className="flex flex-wrap items-center gap-6 text-white/70 text-xs font-medium">
                            <Text textColor={'white'} variant={'label'}>
                                By {featured.author.name}
                            </Text>
                            <Text textColor={'white'} variant={'label'} className={'flex items-center gap-2'}>
                                <Calendar className="w-4 h-4" />
                                {featured.date}
                            </Text>
                        </div>
                    </div>
                </Link>
                <div className="flex flex-col gap-6">
                    {sidebar.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="relative flex-1 min-h-[184px] rounded-[1.5rem] overflow-hidden group"
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
                                <Text textColor={'white'} variant={'card-title-md'}>
                                    {post.title}
                                </Text>
                                <div className="flex flex-wrap items-center gap-6 text-white/70 text-xs font-medium">
                                    <Text textColor={'white'} variant={'label'}>
                                        By {post.author.name}
                                    </Text>
                                    <Text textColor={'white'} variant={'label'} className={'flex items-center gap-2'}>
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </Text>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};