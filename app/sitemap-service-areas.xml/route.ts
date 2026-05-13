import { NextResponse } from "next/server";
import { getServiceAreasUrls, buildUrlsetXml } from "@/lib/sitemap-data";

export const revalidate = 3600;

export async function GET() {
    return new NextResponse(buildUrlsetXml(await getServiceAreasUrls()), {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}