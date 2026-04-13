import React from "react";
import Container from "@/Components/global/Sections/Container";
import { BlogMainSection } from "@/Components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/Components/page/BlogPage/BlogGrid";
import { BlogEditorChoiceSection } from "@/Components/page/BlogPage/BlogEditorChoiceSection";
import { BlogCategoriesSection } from "@/Components/page/BlogPage/BlogCategoriesSection";
import { BlogColSection } from "@/Components/page/BlogPage/BlogColSection";
import SocialBanner from "@/Components/global/SocialBanner";
import { InstagramIcon } from "@/Components/global/Icons";
import { WpContent } from "@/Components/global/SeoBox";

import { getBlogs, getBlogEditorChoice, getBlogCategories } from "@/services/wp-blog";
import { getSeoBox } from "@/services/shared";
import { mapBlogToFeaturedAndGrid } from "@/mappers/blog-mapper";

const socialData = [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon: InstagramIcon },
    { name: "LinkedIn", icon: InstagramIcon },
    { name: "YouTube", icon: InstagramIcon },
];

export default async function Blog() {
    const [blogSeoBox, blog, sidebar, editorChoice, categories] = await Promise.all([
        getSeoBox(211),
        getBlogs({ per_page: 5 }),
        getBlogs({ per_page: 3 }),
        getBlogEditorChoice(),
        getBlogCategories(),
    ]);

    const { featured, grid } = mapBlogToFeaturedAndGrid(blog?.posts ?? []);

    return (
        <Container>
            <div className="flex flex-col lg:gap-14">
                <div className="flex flex-col lg:gap-20">
                    <BlogMainSection data={featured} />
                    <BlogGrid data={grid} />
                </div>
                <BlogEditorChoiceSection data={editorChoice} />
                <BlogCategoriesSection data={categories} />
                <div className="grid lg:grid-cols-2 px-4 lg:px-0 gap-10">
                    <BlogColSection data={sidebar?.posts ?? []} />
                    <BlogColSection data={sidebar?.posts ?? []} />
                </div>
                <SocialBanner
                    title="Globe VM in Socials"
                    subtitle="Business owners trust"
                    socials={socialData}
                />
                <div>
                    <WpContent content={blogSeoBox} />
                </div>
            </div>
        </Container>
    );
}