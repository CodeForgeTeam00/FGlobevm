import { SITE } from "./site-config";

export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: SITE.logo,
        email: SITE.email,
        telephone: SITE.telephone,
        address: { "@type": "PostalAddress", ...SITE.address },
        sameAs: SITE.sameAs,
    };
}

export function webPageSchema(params: {
    title: string;
    url: string;
    description: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: params.title,
        url: params.url,
        description: params.description,
    };
}

export function articleSchema(params: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    image?: string;
    authorName?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: params.headline,
        description: params.description,
        datePublished: params.datePublished,
        dateModified: params.dateModified,
        ...(params.image && { image: params.image }),
        author: {
            "@type": "Organization",
            name: params.authorName || SITE.name,
        },
        publisher: {
            "@type": "Organization",
            name: SITE.name,
            logo: { "@type": "ImageObject", url: SITE.logo },
        },
    };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}