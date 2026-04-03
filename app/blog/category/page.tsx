import React from "react";
import Container from "@/Components/global/Sections/Container";
import { BlogMainSection } from "@/Components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/Components/page/BlogPage/BlogGrid";

import { getBlogs } from "@/services/wp-blog";


import BlogCard from "@/Components/global/Cards/BlogCard";

export default async function category() {
    const [Blog] = await Promise.all([
        getBlogs(),
    ]);
    console.log(Blog.posts)
    return (
        <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0  gap-4">
                    {Blog.posts.map((item, index) => (
                        <BlogCard hasAuthor key={index} data={item} />
                    ))}
                </div>
        </Container>
    );
}
