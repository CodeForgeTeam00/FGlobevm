import { NextRequest } from "next/server";

const WP_BASE = process.env.WORDPRESS_API_URL;

export async function GET(request: NextRequest) {
    const endpoint = request.nextUrl.searchParams.get("endpoint");

    if (!endpoint) {
        return Response.json({ error: "Missing endpoint param" }, { status: 400 });
    }

    try {
        const url = `${WP_BASE}${endpoint}`;
        console.log("WP PROXY:", url);

        const res = await fetch(url, {
            cache: "no-store",
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        const data = await res.json();
        return Response.json(data);
    } catch (e: any) {
        return Response.json(
            { error: "WP unreachable", detail: e.message },
            { status: 500 }
        );
    }
}