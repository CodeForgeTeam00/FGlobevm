import React from "react";
import {FeaturedBlogMeta} from "./BlogMeta";
import {FeaturedBlogAuthor} from "./BlogAuthor";
import {ArrowRightIcon} from "@/Components/global/Icons";
import {BlogMainItem} from "@/types/blog";

type Props = {
    data: BlogMainItem;
    avatarLess?: boolean;
};

export const FeaturedBlogContent: React.FC<Props> = ({data, avatarLess = false}) => {
    return (
        <div
            className={`
                featured-blog__content 
                overflow-hidden 
                flex flex-col 
                gap-10 
                py-8
                ${!avatarLess ? "bg-neutral-10 rounded-l-xl xl:w-[633px]   px-4 lg:px-10   justify-between " : ""}`}>
            <div className={'flex flex-col gap-4'}>
                <FeaturedBlogMeta
                    date={data.date}
                    categoryName={data.categoryName}
                    categoryUrl={data.categoryUrl}
                />
                <div className="featured-blog__text flex flex-col gap-2">
                    <h3 className="featured-blog__title font-h3">
                        {data.title}
                    </h3>
                    <p className={`featured-blog__desc leading-[32px] ${!avatarLess ? ' max-w-[535px]' :''} `}>
                        {data.description}
                    </p>
                </div>
            </div>
            {!avatarLess &&
                <div className={'flex flex-col gap-10'}>
                    <FeaturedBlogAuthor author={data.author}/>
                    <a href="#" className="featured-blog__link flex gap-1 items-center">
                <span className="featured-blog__link-text text-primary-6">
                    Read More
                </span>
                        <ArrowRightIcon className="featured-blog__link-icon w-4"/>
                    </a>
                </div>
            }
        </div>
    );
};