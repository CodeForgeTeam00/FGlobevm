// services/wp-posts.ts

import { fetchWP } from '@/lib/api';
import { BlogApiItem } from "@/types/blog";

type BlogsResponse = {
    posts: BlogApiItem[];
    pagination: {
        totalPosts: number;
        totalPages: number;
        currentPage: number;
        perPage: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

type GetBlogsParams = {
    page?: number;
    per_page?: number;
    category_slug?: string;
};

export async function getBlogs(params?: GetBlogsParams) {
    const query = new URLSearchParams();

    if (params?.page) query.append('page', String(params.page));
    if (params?.per_page) query.append('per_page', String(params.per_page));
    if (params?.category_slug) query.append('category_slug', params.category_slug);

    const queryString = query.toString();

    return fetchWP<BlogsResponse>(
        `/gvm/v1/posts${queryString ? `?${queryString}` : ''}`,
        ['posts']
    );
}