export async function fetchWP<T>(endpoint: string, tags: string[]): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    const res = await fetch(`${baseUrl}${endpoint}`, {
        // ✅ FIX: Attach the tags for On-Demand ISR.
        // This caches the data until revalidateTag() is called with one of these tags.
        next: { tags: tags }
    });

    // You will only see this log when the cache is empty or freshly revalidated!
    console.log("Fetching from WordPress:", Date.now(), "| Tags:", tags);

    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}