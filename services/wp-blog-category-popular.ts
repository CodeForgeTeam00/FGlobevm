// wp-posts.ts
import { fetchWP } from '@/lib/api';

export async function getBlogCategoryPopular() {
    return fetchWP<any[]>(
        '/gvm/v1/pages/211/acf-data/popular_categories',
        ['post']
    );
}