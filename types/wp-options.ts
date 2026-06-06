import { WPImage } from "./wp-common";
import {getBusinessPartner} from "@/services/wp-options";
import {YoastSEO} from "@/types/yoast";

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
export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQCategory {
    category_name: string;
    icon: WPImage | null;
    faqs: FAQItem[];
}

export interface FAQPageData {
    faq_categories: FAQCategory[];
    image: { url: string | false; alt: string };
    yoast_head_json: YoastSEO;
}
export interface GlobalOptions {
    hero_section_images: HeroSectionImages;
    background_image: WPImage;
    image:WPImage;
    slider_section_image: WPImage;
    comment_field: Testimonial[];
    faq: FAQItem[];
    yoast_head_json: YoastSEO;
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

export interface SocialMedia {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
    linkedin?: string;
}

export interface FooterSettings {
    contact_us: {
        contact_email: string;
        btn_num: {
            number: string;
            url: string;
        };
    };
    description: string;
}

export interface CPTHeaderItem {
    header_title: string | null;
    slug: string;
}

export interface CPTCardItem {
    icon:WPImage | null;
    slug: string | null;
    title: string | null;
    description: string | null;
    id: string;
}

export interface BusinessPartner {
    logo:WPImage |  null
    url: string | null;
}