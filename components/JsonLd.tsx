import type { JsonLdGraph } from '@/lib/schema/builders';

/**
 * components/JsonLd.tsx
 * Renders one JSON-LD graph into the server HTML (Server Component).
 * Use a native <script> tag, not next/script, so the markup is in the initial HTML.
 */
export function JsonLd({ data }: { data: JsonLdGraph }) {
    return (
        <script
            type="application/ld+json"
            // "<" is escaped so text inside the data can never close the script tag (XSS guard from the Next.js docs).
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}