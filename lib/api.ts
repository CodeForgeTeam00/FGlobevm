type FetchStrategy =
    | { type: "isr"; revalidate: number }
    | { type: "ssg" }
    | { type: "ssr" };

interface FetchWPOptions {
    strategy?: FetchStrategy;
    timeout?: number;
    tag?: string;
}

export async function fetchWP<T>(
    endpoint: string,
    options?: FetchWPOptions
): Promise<T | null> {
    const baseUrl = process.env.WORDPRESS_API_URL;

    if (!baseUrl) {
        console.error("WORDPRESS_API_URL is not defined");
        return null;
    }

    const { strategy = { type: "isr", revalidate: 3600 }, timeout = 15000 } =
    options ?? {};

    const fetchOptions: RequestInit & {
        next?: { revalidate?: number | false; tags?: string[] };
    } = {
        headers: {
            "User-Agent": "GlobeVM/1.0",
            Accept: "application/json",
        },
    };

    switch (strategy.type) {
        case "isr":
            fetchOptions.next = {
                revalidate: strategy.revalidate,
                tags: options?.tag ? [options.tag] : undefined,
            };
            break;
        case "ssg":
            fetchOptions.next = {
                revalidate: false,
                tags: options?.tag ? [options.tag] : undefined,
            };
            break;
        case "ssr":
            fetchOptions.cache = "no-store";
            break;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    fetchOptions.signal = controller.signal;

    try {
        const res = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
        clearTimeout(timer);

        if (!res.ok) {
            console.error(`WP Error: ${res.status} on ${endpoint}`);
            return null;
        }

        return (await res.json()) as T;
    } catch (err) {
        clearTimeout(timer);
        if (err instanceof DOMException && err.name === "AbortError") {
            console.error(`WP Timeout: ${endpoint} (${timeout}ms)`);
        } else {
            console.error(`WP Fetch Failed: ${endpoint}`, err);
        }
        return null;
    }
}