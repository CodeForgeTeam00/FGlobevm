import { NextResponse } from "next/server";
import { BASE, escapeXml } from "@/lib/sitemap-data";

const SECTIONS = ["pages", "posts", "categories", "services","service-areas"];

export const revalidate = 3600;

export async function GET() {
    const now = new Date().toISOString();
    const items = SECTIONS.map((s) => `  <sitemap>
    <loc>${escapeXml(`${BASE}/sitemap-${s}.xml`)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
${items}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}