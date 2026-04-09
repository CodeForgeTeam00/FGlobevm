import React from "react";
import Container from "@/Components/global/Sections/Container";
import { BlogMainSection } from "@/Components/page/BlogPage/BlogMainSection";
import { BlogGrid } from "@/Components/page/BlogPage/BlogGrid";
import { BlogEditorChoiceSection } from "@/Components/page/BlogPage/BlogEditorChoiceSection";
import { BlogCategoriesSection } from "@/Components/page/BlogPage/BlogCategoriesSection";
import { BlogColSection } from "@/Components/page/BlogPage/BlogColSection";
import SocialBanner from "@/Components/global/SocialBanner";
import {InstagramIcon} from "@/Components/global/Icons";
import { getBlogs } from "@/services/wp-blog";
import { mapBlogApiToUI } from "@/mappers/blog-mapper";
import {getBlogSeoBox} from "@/services/wp-blog-seo";
import {WpContent} from "@/Components/global/SeoBox";
import {getBlogEditorChoice} from "@/services/wp-blog-editor-choice";
import {getBlogCategoryPopular} from "@/services/wp-blog-category-popular";


const socialData = [
    { name: "Instagram", icon: InstagramIcon },
    { name: "Twitter", icon:  InstagramIcon},
    { name: "LinkedIn", icon:InstagramIcon },
    { name: "YouTube", icon: InstagramIcon },
];

export default async function Blog() {

    const [blogSeoBox , Blog , sag ,BlogEditorChoice ,BlogCategoryPopular ] = await Promise.all([
        getBlogSeoBox(),
        getBlogs({per_page: 5 }),
        getBlogs({per_page: 3 }),
        getBlogEditorChoice(),
        getBlogCategoryPopular()
    ]);
    const { grid , featured } = mapBlogApiToUI(Blog.posts);
    return (
        <Container>

            <div className="flex flex-col lg:gap-14">
                <div className="flex flex-col lg:gap-20">
                    <BlogMainSection data={featured} />
                    <BlogGrid data={grid} />
                </div>
                <BlogEditorChoiceSection data={BlogEditorChoice} />
                <BlogCategoriesSection data={BlogCategoryPopular} />
                <div className="grid lg:grid-cols-2 px-4 lg:px-0 gap-10">
                    <BlogColSection data={sag.posts} />
                    <BlogColSection data={sag.posts} />
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