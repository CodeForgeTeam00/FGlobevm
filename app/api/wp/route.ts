import { NextRequest } from "next/server";

const WP_BASE = process.env.WORDPRESS_API_URL;

export async function GET(request: NextRequest) {
    const endpoint = request.nextUrl.searchParams.get("endpoint");

    if (!endpoint) {
        return Response.json({ error: "Missing endpoint param" }, { status: 400 });
    }

    try {
        const url = `${WP_BASE}${endpoint}`;
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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { endpoint, data } = body;

        if (!endpoint) {
            return Response.json({ error: "Missing endpoint" }, { status: 400 });
        }

        const res = await fetch(`${WP_BASE}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        return Response.json(result, { status: res.status });
    } catch (e: any) {
        return Response.json(
            { error: "WP unreachable", detail: e.message },
            { status: 500 }
        );
    }
}