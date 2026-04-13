import { WPImage } from "@/types/wp-common";
import { FAQItem } from "@/types/wp-options";

// mapper output type
export interface MappedOptions {
    hero: {
        primaryImage: WPImage;
        secondaryImage: WPImage;
    };
    backgroundImage: WPImage;
    sliderImage: WPImage;
    comments: {
        description: string;
        author: string;
        job: string;
        stars: number;
    }[];
    faq: FAQItem[];
}

// component prop types (temporary - later move to each component)
export interface HeroSectionProps {
    primaryImageUrl: string;
    secondaryImageUrl: string;
    primaryAlt?: string;
    secondaryAlt?: string;
}