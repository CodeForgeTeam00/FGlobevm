import React from "react";
import { CalendarAddIcon } from "@/Components/global/Icons";
import {BlogApiItem} from "@/types/blog";

type BlogCardData = {
    title: string;
    categoryName: string;
    categoryUrl: string;
    author: string;
    date: string;
    imageUrl: string;
};
type BlogCardProps = {
    data: BlogApiItem;
};
const RowBlogCard: React.FC<BlogCardProps> = ({ data }) => {
    const {
        title,
        date,
        author,
        categoryName,
        categoryUrl,
        imageUrl
    } = data;

    return (
        <div className="blog-card flex lg:gap-4 gap-2  cursor-pointer">

            <div className="blog-card__image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className="blog-card__image min-w-[127px] max-w-[127px]  lg:min-w-[272px] lg:max-w-[272px] aspect-[16/9] object-cover rounded-lg"
                />
            </div>
            <div className="blog-card__content  lg:py-4 lg:px-2 flex w-full flex-col gap-1 lg:gap-2">
                <div className="blog-card__category">
                    <a
                        className="blog-card__category-link text-caption text-primary-6"
                        href={categoryUrl}
                    >
                        {categoryName}
                    </a>
                </div>
                <div className="blog-card__title">
                    <p className="blog-card__title-text lg:text-xl">{title}</p>
                </div>
                <div className="blog-card__meta flex gap-2 lg:gap-4">
                    <div className="blog-card__author flex text-footnote lg:text-small gap-1">
                        <span className="text-neutral-100">By</span>
                        <span className="text-neutral-50">{author.name}</span>
                    </div>
                    <div className="blog-card__date flex gap-1">
                        <CalendarAddIcon className="w-4 text-neutral-50" />
                        <span className="text-footnote lg:text-small text-neutral-50">
                            {date}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RowBlogCard;