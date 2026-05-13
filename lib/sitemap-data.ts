import { fetchWP } from "@/lib/api";

export const BASE = "https://www.globevm.com";

export const CONFIG = {
    pages: {
        items: [
            { path: "/",            changeFrequency: "weekly",  priority: 1.0 },
            { path: "/about-us/",   changeFrequency: "monthly", priority: 0.8 },
            { path: "/contact-us/", changeFrequency: "monthly", priority: 0.7 },
            { path: "/faq/",        changeFrequency: "monthly", priority: 0.6 },
            { path: "/blog/",       changeFrequency: "daily",   priority: 0.9 },
        ],
    },
    posts: { changeFrequency: "weekly", priority: 0.6, excludeNoindex: true },
    categories: { changeFrequency: "weekly", priority: 0.5, excludeSlugs: ["uncategorized", "test6"] },
    services: { urlPrefix: "/services", changeFrequency: "monthly", priority: 0.8, excludeNoindex: true },
    serviceAreas: {urlPrefix: "/service-area", changeFrequency: "monthly", priority: 0.7, excludeNoindex: true,},
};

export interface SitemapUrl {
    url: string;
    lastModified?: Date;
    changeFrequency: string;
    priority: number;
}

interface YoastRobots {
    robots?: { index?: string };
    article_modified_time?: string;
}

interface PostRaw { slug?: string; date?: string; modified?: string; yoast_head_json?: YoastRobots; }
interface CategoryRaw { slug: string; parent: number; }
interface ServiceRaw { slug?: string; yoast_head_json?: YoastRobots; }

function isIndexable(item: { yoast_head_json?: YoastRobots }): boolean {
    const idx = item.yoast_head_json?.robots?.index?.toLowerCase() ?? "";
    return !idx.includes("noindex");
}

function getLastModified(item: ServiceRaw | PostRaw): Date | undefined {
    const y = item.yoast_head_json?.article_modified_time;
    if (y) return new Date(y);
    if ("modified" in item && item.modified) return new Date(item.modified);
    if ("date" in item && item.date) return new Date(item.date);
    return undefined;
}

export async function getPagesUrls(): Promise<SitemapUrl[]> {
    return CONFIG.pages.items.map((p) => ({
        url: `${BASE}${p.path}`,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
    }));
}

export async function getPostsUrls(): Promise<SitemapUrl[]> {
    try {
        const data = await fetchWP<{ posts: PostRaw[] }>(
            "/gvm/v1/posts?per_page=100",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-posts" }
        );
        if (!data?.posts) return [];
        return data.posts
            .filter((p) => p.slug)
            .filter((p) => CONFIG.posts.excludeNoindex ? isIndexable(p) : true)
            .map((p) => ({
                url: `${BASE}/blog/${p.slug}/`,
                lastModified: getLastModified(p),
                changeFrequency: CONFIG.posts.changeFrequency,
                priority: CONFIG.posts.priority,
            }));
    } catch (err) {
        console.error("Sitemap posts fetch failed:", err);
        return [];
    }
}

export async function getCategoriesUrls(): Promise<SitemapUrl[]> {
    try {
        const cats = await fetchWP<CategoryRaw[]>(
            "/wp/v2/categories?per_page=100",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-cats" }
        );
        if (!cats) return [];
        return cats
            .filter((c) => c.parent === 0)
            .filter((c) => !CONFIG.categories.excludeSlugs.includes(c.slug))
            .map((c) => ({
                url: `${BASE}/blog/category/${c.slug}/`,
                changeFrequency: CONFIG.categories.changeFrequency,
                priority: CONFIG.categories.priority,
            }));
    } catch (err) {
        console.error("Sitemap categories fetch failed:", err);
        return [];
    }
}

export async function getServicesUrls(): Promise<SitemapUrl[]> {
    try {
        const services = await fetchWP<ServiceRaw[]>(
            "/gvm/v1/service_page",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-services" }
        );
        if (!Array.isArray(services)) return [];
        return services
            .filter((s) => s.slug)
            .filter((s) => CONFIG.services.excludeNoindex ? isIndexable(s) : true)
            .map((s) => ({
                url: `${BASE}${CONFIG.services.urlPrefix}/${s.slug}/`,
                lastModified: getLastModified(s),
                changeFrequency: CONFIG.services.changeFrequency,
                priority: CONFIG.services.priority,
            }));
    } catch (err) {
        console.error("Sitemap services fetch failed:", err);
        return [];
    }
}
export async function getServiceAreasUrls(): Promise<SitemapUrl[]> {
    try {
        const areas = await fetchWP<ServiceRaw[]>(
            "/gvm/v1/service_area_page",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-service-areas" }
        );
        if (!Array.isArray(areas)) return [];
        return areas
            .filter((a) => a.slug)
            .filter((a) => CONFIG.serviceAreas.excludeNoindex ? isIndexable(a) : true)
            .map((a) => ({
                url: `${BASE}${CONFIG.serviceAreas.urlPrefix}/${a.slug}/`,
                lastModified: getLastModified(a),
                changeFrequency: CONFIG.serviceAreas.changeFrequency,
                priority: CONFIG.serviceAreas.priority,
            }));
    } catch (err) {
        console.error("Sitemap service areas fetch failed:", err);
        return [];
    }
}
export function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function buildUrlsetXml(urls: SitemapUrl[]): string {
    const urlBlocks = urls.map((u) => {
        const parts = [`    <loc>${escapeXml(u.url)}</loc>`];
        if (u.lastModified) parts.push(`    <lastmod>${u.lastModified.toISOString()}</lastmod>`);
        parts.push(`    <changefreq>${u.changeFrequency}</changefreq>`);
        parts.push(`    <priority>${u.priority}</priority>`);
        return `  <url>\n${parts.join("\n")}\n  </url>`;
    }).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlBlocks}
</urlset>`;
}