import { fetchWP } from "@/lib/api";
import {
    GlobalOptions,
    HeaderSettings,
    FooterSettings,
    SocialMedia,
    CPTHeaderItem,
} from "@/types/wp-options";

export async function getGlobalOptions() {
    return fetchWP<GlobalOptions>(
        "/gvm/v1/pages/62/acf-data/",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}

export async function getHeaderSettings() {
    return fetchWP<HeaderSettings>(
        "/gvm/v1/options/header_settings",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "header" }
    );
}

export async function getFooterSettings() {
    return fetchWP<FooterSettings>(
        "/gvm/v1/options/footer_settings",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}

export async function getSocialMedia() {
    return fetchWP<SocialMedia>(
        "/gvm/v1/options/social_media",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}

/**
 * Header info for Service Pages - used in main nav dropdown
 */
export async function getServicePagesHeaderInfo() {
    return fetchWP<CPTHeaderItem[]>(
        "/gvm/v1/service_page?header_info",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "header" }
    );
}

/**
 * Header info for Service Area Pages - used in main nav dropdown
 */
export async function getServiceAreaPagesHeaderInfo() {
    return fetchWP<CPTHeaderItem[]>(
        "/gvm/v1/service_area_page?header_info",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "header" }
    );
}