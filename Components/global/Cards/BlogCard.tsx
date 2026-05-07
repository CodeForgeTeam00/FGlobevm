import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarAddIcon } from "@/Components/global/Icons";
import { BlogPost } from "@/types/wp-blog";

type BlogCardLayout = "vertical" | "horizontal";

type BlogCardProps = {
    data: BlogPost;
    layout?: BlogCardLayout;
    showAuthor?: boolean;
};

const BlogCard: React.FC<BlogCardProps> = ({
                                               data,
                                               layout = "vertical",
                                               showAuthor = true,
                                           }) => {
    const { title, date, author, categoryName, image, slug } = data;

    const isHorizontal = layout === "horizontal";

    const wrapperClasses = isHorizontal
        ? "blog-card flex lg:gap-4 gap-2 cursor-pointer group"
        : "blog-card flex flex-col cursor-pointer group";

    const imageSize = isHorizontal
        ? { width: 272, height: 153 }
        : { width: 400, height: 225 };

    const imageClasses = isHorizontal
        ? "min-w-[127px] max-w-[127px] lg:min-w-[272px] lg:max-w-[272px] aspect-[16/9] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        : "w-full h-full aspect-[16/9] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300";

    const contentClasses = isHorizontal
        ? "lg:py-4 lg:px-2 flex w-full flex-col gap-1 lg:gap-2"
        : "blog-card__content py-3 lg:py-4 px-2 flex w-full flex-col gap-2";

    return (
        <Link href={`/blog/${slug}`} className={wrapperClasses}>
            <div className="blog-card__image-wrapper overflow-hidden rounded-lg">
                <Image
                    src={image?.url || ""}
                    alt={image?.alt || title}
                    width={imageSize.width}
                    height={imageSize.height}
                    className={imageClasses}
                />
            </div>
            <div className={contentClasses}>
                <span className="text-caption text-primary-6">{categoryName}</span>
                <p className="lg:text-xl">{title}</p>
                <div className="flex gap-2 lg:gap-4">
                    {showAuthor && author?.name && (
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