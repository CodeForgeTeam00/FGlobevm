import React from "react";
import { BlogPost } from "@/types/wp-blog";
import { CalendarAddIcon } from "@/components/global/Icons";
import Text from "@/components/global/text";

type Props = {
    categoryName: string;
    categoryUrl: string;
    date: string;
};

export const FeaturedBlogMeta: React.FC<Props> = ({ categoryName, date }) => {
    return (
        <div className="featured-blog__meta flex gap-1 items-center">
            <div className="px-3 py-1 text-caption rounded-2xl text-primary-6 border border-primary-6 bg-neutral-0">
                {categoryName}
            </div>
            <div className="w-1 h-1 rounded-full bg-neutral-50" />
            <div className="flex gap-1">
                <CalendarAddIcon className="w-4 text-neutral-300" />
                <Text textColor={'light'} variant={'card-tag'}>
                    {date}
                </Text>
            </div>
        </div>
    );
};