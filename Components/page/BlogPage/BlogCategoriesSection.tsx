import React from "react";
import { BlogCategory } from "@/types/wp-blog";
import { CategoryCard } from "@/Components/global/Cards/CategoryCard";

type Props = {
    data: BlogCategory[];
};

export const BlogCategoriesSection: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full px-4 lg:px-0">
            <div className="flex flex-col items-center gap-4">
                <h3 className="font-h3">Popular Categories</h3>
                <p className="font-subtitle max-w-[900px] text-center text-neutral-300">
                    From infrastructure management and cloud environments to
                    endpoint protection and network security, our services are
                    designed to keep your
                </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-10">
                {data.map((item, index) => (
                    <CategoryCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};