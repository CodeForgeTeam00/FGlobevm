import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    (await draftMode()).disable();

    const slug = request.nextUrl.searchParams.get("slug") || "";
    const type = request.nextUrl.searchParams.get("type") || "post";

    const TYPE_ROUTES: Record<string, string> = {
        post: "/blog",
        services: "/services",
        service_area_page: "/service-area",
        page: "",
    };

    const prefix = TYPE_ROUTES[type] ?? "/blog";
    redirect(slug ? `${prefix}/${slug}` : "/");
}