import { fetchWP } from "@/lib/api";
import { GlobalOptions } from "@/types/wp-options";

export async function getGlobalOptions() {
    return fetchWP<GlobalOptions>(
        "/gvm/v1/pages/62/acf-data/",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}