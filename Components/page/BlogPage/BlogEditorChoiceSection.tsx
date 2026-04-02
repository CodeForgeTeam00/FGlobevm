import React from "react";
import { FeaturedBlogContent } from "./MainSection/BlogContent";
import {BlogMainItem} from "@/types/blog";

type Props = {
    data: BlogMainItem;
};

export const BlogEditorChoiceSection: React.FC<Props> = ({ data }) => {

    return (

        <div className="featured-blog w-full px-4 lg:px-0">
           <h3 className={'mb-6 font-h3'}> Editors Choice</h3>
            <div className="featured-blog__wrapper justify-center gap-10 items-center grid   lg:grid-cols-2 p-4 lg:p-10 border-neutral-30 rounded-xl  border">
                <div className="featured-blog__image-wrapper  lg:h-[400px] w-full  overflow-hidden">
                    <img
                        src={data.imageUrl}
                        className="featured-blog__image rounded-xl w-full h-full object-cover"
                        alt=""
                    />
                </div>
                <FeaturedBlogContent avatarLess data={data} />
            </div>
        </div>
    );
};