import React from "react";
import { CalendarAddIcon } from "@/Components/global/Icons";

type BlogCardData = {
    title: string;
    categoryName: string;
    categoryUrl: string;
    author: {
        name: string;
        url: string;
    };
    date: string;
    imageUrl: string;
};
type BlogCardProps = {
    data: BlogCardData;
    hasAuthor?: boolean;
};
const BlogCard: React.FC<BlogCardProps> = ({ data ,   hasAuthor,}) => {
    const {

        title,
        date,
        author,
        categoryName,
        categoryUrl,
        imageUrl
    } = data ;

    return (
        <div className="blog-card flex flex-col cursor-pointer">
            <div className="blog-card__image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className="blog-card__image w-full h-full aspect-[16/9] object-cover rounded-lg"
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
                    <p className="blog-card__title-text lg:text-xl">{title}</p>
                </div>
                <div className="blog-card__meta flex gap-2 lg:gap-4">
                    {hasAuthor &&
                        <div className="blog-card__author flex text-footnote lg:text-small gap-1">
                            <span className="text-neutral-100">By</span>
                            <span className="text-neutral-50">{author.name}</span>
                        </div>
                    }
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

export default BlogCard;