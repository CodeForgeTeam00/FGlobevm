import { fetchWP } from "@/lib/api";
import { AboutPageData } from "@/types/wp-about";

export async function getAboutPage() {
    return fetchWP<AboutPageData>(
        "/gvm/v1/pages/514/acf-data",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "about" }
    );
}


export async function getContactPage() {
    return fetchWP<any>(
        "/gvm/v1/pages/533/acf-data",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "contact" }
    );
}