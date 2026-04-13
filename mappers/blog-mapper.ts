import { BlogPost } from "@/types/wp-blog";

export function mapBlogToFeaturedAndGrid(posts: BlogPost[]) {
    if (!posts.length) return { featured: null, grid: [] };

    const [featured, ...grid] = posts;

    return { featured, grid };
}