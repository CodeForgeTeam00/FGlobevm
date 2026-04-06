import React from 'react';
import {CategoryCardProps} from "@/types/blog";



export function CategoryCard({ name, postCount, image }: CategoryCardProps) {
    return (
        <div className="relative w-full h-[197px] rounded-2xl overflow-hidden group cursor-pointer">
            <img
                src={image.url}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30"/>
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>

            <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-1.5">
                <h3 className="text-white text-xl">
                    {name}
                </h3>
                <p className="text-white/90">
                    {postCount} Article
                </p>
            </div>
        </div>
    );
}
