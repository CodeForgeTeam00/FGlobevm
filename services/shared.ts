import { fetchWP } from "@/lib/api";
import { FAQCategory } from "@/types/wp-options";

export async function getSeoBox(pageId: number, fieldName: string = "about_globevm_content") {
    return fetchWP<string>(
        `/gvm/v1/pages/${pageId}/acf-data/${fieldName}`,
        { strategy: { type: "isr", revalidate: 86400 }, tag: `seo-${pageId}` }
    );
}

export async function getFAQCategories() {
    return fetchWP<FAQCategory[]>(
        "/gvm/v1/pages/494/acf-data/faq_categories",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "faq" }
    );
}