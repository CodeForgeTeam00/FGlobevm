import { WPImage } from "./wp-common";
import { FAQItem } from "./wp-options";

export interface TeamMember {
    team_member_image: WPImage;
    team_member_name: string;
    team_members_job: string;
}

export interface AboutPageData {
    mid_section_image: WPImage;
    team_section: TeamMember[];
    faq_section: FAQItem[];
    about_globevm: string;
    featured_image: string;
}