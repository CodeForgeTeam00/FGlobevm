/**
 * lib/schema/builders.ts
 * JSON-LD builders for www.globevm.com (Next.js App Router).
 *
 * 1. Every page outputs ONE <script type="application/ld+json"> holding ONE @graph.
 *    Render it with serializeJsonLd() so CMS text can never break out of the script tag.
 * 2. Nodes link with stable @id values: #organization, #website, #person-*, <url>#webpage,
 *    <url>#breadcrumb, <url>#service, <url>#article, <url>#primaryimage, <url>#faq, <url>#itemlist.
 * 3. Only visible content is marked up. Empty values, and objects left with nothing but an
 *    @type, are removed by compact().
 * 4. Lookups for config-defined pages (hubs, services, industries, areas, blog categories)
 *    throw on unknown paths, so a wrong slug fails the build instead of shipping bad markup.
 *    CMS-driven values (a post's category) only log a warning, so one bad post in WordPress
 *    never takes a live page down.
 */

import {
    ALL_DAYS,
    AREAS,
    AREA_ORDER,
    AREA_SERVICE_TYPE,
    AUTHOR_PAGES_LIVE,
    BACKEND_ORIGIN,
    BLOG_CATEGORIES,
    BUSINESS,
    IDS,
    INDUSTRIES,
    INDUSTRY_SERVICE_TYPE,
    MEDIA_ON_WWW,
    PAGES,
    PEOPLE,
    SERVICE_AREAS,
    SERVICE_HUBS,
    SITE_URL,
    type AreaKey,
    type PersonKey,
    type ServiceEntry,
} from './config';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type JsonLdNode = { [key: string]: unknown };

export interface JsonLdGraph {
    '@context': 'https://schema.org';
    '@graph': JsonLdNode[];
}

/** SEO title WITHOUT the " | GlobeVM" suffix, and the meta description. */
export interface PageMeta {
    title: string;
    description: string;
}

/** Plain-text question and answer, exactly as shown on the page. */
export interface FaqItem {
    question: string;
    answer: string;
}

export interface Crumb {
    name: string;
    path: string;
}

export interface ImageInput {
    url: string;
    width: number;
    height: number;
    alt?: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Absolute canonical URL with a trailing slash ("/" -> "https://www.globevm.com/"). */
export function absoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) return path;
    const withLead = path.startsWith('/') ? path : `/${path}`;
    const withTrail = withLead.endsWith('/') ? withLead : `${withLead}/`;
    return `${SITE_URL}${withTrail}`;
}

/** Remove the brand suffix from a WordPress SEO title ("X | GlobeVM | GlobeVM" -> "X"). */
export function cleanTitle(title: string): string {
    return title.replace(/(\s*\|\s*GlobeVM)+\s*$/i, '').trim();
}

/** Serve WordPress media from www once MEDIA_ON_WWW is true. */
export function mediaUrl(url: string): string {
    return MEDIA_ON_WWW ? url.replace(BACKEND_ORIGIN, SITE_URL) : url;
}

/**
 * Serialize a graph for <script type="application/ld+json">.
 * JSON.stringify does not escape "<", so WordPress text containing "</script>" could break
 * out of the tag (XSS). Replacing "<" with \u003c keeps the JSON identical for parsers.
 *
 * Usage:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
 */
export function serializeJsonLd(data: JsonLdGraph): string {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

const ref = (id: string): JsonLdNode => ({ '@id': id });
const pageId = (url: string) => `${url}#webpage`;
const authorPath = (key: PersonKey) => `/author/${PEOPLE[key].slug}/`;
const personId = (key: PersonKey) => `${SITE_URL}/#person-${PEOPLE[key].slug}`;

export function personUrl(key: PersonKey): string {
    return absoluteUrl(AUTHOR_PAGES_LIVE ? authorPath(key) : PAGES.about.path);
}

function founderKeys(): PersonKey[] {
    return (Object.keys(PEOPLE) as PersonKey[]).filter((key) => PEOPLE[key].isFounder);
}

/** Drop undefined, null, empty strings, empty arrays and @type-only objects, recursively. Keeps 0 and false. */
function compact<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map((item) => compact(item)).filter((item) => !isEmpty(item)) as unknown as T;
    }
    if (value !== null && typeof value === 'object') {
        const out: JsonLdNode = {};
        for (const [key, raw] of Object.entries(value as JsonLdNode)) {
            const cleaned = compact(raw);
            if (!isEmpty(cleaned)) out[key] = cleaned;
        }
        return out as T;
    }
    return value;
}

function isEmpty(value: unknown): boolean {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') {
        // An object that only states its type carries no data, e.g. { "@type": "Organization" }.
        const keys = Object.keys(value as object);
        return keys.length === 0 || keys.every((key) => key === '@type');
    }
    return false;
}

const HAS_ZONE = /([zZ]|[+-]\d{2}:?\d{2})$/;

/** Parse a date string. A value without a zone (WordPress *_gmt) is treated as UTC. */
function parseDate(value: string): Date {
    const v = value.trim();
    return new Date(HAS_ZONE.test(v) ? v : `${v.replace(' ', 'T')}Z`);
}

/**
 * ISO 8601 in UTC, e.g. "2026-06-13T00:30:00+00:00".
 * Pass WordPress *_gmt values (REST: date_gmt / modified_gmt).
 */
export function toIso(value: string): string {
    const date = parseDate(value);
    if (Number.isNaN(date.getTime())) throw new Error(`Invalid date: ${value}`);
    return date.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

/** dateModified can never be earlier than datePublished. */
function laterOf(publishedGmt: string, modifiedGmt: string): string {
    return parseDate(modifiedGmt).getTime() > parseDate(publishedGmt).getTime() ? modifiedGmt : publishedGmt;
}

export function graph(...nodes: Array<JsonLdNode | null | undefined | false>): JsonLdGraph {
    return {
        '@context': 'https://schema.org',
        '@graph': nodes
            .filter((node): node is JsonLdNode => Boolean(node))
            .map((node) => compact(node))
            .filter((node) => !isEmpty(node)),
    };
}

/* ------------------------------------------------------------------ */
/* Shared nodes                                                        */
/* ------------------------------------------------------------------ */

function areaNode(key: AreaKey): JsonLdNode {
    const area = AREAS[key];
    return { '@type': area.type, name: area.name, sameAs: area.sameAs };
}

/** The business. Same node on every page; founders are added on the About page only. */
export function organizationNode(options: { withFounders?: boolean } = {}): JsonLdNode {
    const b = BUSINESS;
    return {
        '@type': 'LocalBusiness',
        '@id': IDS.organization,
        name: b.name,
        alternateName: b.alternateName,
        legalName: b.legalName,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', '@id': IDS.logo, url: b.logoUrl, contentUrl: b.logoUrl, caption: b.name },
        image: ref(IDS.logo),
        description: b.description,
        telephone: b.telephone,
        email: b.email,
        address: { '@type': 'PostalAddress', ...b.address },
        geo: b.geo ? { '@type': 'GeoCoordinates', latitude: b.geo.latitude, longitude: b.geo.longitude } : null,
        hasMap: b.googleBusinessProfileUrl,
        openingHoursSpecification: b.openingHours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [...h.days],
            opens: h.opens,
            closes: h.closes,
        })),
        areaServed: AREA_ORDER.map(areaNode),
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'technical support',
                telephone: b.telephone,
                email: b.email,
                areaServed: 'US',
                availableLanguage: b.availableLanguage,
                hoursAvailable: b.emergencySupport24x7
                    ? { '@type': 'OpeningHoursSpecification', dayOfWeek: [...ALL_DAYS], opens: '00:00', closes: '23:59' }
                    : null,
            },
        ],
        knowsAbout: b.knowsAbout,
        foundingDate: b.foundingDate,
        founder: options.withFounders ? founderKeys().map((key) => ref(personId(key))) : [],
        sameAs: [...b.sameAs, b.googleBusinessProfileUrl],
    };
}

export function websiteNode(): JsonLdNode {
    return {
        '@type': 'WebSite',
        '@id': IDS.website,
        url: `${SITE_URL}/`,
        name: BUSINESS.name,
        alternateName: BUSINESS.alternateName,
        publisher: ref(IDS.organization),
        inLanguage: 'en-US',
    };
}

export function personNode(key: PersonKey): JsonLdNode {
    const p = PEOPLE[key];
    return {
        '@type': 'Person',
        '@id': personId(key),
        name: p.name,
        jobTitle: p.jobTitle,
        url: personUrl(key),
        image: p.image ? mediaUrl(p.image) : '',
        description: p.description,
        worksFor: ref(IDS.organization),
        sameAs: p.sameAs,
        hasCredential: p.credentials.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            credentialCategory: c.credentialCategory,
            recognizedBy: { '@type': 'Organization', name: c.recognizedByName, url: c.recognizedByUrl },
        })),
    };
}

export function breadcrumbNode(url: string, crumbs: readonly Crumb[]): JsonLdNode {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.path),
        })),
    };
}

interface WebPageInput {
    type?: string;
    url: string;
    meta: PageMeta;
    breadcrumb?: boolean;
    about?: string;
    mainEntity?: unknown;
    primaryImageId?: string;
    datePublished?: string;
    dateModified?: string;
}

export function webPageNode(input: WebPageInput): JsonLdNode {
    return {
        '@type': input.type ?? 'WebPage',
        '@id': pageId(input.url),
        url: input.url,
        name: cleanTitle(input.meta.title),
        description: input.meta.description,
        isPartOf: ref(IDS.website),
        about: input.about ? ref(input.about) : null,
        mainEntity: input.mainEntity,
        primaryImageOfPage: input.primaryImageId ? ref(input.primaryImageId) : null,
        datePublished: input.datePublished,
        dateModified: input.dateModified,
        breadcrumb: input.breadcrumb === false ? null : ref(`${input.url}#breadcrumb`),
        inLanguage: 'en-US',
    };
}

interface ServiceInput {
    url: string;
    name: string;
    serviceType: string;
    description: string;
    areas?: readonly AreaKey[];
    audience?: string;
    category?: string;
    catalog?: readonly ServiceEntry[];
}

export function serviceNode(input: ServiceInput): JsonLdNode {
    return {
        '@type': 'Service',
        '@id': `${input.url}#service`,
        name: input.name,
        serviceType: input.serviceType,
        description: input.description,
        url: input.url,
        provider: ref(IDS.organization),
        areaServed: (input.areas ?? AREA_ORDER).map(areaNode),
        audience: input.audience ? { '@type': 'BusinessAudience', audienceType: input.audience } : null,
        category: input.category,
        hasOfferCatalog: input.catalog?.length
            ? {
                '@type': 'OfferCatalog',
                name: input.name,
                itemListElement: input.catalog.map((child) => ({
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        '@id': `${absoluteUrl(child.path)}#service`,
                        name: child.name,
                        url: absoluteUrl(child.path),
                    },
                })),
            }
            : null,
        mainEntityOfPage: ref(pageId(input.url)),
    };
}

function questions(items: readonly FaqItem[]): JsonLdNode[] {
    return items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }));
}

/**
 * Optional FAQ block for pages whose main content is something else (posts, services).
 * Google stopped showing FAQ rich results on May 7, 2026, so this earns no Search feature.
 * Pass items only when the FAQ is visible on the page; never for hidden or decorative Q&A.
 */
export function faqNode(url: string, items?: readonly FaqItem[]): JsonLdNode | null {
    if (!items?.length) return null;
    return { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: questions(items) };
}

function itemListNode(url: string, entries: ReadonlyArray<{ name: string; path: string }>): JsonLdNode {
    return {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        numberOfItems: entries.length,
        itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.name,
            url: absoluteUrl(entry.path),
        })),
    };
}

function imageNode(url: string, image: ImageInput): JsonLdNode {
    const src = mediaUrl(image.url);
    return {
        '@type': 'ImageObject',
        '@id': `${url}#primaryimage`,
        url: src,
        contentUrl: src,
        width: image.width,
        height: image.height,
        caption: image.alt,
    };
}

const home: Crumb = { name: PAGES.home.label, path: PAGES.home.path };
const crumb = (page: { label: string; path: string }): Crumb => ({ name: page.label, path: page.path });

/* ------------------------------------------------------------------ */
/* Lookups (config-defined pages throw on unknown paths)               */
/* ------------------------------------------------------------------ */

function findHub(path: string) {
    const hub = SERVICE_HUBS.find((h) => h.path === path);
    if (!hub) throw new Error(`Unknown service hub: ${path}`);
    return hub;
}

function findChild(path: string) {
    for (const hub of SERVICE_HUBS) {
        const child = hub.children.find((c) => c.path === path);
        if (child) return { hub, child };
    }
    throw new Error(`Unknown service page: ${path}`);
}

function findIndustry(path: string) {
    const industry = INDUSTRIES.find((i) => i.path === path);
    if (!industry) throw new Error(`Unknown industry page: ${path}`);
    return industry;
}

function findArea(path: string) {
    const area = SERVICE_AREAS.find((a) => a.path === path);
    if (!area) throw new Error(`Unknown service area page: ${path}`);
    return area;
}

/** Returns null on unknown slugs; each caller decides whether that is fatal. */
function findCategory(slug: string) {
    return BLOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Page builders: one per page type                                    */
/* ------------------------------------------------------------------ */

/** "/" */
export function homeSchema(meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const url = absoluteUrl(PAGES.home.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta, about: IDS.organization, breadcrumb: false }),
        faqNode(url, faqs),
    );
}

/** People shown on the About page. Founders are always added too, so every founder @id resolves. */
const ABOUT_PEOPLE: readonly PersonKey[] = ['george-mansoor', 'nazy-rafaeil'];

/** "/about-us/" */
export function aboutSchema(meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const url = absoluteUrl(PAGES.about.path);
    const people = Array.from(new Set<PersonKey>([...founderKeys(), ...ABOUT_PEOPLE]));
    return graph(
        organizationNode({ withFounders: true }),
        websiteNode(),
        webPageNode({ type: 'AboutPage', url, meta, about: IDS.organization, mainEntity: ref(IDS.organization) }),
        ...people.map((key) => personNode(key)),
        breadcrumbNode(url, [home, crumb(PAGES.about)]),
        faqNode(url, faqs),
    );
}

/** "/contact-us/" */
export function contactSchema(meta: PageMeta): JsonLdGraph {
    const url = absoluteUrl(PAGES.contact.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'ContactPage', url, meta, about: IDS.organization }),
        breadcrumbNode(url, [home, crumb(PAGES.contact)]),
    );
}

/** "/faq/": the page itself is the FAQPage. Pass every visible question, in page order. */
export function faqPageSchema(meta: PageMeta, faqs: FaqItem[]): JsonLdGraph {
    const url = absoluteUrl(PAGES.faq.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'FAQPage', url, meta, mainEntity: questions(faqs) }),
        breadcrumbNode(url, [home, crumb(PAGES.faq)]),
    );
}

/** "/services/" */
export function servicesIndexSchema(meta: PageMeta): JsonLdGraph {
    const url = absoluteUrl(PAGES.services.path);
    const entries = [
        ...SERVICE_HUBS.map((hub) => ({ name: hub.name, path: hub.path })),
        { name: PAGES.industries.label, path: PAGES.industries.path },
    ];
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'CollectionPage', url, meta, mainEntity: ref(`${url}#itemlist`) }),
        itemListNode(url, entries),
        breadcrumbNode(url, [home, crumb(PAGES.services)]),
    );
}

/** "/services/<hub>/" (5 pages) */
export function serviceHubSchema(path: string, meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const hub = findHub(path);
    const url = absoluteUrl(hub.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta }),
        serviceNode({
            url,
            name: hub.name,
            serviceType: hub.serviceType,
            description: meta.description,
            catalog: hub.children,
        }),
        breadcrumbNode(url, [home, crumb(PAGES.services), { name: hub.label, path: hub.path }]),
        faqNode(url, faqs),
    );
}

/** "/services/<hub>/<service>/" (22 pages). Throws on an unknown path, like every other lookup. */
export function serviceDetailSchema(path: string, meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const { hub, child } = findChild(path);
    const url = absoluteUrl(child.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta }),
        serviceNode({
            url,
            name: child.name,
            serviceType: child.serviceType,
            description: meta.description,
            category: hub.name,
        }),
        breadcrumbNode(url, [
            home,
            crumb(PAGES.services),
            { name: hub.label, path: hub.path },
            { name: child.label, path: child.path },
        ]),
        faqNode(url, faqs),
    );
}

/** "/services/industries/" */
export function industriesIndexSchema(meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const url = absoluteUrl(PAGES.industries.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'CollectionPage', url, meta, mainEntity: ref(`${url}#itemlist`) }),
        itemListNode(
            url,
            INDUSTRIES.map((i) => ({ name: i.name, path: i.path })),
        ),
        breadcrumbNode(url, [home, crumb(PAGES.services), crumb(PAGES.industries)]),
        faqNode(url, faqs),
    );
}

/** "/services/industries/<industry>/" (7 pages) */
export function industrySchema(path: string, meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const industry = findIndustry(path);
    const url = absoluteUrl(industry.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta }),
        serviceNode({
            url,
            name: industry.name,
            serviceType: INDUSTRY_SERVICE_TYPE,
            description: meta.description,
            audience: industry.audience,
        }),
        breadcrumbNode(url, [
            home,
            crumb(PAGES.services),
            crumb(PAGES.industries),
            { name: industry.label, path: industry.path },
        ]),
        faqNode(url, faqs),
    );
}

/** "/service-area/" */
export function serviceAreasIndexSchema(meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const url = absoluteUrl(PAGES.serviceAreas.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'CollectionPage', url, meta, mainEntity: ref(`${url}#itemlist`) }),
        itemListNode(
            url,
            SERVICE_AREAS.map((a) => ({ name: a.name, path: a.path })),
        ),
        breadcrumbNode(url, [home, crumb(PAGES.serviceAreas)]),
        faqNode(url, faqs),
    );
}

/** "/service-area/<area>/" (8 pages). Service with ONE specific areaServed; never a LocalBusiness per city. */
export function serviceAreaSchema(path: string, meta: PageMeta, faqs?: FaqItem[]): JsonLdGraph {
    const area = findArea(path);
    const url = absoluteUrl(area.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta }),
        serviceNode({
            url,
            name: area.name,
            serviceType: AREA_SERVICE_TYPE,
            description: meta.description,
            areas: [area.area],
        }),
        breadcrumbNode(url, [home, crumb(PAGES.serviceAreas), { name: area.label, path: area.path }]),
        faqNode(url, faqs),
    );
}

/** "/blog/" */
export function blogIndexSchema(meta: PageMeta): JsonLdGraph {
    const url = absoluteUrl(PAGES.blog.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'CollectionPage', url, meta, mainEntity: ref(IDS.blog) }),
        {
            '@type': 'Blog',
            '@id': IDS.blog,
            name: cleanTitle(meta.title),
            description: meta.description,
            url,
            publisher: ref(IDS.organization),
            inLanguage: 'en-US',
        },
        breadcrumbNode(url, [home, crumb(PAGES.blog)]),
    );
}

/** "/blog/category/<slug>/" (6 pages). Config-defined, so an unknown slug throws. */
export function categorySchema(slug: string, meta: PageMeta): JsonLdGraph {
    const category = findCategory(slug);
    if (!category) throw new Error(`Unknown blog category: ${slug}`);
    const url = absoluteUrl(category.path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ type: 'CollectionPage', url, meta }),
        breadcrumbNode(url, [home, crumb(PAGES.blog), { name: category.name, path: category.path }]),
    );
}

export interface BlogPostInput {
    path: string; // "/blog/what-is-a-baa/"
    meta: PageMeta; // SEO title without suffix + meta description
    headline: string; // the visible H1
    image: ImageInput | null; // featured image with its REAL width and height
    publishedGmt: string; // WordPress date_gmt
    modifiedGmt: string; // WordPress modified_gmt
    author: PersonKey; // must match the visible byline
    categorySlug: string; // primary category slug ("" if the post has none)
    faqs?: FaqItem[]; // only if the post shows an FAQ section
}

/** "/blog/<slug>/" (251 posts) */
export function blogPostSchema(post: BlogPostInput): JsonLdGraph {
    const url = absoluteUrl(post.path);
    const category = post.categorySlug ? findCategory(post.categorySlug) : null;
    if (post.categorySlug && !category) {
        // Posts come from WordPress, so do not throw here: a throw at request time would 500 the page.
        // The warning shows in the build output and Vercel logs so the category can be fixed.
        console.warn(`[schema] Unknown blog category "${post.categorySlug}" on ${post.path}; left out of the markup.`);
    }
    const datePublished = toIso(post.publishedGmt);
    const dateModified = toIso(laterOf(post.publishedGmt, post.modifiedGmt));
    const author = PEOPLE[post.author];
    const imageId = post.image ? `${url}#primaryimage` : undefined;

    const crumbs: Crumb[] = [home, crumb(PAGES.blog)];
    if (category) crumbs.push({ name: category.name, path: category.path });
    crumbs.push({ name: post.headline, path: post.path });

    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta: post.meta, primaryImageId: imageId, datePublished, dateModified }),
        post.image ? imageNode(url, post.image) : null,
        {
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: post.headline,
            description: post.meta.description,
            image: imageId ? ref(imageId) : null,
            datePublished,
            dateModified,
            author: { '@type': 'Person', '@id': personId(post.author), name: author.name, url: personUrl(post.author) },
            publisher: ref(IDS.organization),
            mainEntityOfPage: ref(pageId(url)),
            isPartOf: ref(IDS.blog),
            articleSection: category?.name,
            inLanguage: 'en-US',
        },
        personNode(post.author),
        breadcrumbNode(url, crumbs),
        faqNode(url, post.faqs),
    );
}

/** "/author/<slug>/" (route: app/author/[slug]/page.tsx). Set AUTHOR_PAGES_LIVE = true once these pages exist. */
export function authorSchema(
    key: PersonKey,
    meta: PageMeta,
    dates?: { createdGmt?: string; modifiedGmt?: string },
): JsonLdGraph {
    const path = authorPath(key);
    const url = absoluteUrl(path);
    return graph(
        organizationNode(),
        websiteNode(),
        {
            ...webPageNode({ type: 'ProfilePage', url, meta, mainEntity: ref(personId(key)) }),
            dateCreated: dates?.createdGmt ? toIso(dates.createdGmt) : null,
            dateModified: dates?.modifiedGmt ? toIso(dates.modifiedGmt) : null,
        },
        personNode(key),
        breadcrumbNode(url, [home, crumb(PAGES.blog), { name: PEOPLE[key].name, path }]),
    );
}

/** Any simple page without its own builder, e.g. a future "/privacy-policy/". */
export function genericPageSchema(path: string, label: string, meta: PageMeta): JsonLdGraph {
    const url = absoluteUrl(path);
    return graph(
        organizationNode(),
        websiteNode(),
        webPageNode({ url, meta }),
        breadcrumbNode(url, [home, { name: label, path }]),
    );
}

/* ------------------------------------------------------------------ */
/* Conditional nodes                                                   */
/* ------------------------------------------------------------------ */

export interface VideoInput {
    pageUrl: string; // absolute URL of the page that shows the video
    videoId: string; // unique per page, e.g. the YouTube id
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string; // ISO 8601; a value without a zone is treated as UTC
    duration?: string; // ISO 8601 duration, e.g. "PT2M30S"
    embedUrl?: string; // e.g. "https://www.youtube.com/embed/<id>"
    contentUrl?: string; // direct file URL, if self-hosted
}

/** Add to graph(...) on any page that embeds a video (custom-video block). */
export function videoNode(video: VideoInput): JsonLdNode {
    return {
        '@type': 'VideoObject',
        '@id': `${video.pageUrl}#video-${video.videoId}`,
        name: video.name,
        description: video.description,
        thumbnailUrl: [mediaUrl(video.thumbnailUrl)],
        uploadDate: toIso(video.uploadDate),
        duration: video.duration,
        embedUrl: video.embedUrl,
        contentUrl: video.contentUrl ? mediaUrl(video.contentUrl) : undefined,
    };
}