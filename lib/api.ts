export async function fetchWP<T>(endpoint: string, tags: string[]): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

    // Example: fetchWP('/wp/v2/services?_fields=id,slug,title,acf&_embed', ['services'])
    const res = await fetch(`${baseUrl}${endpoint}`, {
        next: {
            tags: tags,       // Tag this request for On-Demand ISR
            revalidate: 3600  // Fallback Time-based ISR (e.g., revalidate every hour)
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.statusText}`);
    }

    // The REST API conversion happens here, returning your defined Array or Object
    return res.json() as Promise<T>;
}