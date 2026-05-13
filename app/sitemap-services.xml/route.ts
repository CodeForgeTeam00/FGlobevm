import { NextResponse } from "next/server";
import { getServicesUrls, buildUrlsetXml } from "@/lib/sitemap-data";

export const revalidate = 3600;

export async function GET() {
    return new NextResponse(buildUrlsetXml(await getServicesUrls()), {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}