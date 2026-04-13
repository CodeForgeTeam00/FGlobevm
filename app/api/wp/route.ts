export async function GET() {
    try {
        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, 30000);

        const res = await fetch(
            "https://wordpress-1592566-6232100.cloudwaysapps.com/wp-json/",
            {
                signal: controller.signal,
                cache: "no-store",
                headers: {
                    "User-Agent": "Mozilla/5.0",
                },
            }
        );

        clearTimeout(timeout);

        const text = await res.text();

        return new Response(text, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e: any) {
        return new Response(
            JSON.stringify({
                error: "WP unreachable from Node",
                detail: e.message,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}