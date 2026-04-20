import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

async function handleRevalidate(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return Response.json({ message: "Invalid secret" }, { status: 401 });
    }

    const tag = request.nextUrl.searchParams.get("tag");

    if (!tag) {
        return Response.json({ message: "Missing tag" }, { status: 400 });
    }

    revalidateTag(tag, "max");

    if (tag === "blog") {
        revalidatePath("/blog");
        revalidatePath("/");
    }
    if (tag === "services") {
        revalidatePath("/services");
        revalidatePath("/");
    }
    if (tag === "options") {
        revalidatePath("/");
        revalidatePath("/faq");
    }

    return Response.json({
        revalidated: true,
        tag,
        now: Date.now(),
    });
}

export async function GET(request: NextRequest) {
    return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
    return handleRevalidate(request);
}