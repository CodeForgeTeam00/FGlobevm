"use client";

import { useEffect, useRef } from "react";

interface Props {
    postId: number;
}

const WP_BASE = "https://wordpress-1592566-6232100.cloudwaysapps.com";

/**
 * Fires a single POST to /track-view/{postId} when the post page mounts.
 *
 * Behavior:
 * - Fires once per mount (StrictMode double-mount in dev is guarded with a ref).
 * - Failure is swallowed silently so a view tracking error never breaks the page.
 * - Renders nothing.
 *
 * Backend handles duplicate detection (per IP, 24h window).
 */
export default function ViewTracker({ postId }: Props) {
    const sentRef = useRef(false);

    useEffect(() => {
        if (sentRef.current) return;
        if (!postId || typeof postId !== "number") return;

        sentRef.current = true;

        fetch(`${WP_BASE}/wp-json/gvm/v1/track-view/${postId}`, {
            method: "POST",
            keepalive: true,
        }).catch(() => {
            // Silent fail — analytics should never break the page
        });
    }, [postId]);

    return null;
}