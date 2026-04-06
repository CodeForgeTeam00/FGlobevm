import React from "react";
import { FeaturedBlogContent } from "./MainSection/BlogContent";
import {BlogMainItem} from "@/types/blog";
import Image from "next/image";

type Props = {
    data: BlogMainItem;
};

export const BlogMainSection: React.FC<Props> = ({ data }) => {

    return (
        <div className="featured-blog w-full">
            <div className="featured-blog__wrapper flex flex-col-reverse lg:flex-row ">
                <FeaturedBlogContent data={data} />
                <div className="featured-blog__image-wrapper flex-1 lg:max-w-[907px] lg:h-[510px] w-full lg:rounded-r-xl overflow-hidden">
                    <img
                        src={data.imageUrl}
                        className="featured-blog__image w-full h-full object-cover"
                        alt=""
                    />

                </div>
            </div>
        </div>
    );
};