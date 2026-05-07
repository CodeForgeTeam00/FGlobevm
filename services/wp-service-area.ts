import { fetchWP } from "@/lib/api";
import { ServiceAreaPageData } from "@/types/wp-service-area";

export async function getServiceAreaPage(slug: string) {
    return fetchWP<ServiceAreaPageData[]>(
        `/gvm/v1/service_area_page/${slug}`,
        { strategy: { type: "isr", revalidate: 86400 }, tag: "services" }
    );
}