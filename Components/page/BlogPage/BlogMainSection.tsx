import React from "react";
import Image from "next/image";
import {FeaturedBlogContent} from "./MainSection/BlogContent";
import {BlogPost} from "@/types/wp-blog";
import Link from "next/link";

type Props = {
    data: BlogPost | null;
};

export const BlogMainSection: React.FC<Props> = ({data}) => {
    if (!data) return null;

    return (
        <div className="featured-blog w-full">
            <Link href={`/blog/${data.slug}`} className="">
                <div className="featured-blog__wrapper flex flex-col-reverse lg:flex-row">

                    <FeaturedBlogContent data={data}/>
                    <div
                        className="featured-blog__image-wrapper flex-1 lg:max-w-[907px] lg:h-[510px] w-full lg:rounded-r-xl overflow-hidden">
                        <Image
                            src={data.image?.url || ""}
                            alt={data.image?.alt || data.title}
                            width={907}
                            height={510}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};