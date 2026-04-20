import { fetchWP } from "@/lib/api";
import { GlobalOptions  , HeaderSettings} from "@/types/wp-options";
export async function getHeaderSettings() {
    return fetchWP<HeaderSettings>(
        "/gvm/v1/options/header_settings",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "header" }
    );
}
export async function getGlobalOptions() {
    return fetchWP<GlobalOptions>(
        "/gvm/v1/pages/62/acf-data/",
        { strategy: { type: "isr", revalidate: 86400 }, tag: "options" }
    );
}