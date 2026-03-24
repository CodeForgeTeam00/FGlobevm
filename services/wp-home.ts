// wp-options.ts
import { fetchWP } from '@/lib/api';
import { WPOptions } from '@/types/wordperess';

export async function getGlobalOptions() {
    return fetchWP<WPOptions>(
        '/wp/v2/pages/62?_fields=acf&acf_format=standard',
        ['options']
    );
}