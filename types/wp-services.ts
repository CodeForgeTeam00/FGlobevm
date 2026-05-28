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
export interface Card{
        slug: string;
        icon: { url: string; alt: string };
        title: string;
        description: string;
}
export interface ServicePageData {
    id: number;
    title: string;
    slug: string;
    acf: {
        hero_section: {
            label: string;
            title: string;
            description: string;
            key_features: Card[]
            image: { url: string; alt: string };
        };
        second_section: {
            label: string;
            title: string;
            description: string;
            offerings: Card[]
        }

        client_feedback:{
            label: string;
            description: string;
            title: string;
            comments: {
                avatar: { url: string; alt: string } | null;
                name: string;
                job: string;
                description: string;
                star: string;
            }[];
        }
        sub_services: {
            label: string;
            description: string;
            title: string;
            add_service: Card[]
        },
        faq_box:{
            title: string;
            description: string;
            faq: {
                question: string;
                answer: string;
            }[];
        }
    };
}