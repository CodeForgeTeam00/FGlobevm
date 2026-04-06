import { BlogApiItem, BlogMainItem, BlogGridItem } from "@/types/blog";
export const mapBlogApiToUI = (blogs: BlogApiItem[]) => {
    const last = blogs[0];

    const featured: BlogMainItem = {
        ...last,
        description: last.description || ""
    };

    const grid: BlogGridItem[] = blogs
        .slice(0, blogs.length - 1)
        .map((item) => ({
            title: item.title,
            categoryName: item.categoryName,
            categoryUrl: item.categoryUrl,
            date: item.date,
            imageUrl: item.imageUrl
        }));

    return { featured, grid };
};