import { fetchWP } from '@/lib/api';
import { WPOptions } from '@/types/wordperess';

export async function getGlobalOptions() {
    // This uses the special ACF Options endpoint
    return fetchWP<WPOptions>(
        '/acf/v3/options/options',
    );
}