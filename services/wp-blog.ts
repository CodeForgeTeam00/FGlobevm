import { fetchWP } from "@/lib/api";
import { BlogCategory, BlogPost, BlogSinglePost } from "@/types/wp-blog";

interface GetBlogsParams {
    page?: number;
    per_page?: number;
    category_slug?: string;
}

export async function getBlogs(params?: GetBlogsParams) {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.per_page) query.append("per_page", String(params.per_page));
    if (params?.category_slug) query.append("category_slug", params.category_slug);

    const queryString = query.toString();
    const endpoint = `/gvm/v1/posts${queryString ? `?${queryString}` : ""}`;

    console.log("BLOG API CALL:", endpoint);

    return fetchWP<any>(
        endpoint,
        { strategy: { type: "isr", revalidate: 1800 }, tag: "blog" }
    );
}
export async function getBlogBySlug(slug: string) {
    return fetchWP<any>(
        `/gvm/v1/blog/${slug}`,
        { strategy: { type: "isr", revalidate: 1800 }, tag: "blog" }
    );
}

export async function getBlogCategories() {
    return fetchWP<BlogCategory[]>(
        "/gvm/v1/pages/211/acf-data/popular_categories",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "blog-categories" }
    );
}

export async function getBlogEditorChoice() {
    return fetchWP<any>(
        "/gvm/v1/pages/211/acf-data/editor_choice",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "blog" }
    );
}