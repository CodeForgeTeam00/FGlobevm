import React from "react";
import { BlogPost } from "@/types/wp-blog";
import RowBlogCard from "@/Components/global/Cards/RowBlogCard";
import BlogCard from "@/Components/global/Cards/BlogCard";
import Text from "@/Components/global/text";

type Props = {
    data: BlogPost[];
};

export const BlogColSection: React.FC<Props> = ({ data }) => {
    return (
        <div className="flex flex-col p-4 lg:p-10 border border-neutral-30 rounded-xl gap-2 lg:gap-4">
            <Text variant={'heading-md'} className="font-h3">Popular Articles</Text>

            {data.map((item, index) => (
                <BlogCard layout={'horizontal'}  key={index} data={item} />
            ))}
        </div>
    );
};