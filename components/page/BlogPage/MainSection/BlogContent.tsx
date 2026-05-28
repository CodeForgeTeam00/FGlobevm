import React from "react";
import { FeaturedBlogMeta } from "./BlogMeta";
import { FeaturedBlogAuthor } from "./BlogAuthor";
import { ArrowRightIcon } from "@/components/global/Icons";
import { BlogPost } from "@/types/wp-blog";
import Text from "@/components/global/text";

type Props = {
    data: BlogPost;
    avatarLess?: boolean;
};

export const FeaturedBlogContent: React.FC<Props> = ({ data, avatarLess = false }) => {
    return (
        <div
            className={`featured-blog__content overflow-hidden flex flex-col gap-10 py-8 ${
                !avatarLess
                    ? "bg-neutral-10 rounded-l-xl lg:w-[633px] px-4 lg:px-10 justify-between"
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
                    <Text variant={'heading-md'}>{data.title}</Text>
                    <Text textColor={'light'} variant={'body-md'} className={` lg:line-clamp-4 line-clamp-6 lg:min-h-[112px] min-h-[144px] ${!avatarLess ? "max-w-[535px]" : ""}`}>
                        {data.description}
                    </Text>
                </div>
            </div>
            {!avatarLess && (
                <div className="flex flex-col gap-10">
                    <FeaturedBlogAuthor author={data.author} />
                    <div className="flex gap-1 items-center">
                        <Text variant={'link'} textColor={'primary'} >Read More</Text>
                        <ArrowRightIcon className="w-4" />
                    </div>
                </div>
            )}
        </div>
    );
};