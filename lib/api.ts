export async function fetchWP<T>(
    endpoint: string,
    tags: string[]
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    if (!baseUrl) {
        throw new Error("Missing NEXT_PUBLIC_WORDPRESS_API_URL");
    }

    const res = await fetch(`${baseUrl}${endpoint}`, {
        next: { tags}
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    return res.json();
}