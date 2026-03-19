    import { fetchWP } from '@/lib/api';
    import { WPService} from '@/types/wordperess';

    export async function getAllServices() {
        return fetchWP<WPService[]>(
            '/wp/v2/services?_fields=id,slug,title,acf&_embed&acf_format=standard',
            ['services']
        );
    }
