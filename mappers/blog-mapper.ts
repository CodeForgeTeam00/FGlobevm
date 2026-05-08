import { BlogPost, BlogsResponse, BlogPagination } from "@/types/wp-blog";

export  interface RawBlogPost {
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

export  interface RawBlogsResponse {
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

export function mapPost(raw: any): BlogPost {
    return {
        id: raw.id,
        slug: raw.slug,
        title: raw.title,
        description: raw.description,
        categoryName: raw.category_name ?? raw.categoryName,
        categoryUrl: raw.category_url ?? raw.categoryUrl,
        date: raw.date,
        author: {
            name: raw.author?.name,
            avatar: typeof raw.author?.avatar === "string"
                ? { url: raw.author.avatar, alt: raw.author.name }
                : raw.author?.avatar ?? { url: "", alt: "" },
        },
        image: typeof raw.image === "string"
            ? { url: raw.image, alt: "" }
            : raw.image ?? (raw.image_url ? { url: raw.image_url, alt: "" } : { url: "", alt: "" }),
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
export function decodeHtmlEntities(str: string | undefined | null): string {
    if (!str) return "";
    return str
        .replace(/&hellip;/g, "…")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&mdash;/g, "—")
        .replace(/&ndash;/g, "–")
        .replace(/&rsquo;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&rdquo;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}