import { fetchWP } from "@/lib/api";
import { GlobalOptions } from "@/types/wp-options";

export async function getGlobalOptions() {
    return fetchWP<GlobalOptions>(
        "/wp/v2/pages/62?_fields=acf&acf_format=standard",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}