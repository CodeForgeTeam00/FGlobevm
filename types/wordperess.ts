
export interface heroSectionImages {
    hero_primary_image: string;
    hero_secondary_image: string;
}

export interface WPOptions {
    acf: {

        hero_section_images:heroSectionImages;
        background_image: string;
        slider_section_image: string;
        footer_phone: string;
        footer_email: string;
        social_linkedin?: string;
        social_instagram?: string;
        comment_field: Array<{
            description: string;
            the_author: string;
            author_job: string;
            the_star: string;
        }>;

        faq: Array<{
            question: string;
            answer: string;
        }>;
    };
}


export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    };
}

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


export interface WPPage {
    id: number;
    slug: string;
    title: { rendered: string };
    acf: any; // You can make this more specific for the Home Page later
}
