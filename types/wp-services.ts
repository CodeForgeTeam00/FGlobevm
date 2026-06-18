import {WPImage} from "@/types/wp-common";

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
import type { YoastSEO } from "@/types/yoast";

export interface CategoryFeature {
    title: string;
    description: string;
}

export interface CategoryIconItem {
    icon: WPImage | null;
    title: string;
    description: string;
}

export interface CategoryTestimonial {
    name: string;
    description: string;
    star: string;
}

export interface CategoryServicePageData {
    id: number;
    name: string;
    slug: string;
    acf: {
        hero_section: {
            image: WPImage | null;
            label: string;
            title: string;
            description: string;
        };
        features_section: CategoryFeature[];
        services_section: {
            label: string;
            title: string;
            description: string;
            items: Card[];
        };
        process_section: {
            label: string;
            title: string;
            description: string;
            items: CategoryIconItem[];
        };
        industry_section: {
            label: string;
            title: string;
            description: string;
            items: CategoryIconItem[];
        };
        testemonial_section: {
            label: string;
            title: string;
            description: string;
            testemonial: CategoryTestimonial[];
        };
        faq_section: { question: string; answer: string }[];
    };
    yoast_head_json?: YoastSEO; // endpoint کتگوری فعلاً نمی‌دتش
}