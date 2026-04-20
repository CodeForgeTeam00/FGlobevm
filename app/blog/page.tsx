import React from "react";
import Container from "@/Components/global/Sections/Container";
import { BlogMainSection } from "@/Components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/Components/page/BlogPage/BlogGrid";
import { BlogEditorChoiceSection } from "@/Components/page/BlogPage/BlogEditorChoiceSection";
import { BlogCategoriesSection } from "@/Components/page/BlogPage/BlogCategoriesSection";
import { BlogColSection } from "@/Components/page/BlogPage/BlogColSection";
import { WpContent } from "@/Components/global/SeoBox";

import { getBlogs, getBlogEditorChoice, getBlogCategories } from "@/services/wp-blog";
import { getSeoBox } from "@/services/shared";
import { mapBlogsResponse, mapBlogToFeaturedAndGrid, mapPost } from "@/mappers/blog-mapper";

import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Blog",
    description: "Latest insights on IT infrastructure, cybersecurity, and cloud solutions from GlobeVM.",
};

export default async function Blog() {
    const [blogSeoBox, rawBlog, rawSidebar, rawEditorChoice, categories] = await Promise.all([
        getSeoBox(211 , 'seo_box'),
        getBlogs({ per_page: 5 }),
        getBlogs({ per_page: 3 }),
        getBlogEditorChoice(),
        getBlogCategories(),
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const sidebar = mapBlogsResponse(rawSidebar);
    const editorChoice = rawEditorChoice ? mapPost(rawEditorChoice) : null;

    const { featured, grid } = mapBlogToFeaturedAndGrid(blog?.posts ?? []);

    return (
        <Container>
            <div className="flex flex-col lg:gap-14">
                <div className="flex flex-col lg:gap-20">
                    <BlogMainSection data={featured} />
                    <BlogGrid data={grid} />
                </div>
                <BlogEditorChoiceSection data={editorChoice} />
                <BlogCategoriesSection data={categories ?? []} />
                <div className="grid lg:grid-cols-2 px-4 lg:px-0 gap-10">
                    <BlogColSection data={sidebar?.posts ?? []} />
                    <BlogColSection data={sidebar?.posts ?? []} />
                </div>
                {blogSeoBox && (
                    <div>
                        <WpContent content={blogSeoBox} />
                    </div>
                )}
            </div>
        </Container>
    );
}