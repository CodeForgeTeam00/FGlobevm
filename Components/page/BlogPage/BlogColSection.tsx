import React from "react";
import { BlogPost } from "@/types/wp-blog";
import RowBlogCard from "@/Components/global/Cards/RowBlogCard";

type Props = {
    data: BlogPost[];
};

export const BlogColSection: React.FC<Props> = ({ data }) => {
    return (
        <div className="flex flex-col p-4 lg:p-10 border border-neutral-30 rounded-xl gap-2 lg:gap-4">
            <p className="font-h3">Popular Articles</p>
            {data.map((item, index) => (
                <RowBlogCard key={index} data={item} />
            ))}
        </div>
    );
};