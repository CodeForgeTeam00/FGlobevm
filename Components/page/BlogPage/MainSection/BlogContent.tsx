import React from "react";
import { FeaturedBlogMeta } from "./BlogMeta";
import { FeaturedBlogAuthor } from "./BlogAuthor";
import { ArrowRightIcon } from "@/Components/global/Icons";
import { BlogPost } from "@/types/wp-blog";

type Props = {
    data: BlogPost;
    avatarLess?: boolean;
};

export const FeaturedBlogContent: React.FC<Props> = ({ data, avatarLess = false }) => {
    return (
        <div
            className={`featured-blog__content overflow-hidden flex flex-col gap-10 py-8 ${
                !avatarLess
                    ? "bg-neutral-10 rounded-l-xl xl:w-[633px] px-4 lg:px-10 justify-between"
                    : ""
            }`}
        >
            <div className="flex flex-col gap-4">
                <FeaturedBlogMeta
                    date={data.date}
                    categoryName={data.categoryName}
                    categoryUrl={data.categoryUrl}
                />
                <div className="flex flex-col gap-2">
                    <h3 className="font-h3">{data.title}</h3>
                    <p className={`leading-[32px] ${!avatarLess ? "max-w-[535px]" : ""}`}>
                        {data.description}
                    </p>
                </div>
            </div>
            {!avatarLess && (
                <div className="flex flex-col gap-10">
                    <FeaturedBlogAuthor author={data.author} />
                    <a href="#" className="flex gap-1 items-center">
                        <span className="text-primary-6">Read More</span>
                        <ArrowRightIcon className="w-4" />
                    </a>
                </div>
            )}
        </div>
    );
};