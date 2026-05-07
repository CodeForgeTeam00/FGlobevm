import React from "react";
import Image from "next/image";
import { BlogCategory } from "@/types/wp-blog";

export function CategoryCard({ name, postCount, image }: BlogCategory) {
    return (
        <div className="relative w-full h-[197px] rounded-2xl overflow-hidden group cursor-pointer">
            <Image
                src={image.url}
                alt={image.alt || name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-1.5">
                <h3 className="text-white text-xl">{name}</h3>
                <p className="text-white/90">{postCount} Article</p>
            </div>
        </div>
    );
}