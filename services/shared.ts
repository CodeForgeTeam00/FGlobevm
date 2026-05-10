import { fetchWP } from "@/lib/api";
import { FAQPageData} from "@/types/wp-options";

export async function getSeoBox(pageId: number, fieldName: string = "seo-box") {
    return fetchWP<string>(
        `/gvm/v1/pages/${pageId}/acf-data/${fieldName}`,
        { strategy: { type: "isr", revalidate: 86400 }, tag: `seo-${pageId}` }
    );
}

export async function getFAQCategories() {
    return fetchWP<FAQPageData>(
        "/gvm/v1/pages/494/acf-data",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "faq" }
    );
}