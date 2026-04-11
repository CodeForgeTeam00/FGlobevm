import {Play} from "lucide-react";
import Image from "next/image";

export function VideoBlock({ data }: { data: any }) {
    return (
        <div className="my-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0">
                <Image   unoptimized src={data.posterVideo.url} alt={data.posterVideo.alt || 'Video poster'} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-colors group-hover:bg-black/20">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-[#00a0e9] fill-[#00a0e9] ml-1" />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-gray-700 leading-relaxed text-lg">
                    {data.description}
                </p>
            </div>
        </div>
    );
}