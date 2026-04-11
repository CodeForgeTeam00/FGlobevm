import { fetchWP } from '@/lib/api';

export async function getBlogId(slug: string) {
    return fetchWP(
        `/gvm/v1/blog/${slug}`,
        ['blog']
    );
}