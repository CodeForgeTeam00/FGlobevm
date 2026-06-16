import React from "react";
import Image from "next/image";
import { FeaturedBlogContent } from "./MainSection/BlogContent";
import { BlogPost } from "@/types/wp-blog";
import Link from "next/link";
import Text from "@/components/global/text";

type Props = {
    data: BlogPost | null;
};


export const BlogEditorChoiceSection: React.FC<Props> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="featured-blog w-full ">
            <Text variant={'heading-md'} className={'mb-6'}>
                Editors Choice
            </Text>
            <Link href={`/blog/${data.slug}`} >
                <div className="featured-blog__wrapper justify-center gap-3 lg:gap-10 items-center grid lg:grid-cols-2 p-4 lg:p-10 border-neutral-30 rounded-xl border">
                    <div className="featured-blog__image-wrapper lg:h-[400px] w-full overflow-hidden">
                        <Image
                            src={data.image?.url || ""}
                            alt={data.image?.alt || data.title}
                            width={600}
                            height={400}
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>
                    <FeaturedBlogContent avatarLess data={data} />
                </div>
            </Link>
        </div>
        
    );
};