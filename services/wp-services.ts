// wp-services.ts
import { fetchWP } from '@/lib/api';
    import { WPService} from '@/types/wordperess';
    export async function getAllServices() {
        return fetchWP<WPService[]>(
            '/wp/v2/services?_fields=id,slug,title,acf&_embed&per_page=12',
            ['services']
        );
    }
