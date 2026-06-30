import { fetchWP } from "@/lib/api";

export const BASE = "https://www.globevm.com";

const BuiLD_TIME = new Date();

export const CONFIG = {
    pages: {
        items: [
            { path: "/",            priority: 1.0 },
            { path: "/about-us/",   priority: 0.8 },
            { path: "/contact-us/", priority: 0.7 },
            { path: "/faq/",        priority: 0.6 },
            { path: "/blog/",       priority: 0.9 },
        ],
    },
    posts: {
        priority: 0.6,
        excludeNoindex: true,
    },
    categories: {
        priority: 0.5,
        excludeSlugs: ["uncategorized", "test6"],
    },
    services: {
        urlPrefix: "/services",
        priority: 0.8,
        excludeNoindex: true,
    },
    serviceAreas: {
        urlPrefix: "/service-area",
        priority: 0.7,
        excludeNoindex: true,
    },
};

export interface SitemapUrl {
    url: string;
    lastModified?: Date;
    priority: number;
}

interface YoastRobots {
    robots?: { index?: string };
    article_modified_time?: string;
}

interface PostRaw {
    slug?: string;
    date?: string;
    modified?: string;
    yoast_head_json?: YoastRobots;
}

interface CategoryRaw {
    slug: string;
    parent: number;
}

interface ServiceRaw {
    slug?: string;
    yoast_head_json?: YoastRobots;
}

interface NavServiceRaw {
    name: string;
    slug: string;
}

interface NavCategoryRaw {
    name: string;
    slug: string;
    services: NavServiceRaw[];
}

interface ServicePageRaw {
    slug?: string;
    category?: { slug: string; name: string } | null;
    yoast_head_json?: YoastRobots;
}

function isIndexable(item: { yoast_head_json?: YoastRobots }): boolean {
    const idx = item.yoast_head_json?.robots?.index?.toLowerCase() ?? "";
    return !idx.includes("noindex");
}

function getLastModified(item: ServiceRaw | PostRaw | ServicePageRaw): Date | undefined {
    const y = item.yoast_head_json?.article_modified_time;
    if (y) return new Date(y);
    if ("modified" in item && item.modified) return new Date(item.modified);
    if ("date" in item && item.date) return new Date(item.date);
    return undefined;
}

function formatSitemapDate(date: Date): string {
    return date.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export async function getPagesUrls(): Promise<SitemapUrl[]> {
    return CONFIG.pages.items.map((p) => ({
        url: `${BASE}${p.path}`,
        lastModified: BuiLD_TIME,
        priority: p.priority,
    }));
}

export async function getPostsUrls(): Promise<SitemapUrl[]> {
    try {
        const data = await fetchWP<any[]>(
            "/wp/v2/posts?per_page=100&_fields=slug,modified_gmt,yoast_head_json",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-posts" }
        );
        if (!data || !Array.isArray(data)) return [];
        return data
            .filter((p) => p.slug)
            .filter((p) => CONFIG.posts.excludeNoindex ? isIndexable(p) : true)
            .map((p) => {
                const yoastMod = p.yoast_head_json?.article_modified_time;
                const modified = yoastMod || p.modified_gmt;
                return {
                    url: `${BASE}/blog/${p.slug}/`,
                    lastModified: new Date(modified),
                    priority: CONFIG.posts.priority,
                };
            });
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
                lastModified: BuiLD_TIME,
                priority: CONFIG.categories.priority,
            }));
    } catch (err) {
        console.error("Sitemap categories fetch failed:", err);
        return [];
    }
}

export async function getServicesUrls(): Promise<SitemapUrl[]> {
    const urls: SitemapUrl[] = [];
    const seenServiceSlugs = new Set<string>();

    // STEP 1: categories + nested services from service_navigation endpoint
    try {
        const nav = await fetchWP<NavCategoryRaw[]>(
            "/gvm/v1/service_navigation",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-services-nav" }
        );

        if (Array.isArray(nav)) {
            for (const category of nav) {
                if (!category.slug) continue;

                // Category landing page (level 1)
                urls.push({
                    url: `${BASE}${CONFIG.services.urlPrefix}/${category.slug}/`,
                    lastModified: BuiLD_TIME,
                    priority: CONFIG.services.priority,
                });

                // Nested service pages (level 2)
                if (Array.isArray(category.services)) {
                    for (const service of category.services) {
                        if (!service.slug) continue;
                        seenServiceSlugs.add(service.slug);
                        urls.push({
                            url: `${BASE}${CONFIG.services.urlPrefix}/${category.slug}/${service.slug}/`,
                            lastModified: BuiLD_TIME,
                            priority: CONFIG.services.priority,
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.error("Sitemap service_navigation fetch failed:", err);
    }

    // STEP 2: orphan services (no category) — pulled from flat service_page endpoint
    try {
        const services = await fetchWP<ServicePageRaw[]>(
            "/gvm/v1/service_page",
            { strategy: { type: "isr", revalidate: 3600 }, tag: "sitemap-services-flat" }
        );

        if (Array.isArray(services)) {
            for (const s of services) {
                if (!s.slug) continue;
                if (CONFIG.services.excludeNoindex && !isIndexable(s)) continue;
                if (seenServiceSlugs.has(s.slug)) continue;

                if (s.category && s.category.slug) {
                    // Has category but didn't appear in nav (edge case) → use 2-level URL
                    urls.push({
                        url: `${BASE}${CONFIG.services.urlPrefix}/${s.category.slug}/${s.slug}/`,
                        lastModified: getLastModified(s),
                        priority: CONFIG.services.priority,
                    });
                } else {
                    // No category → legacy flat URL
                    urls.push({
                        url: `${BASE}${CONFIG.services.urlPrefix}/${s.slug}/`,
                        lastModified: getLastModified(s),
                        priority: CONFIG.services.priority,
                    });
                }
            }
        }
    } catch (err) {
        console.error("Sitemap service_page fetch failed:", err);
    }

    return urls;
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
        if (u.lastModified) parts.push(`    <lastmod>${formatSitemapDate(u.lastModified)}</lastmod>`);
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