import React from "react";
import Image from "next/image";
import { BlogPost } from "@/types/wp-blog";

type Props = {
    author: BlogPost["author"];
};

export const FeaturedBlogAuthor: React.FC<Props> = ({ author }) => {
    return (
        <div className="featured-blog__author flex gap-2">
            <div className="featured-blog__avatar rounded-full border w-8 h-8 border-neutral-30 overflow-hidden">
                <Image src={author.avatar} alt={author.name} width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div className="featured-blog__author-info flex flex-col">
                <p className="text-footnote text-neutral-50">Write By</p>
                <p className="text-caption text-neutral-700">{author.name}</p>
            </div>
        </div>
    );
};