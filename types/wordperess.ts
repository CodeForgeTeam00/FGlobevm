// Shared ACF Types
export interface ACFImage {
    url: string;
    alt: string;
    sizes: {
        thumbnail: string;
        medium: string;
        large: string;
        'medium_large'?: string;
    };
}

export interface ACFLink {
    title: string;
    url: string;
    target: string;
}

// Global Options (Header/Footer)
export interface WPOptions {
    acf: {
        footer_phone: string;
        footer_email: string;
        // Add your social links here
        social_linkedin?: string;
        social_instagram?: string;
    };
}

// Posts (Blog)
export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    };
}

// Custom Post Type: Services
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

// Pages (Home, etc.)
export interface WPPage {
    id: number;
    slug: string;
    title: { rendered: string };
    acf: any; // You can make this more specific for the Home Page later
}