import ContentRenderer from "@/Components/page/Single/ContentRenderer";
import Image from "next/image";
import { Share2, MessageCircle, Calendar, Play, Plus, Minus, Search, Home, ChevronRight } from 'lucide-react';
export function Hero({ data }: { data: any }) {
    return (
        <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Home className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-[#00a0e9] cursor-pointer transition-colors">Category</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-[#00a0e9] cursor-pointer transition-colors">Category</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.15] max-w-4xl">
                {data.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mt-2">
                <div className="flex items-center gap-4">
                    <Image
                        src={data.author.avatar}
                        alt={data.author.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-gray-100"
                        unoptimized
                    />

                    <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-gray-900">By {data.author.name}</span>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-gray-500">
                    <button className="hover:text-[#00a0e9] transition-colors"><Share2 className="w-5 h-5" /></button>
                    <button className="hover:text-[#00a0e9] transition-colors"><MessageCircle className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[21/9] mt-2 rounded-[2rem] overflow-hidden shadow-sm">
                <Image
                    src={data.imageUrl}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
            </div>
        </div>
    );
}
