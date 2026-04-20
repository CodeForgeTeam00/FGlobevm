import { WPImage } from "./wp-common";

export interface HeroSectionImages {
    hero_primary_image: WPImage;
    hero_secondary_image: WPImage;
}

export interface Testimonial {
    description: string;
    the_author: string;
    author_job: string;
    the_star: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQCategory {
    category_name: string;
    category_icon: WPImage | null;
    faqs: FAQItem[];
}

export interface GlobalOptions {
    hero_section_images: HeroSectionImages;
    background_image: WPImage;
    slider_section_image: WPImage;
    comment_field: Testimonial[];
    faq: FAQItem[];
}
export interface HeaderNavChild {
    name: string;
    slug: string;
}

export interface HeaderNavItem {
    name: string;
    slug: string;
    children: HeaderNavChild[] | false;
}

export interface HeaderSettings {
    btn_num: {
        number: string;
        url: string;
    };
    navigation: HeaderNavItem[];
}