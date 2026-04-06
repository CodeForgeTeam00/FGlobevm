import React from "react";

import {BlogMainItem} from "@/types/blog";
import {CalendarAddIcon} from "@/Components/global/Icons";

type Props = {
    categoryName:BlogMainItem["categoryName"];
    categoryUrl:BlogMainItem["categoryUrl"];
    date:BlogMainItem["date"];
};

export const FeaturedBlogMeta: React.FC<Props> = ({  categoryName , date , categoryUrl }) => {
    return (
        <div className="featured-blog__meta flex gap-1 items-center">

            <div className="featured-blog__tag px-3 py-1 text-caption rounded-2xl text-primary-6 border border-primary-6 bg-white">
                {categoryName}
            </div>

            <div className="featured-blog__dot w-1 h-1 rounded-full bg-neutral-50" />

            <div className="featured-blog__date flex gap-1">
                <CalendarAddIcon className="featured-blog__date-icon w-4 text-neutral-50" />
                <p className="featured-blog__date-text text-footnote lg:text-small text-neutral-50">
                    {date}
                </p>
            </div>

        </div>
    );
};