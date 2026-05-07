import { fetchWP } from "@/lib/api";
import { GlobalOptions } from "@/types/wp-options";
import { AboutPageData } from "@/types/wp-about";

export async function getHomePage() {
    const pages = await fetchWP<GlobalOptions[]>(
        "/wp/v2/pages?slug=home&acf_format=standard",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "home" }
    );
    return pages?.[0] ?? null;
}

export async function getAboutPage() {
    return fetchWP<AboutPageData>(
        "/gvm/v1/pages/514/acf-data",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "about" }
    );
}