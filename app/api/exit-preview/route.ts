import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const TYPE_ROUTES: Record<string, string> = {
    post: "/blog",
    services: "/services",
    services_page: "/services",
    service_area: "/service-area",
    service_area_page: "/service-area",
    page: "",
};

export async function GET(request: NextRequest) {
    (await draftMode()).disable();

    const slug = request.nextUrl.searchParams.get("slug") || "";
    const type = request.nextUrl.searchParams.get("type") || "post";

    const prefix = TYPE_ROUTES[type] ?? "/blog";
    redirect(slug ? `${prefix}/${slug}` : "/");
}