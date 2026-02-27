export async function fetchWP<T>(endpoint: string, tags: string[]): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: 'no-store' // 🚨 disable all caching
    });
    console.log("Fetching from WordPress:", Date.now());
    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}