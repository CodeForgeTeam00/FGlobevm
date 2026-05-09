export interface YoastImage {
    url: string;
    width: number;
    height: number;
    alt: string;
}

export interface YoastRobots {
    index?: string;
    follow?: string;
    "max-snippet"?: string;
    "max-image-preview"?: string;
    "max-video-preview"?: string;
}

export interface YoastSEO {
    title?: string;
    description?: string;
    canonical?: string | null;
    focus_keyword?: string | null;
    robots?: YoastRobots;
    og_locale?: string;
    og_type?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string | null;
    og_site_name?: string;
    og_image?: YoastImage[];
    article_modified_time?: string;
    article_published_time?: string;
    twitter_card?: "summary" | "summary_large_image" | string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string | null;
    schema?: {
        "@context": string;
        "@graph": unknown[];
    };
}