import React from "react";
import Image from "next/image";
import { BlogPost } from "@/types/wp-blog";
import Text from "@/Components/global/text";

type Props = {
    author: BlogPost["author"];
};

export const FeaturedBlogAuthor: React.FC<Props> = ({ author }) => {
    return (
        <div className="featured-blog__author flex gap-2">
            <div className="featured-blog__avatar rounded-full border w-8 h-8 border-neutral-30 overflow-hidden">
                <Image src={author.avatar?.url || ""} alt={author.avatar?.alt || author.name} width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div className="featured-blog__author-info flex flex-col">
                <Text  variant={'card-tag'} textColor={'light'} >Write By</Text>
                <Text variant={'card-tag'} >{author.name}</Text>
            </div>
        </div>
    );
};