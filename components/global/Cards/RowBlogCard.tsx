import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarAddIcon } from "@/components/global/Icons";
import { BlogPost } from "@/types/wp-blog";

type BlogCardProps = {
    data: BlogPost;
};

const RowBlogCard: React.FC<BlogCardProps> = ({ data }) => {
    const {
        title,
        date,
        author,
        categoryName,
        image,
        slug,
    } = data;

    return (
        <Link href={`/blog/${slug}`} className="blog-card flex lg:gap-4 gap-2 cursor-pointer group">
            <div className="blog-card__image-wrapper overflow-hidden rounded-lg">
                <Image
                    src={image?.url || ""}
                    alt={image?.alt || title}
                    width={272}
                    height={153}
                    className="min-w-[127px] max-w-[127px] lg:min-w-[272px] lg:max-w-[272px] aspect-[16/9] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="lg:py-4 lg:px-2 flex w-full flex-col gap-1 lg:gap-2">
                <span className="text-caption text-primary-6">
                    {categoryName}
                </span>
                <p className="lg:text-xl">{title}</p>
                <div className="flex gap-2 lg:gap-4">
                    <div className="flex text-footnote lg:text-small gap-1">
                        <span className="text-neutral-100">By</span>
                        <span className="text-neutral-50">{author.name}</span>
                    </div>
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

export default RowBlogCard;