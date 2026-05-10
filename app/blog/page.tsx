import React from "react";
import Container from "@/Components/global/Sections/Container";
import {BlogMainSection} from "@/Components/page/BlogPage/BlogMainSection";
import {BlogGrid} from "@/Components/page/BlogPage/BlogGrid";
import {BlogEditorChoiceSection} from "@/Components/page/BlogPage/BlogEditorChoiceSection";
import {BlogCategoriesSection} from "@/Components/page/BlogPage/BlogCategoriesSection";
import {BlogColSection} from "@/Components/page/BlogPage/BlogColSection";
import {WpContent} from "@/Components/global/SeoBox";

import {getBlogs, getBlogCategories, getBlog} from "@/services/wp-blog";
import {getSeoBox} from "@/services/shared";
import {mapBlogsResponse, mapBlogToFeaturedAndGrid, mapPost} from "@/mappers/blog-mapper";

import type {Metadata} from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import SeoBoxSection from "@/Components/global/SeoBoxSection";
import SocialBanner from "@/Components/global/SocialBanner";
import {getSocialMedia} from "@/services/wp-options";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getBlog();

    if (data?.yoast_head_json) {
        return yoastToMetadata(data.yoast_head_json as YoastSEO, {
            canonicalOverride: "https://www.globevm.com/blog",
        });
    }
    return {
        title: "Blog | GlobeVM",
        description: "Latest insights on IT infrastructure, cybersecurity, and cloud solutions from GlobeVM.",
        alternates: {
            canonical: "https://www.globevm.com/blog",
        },
    };
}

export default async function Blog() {
    const [ rawBlog, rawSidebar, data , socialMedia] = await Promise.all([
        getBlogs({per_page: 5}),
        getBlogs({per_page: 3}),
        getBlog(),
        getSocialMedia()
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const sidebar = mapBlogsResponse(rawSidebar);
    // const editorChoice = rawEditorChoice ? mapPost(rawEditorChoice) : null;

    const {featured, grid} = mapBlogToFeaturedAndGrid(blog?.posts ?? []);

    return (
        <Container>
            <div className="flex flex-col lg:gap-14">
                <div className="flex flex-col lg:gap-20 lg:mt-10">
                    <BlogMainSection data={featured}/>
                    <BlogGrid data={grid}/>
                </div>
                <BlogEditorChoiceSection data={data?.editor_choice ?? null}/>
                <BlogCategoriesSection data={data?.popular_categories ?? []}/>
                <div className="grid lg:grid-cols-2 px-4 lg:px-0 gap-10">
                    <BlogColSection data={sidebar?.posts ?? []}/>
                    <BlogColSection data={sidebar?.posts ?? []}/>
                </div>
            </div>
        </Container>
    );
}