import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarAddIcon } from "@/Components/global/Icons";
import { BlogPost } from "@/types/wp-blog";

type BlogCardProps = {
    data: BlogPost;
    hasAuthor?: boolean;
};

const BlogCard: React.FC<BlogCardProps> = ({ data, hasAuthor }) => {
    const {
        title,
        date,
        author,
        categoryName,
        categoryUrl,
        imageUrl,
        slug,
    } = data;

    return (
        <Link href={`/blog/${slug}`} className="blog-card flex flex-col cursor-pointer group">
            <div className="blog-card__image-wrapper overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={225}
                    className="w-full h-full aspect-[16/9] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="blog-card__content py-3 lg:py-4 px-2 flex w-full flex-col gap-2">
                <span className="text-caption text-primary-6">
                    {categoryName}
                </span>
                <p className="lg:text-xl">{title}</p>
                <div className="flex gap-2 lg:gap-4">
                    {hasAuthor && (
                        <div className="flex text-footnote lg:text-small gap-1">
                            <span className="text-neutral-100">By</span>
                            <span className="text-neutral-50">{author.name}</span>
                        </div>
                    )}
                    <div className="flex gap-1">
                        <CalendarAddIcon className="w-4 text-neutral-50" />
                        <span className="text-footnote lg:text-small text-neutral-50">
                            {date}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;