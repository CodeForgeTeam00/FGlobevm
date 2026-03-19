// src/services/wp-posts.ts
import { fetchWP } from '@/lib/api';

export async function getRecentPosts() {
    // Returns an Array of post Objects
    return fetchWP(
        '/wp/v2/posts?_embed&_fields=title,date,_links,_embedded&per_page=4',
        ['posts'] // <-- The crucial ISR tag
    );
}