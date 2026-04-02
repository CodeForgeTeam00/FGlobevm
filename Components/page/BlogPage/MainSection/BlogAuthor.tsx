import React from "react";
import {BlogMainItem} from "@/types/blog";

type Props = {
    author: BlogMainItem['author'];
};

export const FeaturedBlogAuthor: React.FC<Props> = ({ author }) => {
    return (
        <div className="featured-blog__author flex gap-2">

            <div className="featured-blog__avatar rounded-full border w-8 h-8 border-neutral-30 overflow-hidden">
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>

            <div className="featured-blog__author-info flex flex-col">
                <p className="featured-blog__author-label text-footnote text-neutral-50">
                    Write By
                </p>
                <p className="featured-blog__author-name text-caption text-neutral-700">
                    {author.name}
                </p>
            </div>

        </div>
    );
};