import React from "react";
import Container from "@/components/global/Sections/Container";
import { BlogMainSection } from "@/components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/components/page/BlogPage/BlogGrid";
import { BlogEditorChoiceSection } from "@/components/page/BlogPage/BlogEditorChoiceSection";
import { BlogCategoriesSection } from "@/components/page/BlogPage/BlogCategoriesSection";
import { BlogColSection } from "@/components/page/BlogPage/BlogColSection";
import { WpContent } from "@/components/global/SeoBox";

import { getBlogs, getBlogCategories, getBlog } from "@/services/wp-blog";
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

export default async function Blog() {
    const [rawBlog, rawSidebar, data, socialMedia] = await Promise.all([
        getBlogs({ per_page: 5 }),
        getBlogs({ per_page: 3 }),
        getBlog(),
        getSocialMedia(),
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const sidebar = mapBlogsResponse(rawSidebar);

    const { featured, grid } = mapBlogToFeaturedAndGrid(blog?.posts ?? []);

    const yoast = data?.yoast_head_json as YoastSEO | undefined;

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || "Blog | GlobeVM",
            url: `${SITE.url}/blog/`,
            description: yoast?.description || "Latest insights on IT infrastructure, cybersecurity, and cloud solutions from GlobeVM.",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Blog", url: `${SITE.url}/blog/` },
        ]),
    ];


    return (
        <>
            <JsonLd data={schemas} />
            <Container>
                <div className="flex flex-col lg:gap-14">
                    <div className="flex flex-col lg:gap-20 lg:mt-10">
                        <BlogMainSection data={featured} />
                        <BlogGrid data={grid} />
                    </div>
                    <BlogEditorChoiceSection data={data?.editor_choice ?? null} />
                    <BlogCategoriesSection data={data?.popular_categories ?? []} />
                    <div className="grid lg:grid-cols-2 px-4 lg:px-0 gap-10">
                        <BlogColSection data={sidebar?.posts ?? []} />
                        <BlogColSection data={sidebar?.posts ?? []} />
                    </div>
                </div>
            </Container>
        </>
    );
}