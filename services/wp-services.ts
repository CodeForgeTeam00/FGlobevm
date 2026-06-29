import { fetchWP } from "@/lib/api";
import { WPService , ServicePageData } from "@/types/wp-services";
import { CategoryServicePageData } from "@/types/wp-services";
import type { NavCategory } from "@/types/wp-options";
export async function getAllServices() {
    return fetchWP<WPService[]>(
        "/wp/v2/services?_fields=id,slug,title,acf&per_page=12",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "services" }
    );
}
export async function getServicePage(slug: string) {
    return fetchWP<ServicePageData>(
        `/gvm/v1/service_page/${slug}`,
        { strategy: { type: "isr", revalidate: 86400 }, tag: "services" }
    );
}
export async function getCategoryService(slug: string) {
    return fetchWP<CategoryServicePageData>(
        `/gvm/v1/category_service/${slug}`,
        { strategy: { type: "isr", revalidate: 86400 }, tag: "services" }
    );
}
