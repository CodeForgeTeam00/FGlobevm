// wp-posts.ts
import { fetchWP } from '@/lib/api';

export async function getBlogSeoBox() {
    return fetchWP<any[]>(
        '/gvm/v1/pages/211/acf-data/about_globevm_content',
        ['post']
    );
}