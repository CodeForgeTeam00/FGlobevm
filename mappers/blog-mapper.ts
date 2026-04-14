import { BlogPost, BlogsResponse, BlogPagination } from "@/types/wp-blog";

interface RawBlogPost {
    id?: number;
    slug?: string;
    title: string;
    description: string;
    category_name: string;
    category_url: string;
    date: string;
    author: { name: string; avatar: string };
    image_url: string;
}

interface RawBlogsResponse {
    posts: RawBlogPost[];
    pagination: {
        total_posts: number;
        total_pages: number;
        current_page: number;
        per_page: number;
        has_next: boolean;
        has_prev: boolean;
    };
    sort_by: { current_sort: string };
}

export  function mapPost(raw: RawBlogPost): BlogPost {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        categoryName: raw.category_name,
        categoryUrl: raw.category_url,
        date: raw.date,
        author: raw.author,
        imageUrl: raw.image_url,
    };
}

function mapPagination(raw: RawBlogsResponse["pagination"]): BlogPagination {
    return {
        totalPosts: raw.total_posts,
        totalPages: raw.total_pages,
        currentPage: raw.current_page,
        perPage: raw.per_page,
        hasNext: raw.has_next,
        hasPrev: raw.has_prev,
    };
}

export function mapBlogsResponse(raw: RawBlogsResponse | null): BlogsResponse | null {
    if (!raw) return null;
    return {
        posts: raw.posts.map(mapPost),
        pagination: mapPagination(raw.pagination),
        sortBy: { currentSort: raw.sort_by.current_sort },
    };
}

export function mapBlogToFeaturedAndGrid(posts: BlogPost[]) {
    if (!posts.length) return { featured: null, grid: [] };
    const [featured, ...grid] = posts;
    return { featured, grid };
}