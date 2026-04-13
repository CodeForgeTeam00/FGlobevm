import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return Response.json({ message: "Invalid secret" }, { status: 401 });
    }

    const tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
        return Response.json({ message: "Missing tag" }, { status: 400 });
    }

    revalidateTag(tag, "max");

    return Response.json({
        revalidated: true,
        tag,
        now: Date.now(),
    });
}