import { fetchWP } from "./api";

export async function getPreviewById(id: string) {
    const baseUrl = process.env.WORDPRESS_API_URL;

    const res = await fetch(
        `${baseUrl}/gvm/v1/preview/${id}?secret=${process.env.REVALIDATE_SECRET}`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
}