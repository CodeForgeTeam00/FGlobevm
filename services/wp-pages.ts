import { fetchWP } from "@/lib/api";
import { GlobalOptions } from "@/types/wp-options";

export async function getHomePage() {
    const pages = await fetchWP<GlobalOptions[]>(
        "/wp/v2/pages?slug=home&acf_format=standard",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "home" }
    );

    return pages?.[0] ?? null;
}