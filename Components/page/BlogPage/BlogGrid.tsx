import React from "react";
import BlogCard from "@/Components/global/Cards/BlogCard";
import { BlogPost } from "@/types/wp-blog";

type Props = {
    data: BlogPost[];
};

export const BlogGrid: React.FC<Props> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  lg:px-4 lg:px-0 gap-4">
            {data.map((item, index) => (
                <BlogCard key={index} data={item} />
            ))}
        </div>
    );
};