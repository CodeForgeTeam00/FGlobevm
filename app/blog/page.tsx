import React from "react";
import Container from "@/components/global/Sections/Container";
import { BlogMainSection } from "@/components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/components/page/BlogPage/BlogGrid";
import { BlogEditorChoiceSection } from "@/components/page/BlogPage/BlogEditorChoiceSection";
import { BlogCategoriesSection } from "@/components/page/BlogPage/BlogCategoriesSection";
import { BlogColSection } from "@/components/page/BlogPage/BlogColSection";
import { WpContent } from "@/components/global/SeoBox";

import { getBlogs, getBlogCategories, getBlog, getPopularPosts } from "@/services/wp-blog";
import { getSeoBox } from "@/services/shared";
import { mapBlogsResponse, mapBlogToFeaturedAndGrid, mapPost } from "@/mappers/blog-mapper";

import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import SeoBoxSection from "@/components/global/SeoBoxSection";
import SocialBanner from "@/components/global/SocialBanner";
import { getSocialMedia } from "@/services/wp-options";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

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
import type { RawBlogPost } from "@/mappers/blog-mapper";
import {WPImage} from "@/types/wp-common";
import {BlogCategory} from "@/types/wp-blog";

 interface BlogPage {
    popular_categories: BlogCategory[];
    editor_choice: RawBlogPost;
    image: WPImage;
    yoast_head_json: YoastSEO;
}

export default async function Blog() {
    const [rawBlog, rawSidebar, data, socialMedia, popular] = await Promise.all([
        getBlogs({ per_page: 5 }),
        getBlogs({ per_page: 3 }),
        getBlog(),
        getSocialMedia(),
        getPopularPosts(),
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const sidebar = mapBlogsResponse(rawSidebar);
    const popularPosts = Array.isArray(popular) ? popular.map(mapPost) : [];

    const { featured, grid } = mapBlogToFeaturedAndGrid(blog?.posts ?? []);

    const yoast = data?.yoast_head_json as YoastSEO | undefined;

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || "Blog | GlobeVM",
            url: `${SITE.url}/blog/`,
            description:
                yoast?.description ||
                "Latest insights on IT infrastructure, cybersecurity, and cloud solutions from GlobeVM.",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Blog", url: `${SITE.url}/blog/` },
        ]),
    ];

    return (
        <>
            <JsonLd data={schemas} />
            <div className='w-full max-w-[1540px] mx-auto px-4 xl:px-0 '>
                <div className="flex flex-col gap-6 lg:gap-14">
                    <div className="flex flex-col gap-6 lg:gap-14 lg:mt-10">
                        <BlogMainSection data={featured} />
                         <BlogGrid data={grid} />
                    </div>
                    <BlogEditorChoiceSection
                        data={data?.editor_choice ? mapPost(data.editor_choice) : null}
                    />
                    <BlogCategoriesSection data={data?.popular_categories ?? []} />
                    <div className="grid xl:grid-cols-2  gap-4 lg:gap-10 ">
                        <BlogColSection title="Popular Articles" data={popularPosts} />
                        <BlogColSection title="New Articles" data={sidebar?.posts ?? []} />
                    </div>
                    {data?.seo_box && (
                        <SeoBoxSection
                            content={data.seo_box.content ?? "hallo"}
                            title={data.seo_box.title}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

