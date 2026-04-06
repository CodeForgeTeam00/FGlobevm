// wp-options.ts
import { fetchWP } from '@/lib/api';
import { WPOptions } from '@/types/wordperess';

export async function getBlogEditorChoice() {
    return fetchWP<WPOptions>(
        '/gvm/v1/pages/211/acf-data/editor_choice',
        ['options']
    );
}