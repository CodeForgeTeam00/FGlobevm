"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

export function VideoBlock({ data }: { data: any }) {
    const [playing, setPlaying] = useState(false);
    const isGif = data.videoUrl?.endsWith(".gif");

    return (
        <div className="my-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden flex-shrink-0">
                {isGif ? (
                    <Image
                        src={data.videoUrl}
                        alt="Video content"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : playing ? (
                    <video
                        autoPlay
                        controls
                        className="w-full h-full object-cover rounded-2xl"
                    >
                        <source src={data.videoUrl} />
                    </video>
                ) : (
                    <button
                        onClick={() => setPlaying(true)}
                        className="w-full h-full relative group"
                    >
                        <Image
                            src={data.posterVideo?.url}
                            alt={data.posterVideo?.alt || "Video poster"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-colors group-hover:bg-black/20">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-6 h-6 text-[#00a0e9] fill-[#00a0e9] ml-1" />
                            </div>
                        </div>
                    </button>
                )}
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-gray-700 leading-relaxed text-lg">
                    {data.description}
                </p>
            </div>
        </div>
    );
}