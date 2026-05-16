import { WPImage } from "./wp-common";
import { FAQItem } from "./wp-options";
import {YoastSEO} from "@/types/yoast";
import {Card} from "@/types/wp-services";

export interface TeamMember {
    team_member_image: WPImage;
    team_member_name: string;
    team_members_job: string;
}

export interface AboutPageData {
    mid_section_image: WPImage;
    team_section: TeamMember[];
    cards: Card[];
    faq_section: FAQItem[];
    about_globevm: string;
    image: WPImage;
    yoast_head_json:YoastSEO;
}