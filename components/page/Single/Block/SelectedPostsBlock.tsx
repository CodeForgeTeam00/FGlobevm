import Image from "next/image";
import { Calendar } from "lucide-react";

export function SelectedPostsBlock({ posts }: { posts: any[] }) {
    return (
        <div className="my-16 p-8 md:p-10 border border-gray-200 rounded-[2rem] bg-white shadow-sm">
            <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-3xl font-bold font-serif text-gray-900">Promotions</h2>
                <p className="text-gray-500">Description</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post: any, index: number) => (
                    <div key={index} className="flex flex-col gap-5 group cursor-pointer">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                            {post.image?.url && (
                                <Image
                                    unoptimized
                                    src={post.image.url}
                                    alt={post.image?.alt || post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[#00a0e9] text-sm font-medium">{post.categoryName}</span>
                            <h3 className="font-bold text-xl text-gray-900 leading-snug group-hover:text-[#00a0e9] transition-colors line-clamp-2">{post.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="font-medium text-gray-700">By {post.author?.name}</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}