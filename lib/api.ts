export async function fetchWP<T>(endpoint: string, tags: string[]): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    // Example: fetchWP('/wp/v2/services?_fields=id,slug,title,acf&_embed', ['services'])
    const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: 'no-store' // 🚨 disable all caching
    });
    console.log("Fetching from WordPress:", Date.now());
    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    // The REST API conversion happens here, returning your defined Array or Object
    return res.json() as Promise<T>;
}