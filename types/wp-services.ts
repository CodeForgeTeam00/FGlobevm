export interface WPService {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    acf: {
        description: string;
    };
}