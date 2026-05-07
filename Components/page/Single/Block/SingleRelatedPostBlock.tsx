import Image from "next/image";
import { Calendar } from "lucide-react";

export function SingleRelatedPostBlock({ post }: { post: any }) {
    return (
        <div className="my-12 flex flex-col md:flex-row gap-8 p-6 border border-gray-200 rounded-3xl items-center bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0">
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
                <h3 className="font-bold text-2xl text-gray-900 leading-snug group-hover:text-[#00a0e9] transition-colors">{post.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                    <span className="font-medium text-gray-700">By {post.author?.name}</span>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}