import React from "react";
import { CalendarAddIcon } from "@/Components/global/Icons";

type BlogCardProps = {
    title: string;
    categoryName: string;
    categoryUrl: string;
    author: string;
    date: string;
    imageUrl: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
                                               title,
                                               date,
                                               author,
                                               categoryName,
                                               categoryUrl,
                                               imageUrl
                                           }) => {
    return (
        <div className="blog-card flex flex-col  cursor-pointer">
            <div className="blog-card__image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className="blog-card__image rounded-lg"
                />
            </div>
            <div className="blog-card__content py-3 lg:py-4 px-2 flex w-full flex-col gap-2">
                <div className="blog-card__category">
                    <a
                        className="blog-card__category-link text-caption text-primary-6"
                        href={categoryUrl}
                    >
                        {categoryName}
                    </a>
                </div>
                <div className="blog-card__title">
                    <p className="blog-card__title-text   lg:text-xl">{title}</p>
                </div>
                <div className="blog-card__meta flex gap-2 lg:gap-4">
                    <div className="blog-card__author flex text-footnote lg:text-small gap-1">
                        <p className="blog-card__author-label text-neutral-100">By</p>
                        <p className="blog-card__author-name text-neutral-50">{author}</p>
                    </div>
                    <div className="blog-card__date flex gap-1">
                        <CalendarAddIcon className="blog-card__date-icon w-4 text-neutral-50" />
                        <p className="blog-card__date-text text-footnote lg:text-small text-neutral-50">
                            {date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;