// lib/yoast-to-metadata.ts
import type { Metadata } from "next";
import type { YoastSEO } from "@/types/yoast";

interface YoastMappingOptions {
    /**
     * Override canonical URL — recommended for headless setup.
     * Yoast returns the WordPress backend URL by default; here we replace it
     * with the actual frontend URL.
     */
    canonicalOverride?: string;
}

export function yoastToMetadata(
    yoast: YoastSEO | null | undefined,
    options: YoastMappingOptions = {}
): Metadata {
    if (!yoast) {
        return {};
    }

    const { canonicalOverride } = options;
    const canonical = canonicalOverride ?? yoast.canonical ?? undefined;

    return {
        title: yoast.title,
        description: yoast.description,

        alternates: {
            canonical,
        },

        // NOTE: robots field intentionally NOT mapped from Yoast right now.
        // The site is currently in noindex mode (set in layout.tsx + next.config.ts).
        // When you're ready to go live, remove the layout-level noindex and
        // uncomment the robots block below.
        //
        // robots: {
        //     index: !yoast.robots?.index?.toLowerCase().includes("noindex"),
        //     follow: !yoast.robots?.follow?.toLowerCase().includes("nofollow"),
        // },

        openGraph: {
            type: (yoast.og_type as "website" | "article") ?? "website",
            locale: yoast.og_locale,
            siteName: yoast.og_site_name,
            title: yoast.og_title ?? yoast.title,
            description: yoast.og_description ?? yoast.description,
            url: canonical,
            images: yoast.og_image?.length
                ? yoast.og_image.map((img) => ({
                    url: img.url,
                    width: img.width,
                    height: img.height,
                    alt: img.alt,
                }))
                : undefined,
        },

        twitter: {
            card:
                (yoast.twitter_card as "summary" | "summary_large_image") ??
                "summary_large_image",
            title: yoast.twitter_title ?? yoast.og_title ?? yoast.title,
            description:
                yoast.twitter_description ??
                yoast.og_description ??
                yoast.description,
            images: yoast.twitter_image ? [yoast.twitter_image] : undefined,
        },
    };
}