import { NextResponse } from "next/server";
import { getCategoriesUrls, buildUrlsetXml } from "@/lib/sitemap-data";

export const revalidate = 3600;

export async function GET() {
    return new NextResponse(buildUrlsetXml(await getCategoriesUrls()), {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}