import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarAddIcon } from "@/components/global/Icons";
import { BlogPost } from "@/types/wp-blog";
import Text from "@/components/global/text";

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
        ? "lg:py-4 lg:px-2 flex  flex-col gap-1 lg:gap-2"
        : "blog-card__content py-3 lg:py-4 px-2 flex w-full flex-col gap-2";

    return (
        <Link href={`/blog/${slug}`} className={wrapperClasses}>
            <div className="blog-card__image-wrapper  rounded-lg">
                <Image
                    src={image?.url || ""}
                    alt={image?.alt || title}
                    width={imageSize.width}
                    height={imageSize.height}
                    className={imageClasses}
                />
            </div>
            <div className={contentClasses}>
                <Text variant={"card-caption"} textColor={'primary'}>
                    {categoryName}
                </Text>
                <Text as={'h3'} variant={'card-title-md'} className={'lg:line-clamp-2 line-clamp-2 lg:min-h-16 min-h-14 '}>
                    {title}
                </Text>
                <div className="flex gap-2 lg:gap-4">
                    {showAuthor && author?.name && (
                        <div className=" text-footnote hidden md:flex lg:text-small gap-1">
                            <Text variant={'card-tag'} textColor={'black'}>
                                By
                            </Text>
                            <Text variant={'card-tag'} textColor={'light'}>
                                {author.name}
                            </Text>
                        </div>
                    )}
                    <div className="flex gap-1">
                        <CalendarAddIcon className="w-4 text-neutral-300" />
                        <Text variant={'card-tag'} textColor={'light'}>
                            {date}
                        </Text>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;