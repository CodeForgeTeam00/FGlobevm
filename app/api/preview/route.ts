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
    const secret = request.nextUrl.searchParams.get("secret");
    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");
    const type = request.nextUrl.searchParams.get("type") || "post";

    if (secret !== process.env.PREVIEW_SECRET) {
        return Response.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!id) {
        return Response.json({ message: "Missing id" }, { status: 400 });
    }

    (await draftMode()).enable();

    const prefix = TYPE_ROUTES[type] ?? "/blog";
    const slugPart = slug || `preview-${id}`;
    redirect(`${prefix}/${slugPart}?preview=true&id=${id}`);
}