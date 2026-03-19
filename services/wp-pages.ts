import { fetchWP } from '@/lib/api';
import { WPPage } from '@/types/wordperess';

export async function getHomePage() {
    // We filter for the 'home' slug or ID
    const pages = await fetchWP<WPPage[]>(
        '/wp/v2/pages?slug=home&acf_format=standard',
    );
    return pages[0]; // Return the first object in the array
}
