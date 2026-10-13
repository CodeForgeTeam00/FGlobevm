/**
 * lib/schema/config.ts
 * Business facts and the site tree used by every JSON-LD builder on www.globevm.com.
 *
 * Lines marked CONFIRM must be checked against the Google Business Profile (GBP)
 * or with the owners before go-live. Empty strings, empty arrays and null are
 * omitted from the output automatically, so an unconfirmed value is never published.
 */

export const SITE_URL = 'https://www.globevm.com';

/** Headless WordPress origin (Cloudways). Media files currently live here. */
export const BACKEND_ORIGIN = 'https://wordpress-1592566-6232100.cloudwaysapps.com';

/**
 * Set to true only after BOTH are done:
 * 1. next.config rewrites /wp-content/uploads/:path* to BACKEND_ORIGIN, and
 * 2. https://www.globevm.com/wp-content/uploads/... returns 200 with no "X-Robots-Tag: noindex".
 */
export const MEDIA_ON_WWW = false;

/** Set to true once /blog/author/<slug>/ pages return 200. Until then author URLs point to /about-us/. */
export const AUTHOR_PAGES_LIVE = false;

export const IDS = {
    organization: `${SITE_URL}/#organization`,
    website: `${SITE_URL}/#website`,
    logo: `${SITE_URL}/#logo`,
    blog: `${SITE_URL}/blog/#blog`,
} as const;

/* ------------------------------------------------------------------ */
/* Business                                                            */
/* ------------------------------------------------------------------ */

export const ALL_DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
] as const;
export type DayOfWeek = (typeof ALL_DAYS)[number];

export interface OpeningHours {
    days: readonly DayOfWeek[];
    opens: string; // "09:00" (24h clock)
    closes: string; // "17:00"; a 24-hour day is opens "00:00", closes "23:59"
}

export interface PostalAddressInfo {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
}

export interface BusinessConfig {
    name: string;
    alternateName: string[];
    legalName: string;
    description: string;
    telephone: string;
    email: string;
    logoUrl: string;
    address: PostalAddressInfo;
    geo: { latitude: number; longitude: number } | null;
    openingHours: OpeningHours[];
    emergencySupport24x7: boolean;
    availableLanguage: string[];
    googleBusinessProfileUrl: string;
    sameAs: string[];
    foundingDate: string;
    knowsAbout: string[];
}

export const BUSINESS: BusinessConfig = {
    // CONFIRM: must be the exact real-world name shown on the Google Business Profile.
    name: 'GlobeVM',
    // Both names already appear on the site (og:site_name and the 404 page description).
    alternateName: ['GlobeVM IT Services', 'GlobeVM Digital Services'],
    // CONFIRM: registered legal entity name. Empty = omitted.
    legalName: '',
    description:
        'Managed IT services, cybersecurity, cloud services, data backup and disaster recovery, and compliance support for businesses in Los Angeles and Ventura County.',
    telephone: '+1-310-750-4939',
    email: 'info@globevm.com',
    // SVG is accepted by Google. A square PNG (512x512, at least 112x112) is the safer choice for every consumer.
    logoUrl: `${SITE_URL}/assets/image/Logo.svg`,
    // CONFIRM: must match the public Google Business Profile address character for character.
    // If this office is no longer used, replace it. If the GBP address is hidden (service-area business),
    // leave streetAddress empty and keep locality, region, postal code and country.
    // Never put a private address here unless that exact address is shown publicly on the GBP.
    address: {
        streetAddress: '20005 Gypsy Lane',
        addressLocality: 'Woodland Hills',
        addressRegion: 'CA',
        postalCode: '91364',
        addressCountry: 'US',
    },
    // CONFIRM: copy from the GBP map pin with at least 5 decimal places. null = omitted.
    geo: null,
    // CONFIRM: office hours exactly as listed on GBP. Empty = omitted.
    openingHours: [],
    // The site states 24/7/365 monitoring and emergency support (home page, /faq/, /contact-us/).
    emergencySupport24x7: true,
    // /services/ states: "We proudly serve LA's Persian business community in both English and Farsi."
    availableLanguage: ['English', 'Persian'],
    // CONFIRM: public Google Maps URL of the business profile. Empty = omitted.
    googleBusinessProfileUrl: '',
    // Only profiles the company owns. CONFIRM the LinkedIn company page is the official one.
    sameAs: [
        'https://www.linkedin.com/company/globevm',
        'https://www.facebook.com/GlobeVM/',
        'https://www.instagram.com/globe_vm/',
        'https://www.youtube.com/@globevm5252',
    ],
    // CONFIRM: the site says both "30+ years" and "8+ years". Use the real founding year (YYYY). Empty = omitted.
    foundingDate: '',
    knowsAbout: [
        'Managed IT services',
        'Cybersecurity',
        'Cloud services',
        'Data backup and disaster recovery',
        'HIPAA compliance',
        'PCI DSS compliance',
    ],
};

/* ------------------------------------------------------------------ */
/* People (only what is visible on the site)                           */
/* ------------------------------------------------------------------ */

export type PersonKey = 'george-mansoor' | 'nazy-rafaeil';

export interface CredentialInfo {
    name: string; // "Certified Cloud Security Professional (CCSP)"
    credentialCategory: string; // "certification"
    recognizedByName: string; // "ISC2"
    recognizedByUrl: string; // "https://www.isc2.org/"
}

export interface PersonInfo {
    slug: string;
    name: string;
    jobTitle: string;
    isFounder: boolean;
    image: string; // headshot on an indexable URL. Empty = omitted.
    description: string; // short bio that is visible on the author page. Empty = omitted.
    sameAs: string[];
    credentials: CredentialInfo[]; // only credentials that are true AND shown on the page
}

export const PEOPLE: Record<PersonKey, PersonInfo> = {
    'george-mansoor': {
        slug: 'george-mansoor',
        name: 'George Mansoor',
        jobTitle: 'CEO',
        // CONFIRM: set true if George co-founded GlobeVM. The About page only says "CEO".
        isFounder: false,
        // CONFIRM: headshot URL once media is indexable (currently Thumbnail.png on the backend host).
        image: '',
        description: '',
        sameAs: ['https://www.linkedin.com/in/george-mansoor-93449665/'],
        // CONFIRM: add CCSP here only if George holds it and his page shows it.
        credentials: [],
    },
    'nazy-rafaeil': {
        slug: 'nazy-rafaeil',
        name: 'Nazy Rafaeil',
        jobTitle: 'Co-Founder',
        isFounder: true,
        image: '',
        description: '',
        sameAs: [],
        credentials: [],
    },
};

/** Map the WordPress author (slug or display name) to a PersonKey. */
export function personKeyFromWp(author: string): PersonKey {
    const value = author.trim().toLowerCase();
    if (value.startsWith('george')) return 'george-mansoor';
    if (value.startsWith('nazy')) return 'nazy-rafaeil';
    throw new Error(`Unknown WordPress author "${author}". Add the person to PEOPLE first.`);
}

/* ------------------------------------------------------------------ */
/* Areas served (Wikipedia URLs identify each place unambiguously)     */
/* ------------------------------------------------------------------ */

export type AreaKey =
    | 'los-angeles'
    | 'woodland-hills'
    | 'san-fernando-valley'
    | 'ventura-county'
    | 'thousand-oaks'
    | 'westlake-village'
    | 'simi-valley'
    | 'santa-clarita'
    | 'conejo-valley';

export interface AreaInfo {
    type: 'City' | 'Place' | 'AdministrativeArea';
    name: string;
    sameAs: string;
}

export const AREAS: Record<AreaKey, AreaInfo> = {
    'los-angeles': { type: 'City', name: 'Los Angeles', sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles' },
    'woodland-hills': {
        type: 'Place',
        name: 'Woodland Hills',
        sameAs: 'https://en.wikipedia.org/wiki/Woodland_Hills,_Los_Angeles',
    },
    'san-fernando-valley': {
        type: 'Place',
        name: 'San Fernando Valley',
        sameAs: 'https://en.wikipedia.org/wiki/San_Fernando_Valley',
    },
    'ventura-county': {
        type: 'AdministrativeArea',
        name: 'Ventura County',
        sameAs: 'https://en.wikipedia.org/wiki/Ventura_County,_California',
    },
    'thousand-oaks': {
        type: 'City',
        name: 'Thousand Oaks',
        sameAs: 'https://en.wikipedia.org/wiki/Thousand_Oaks,_California',
    },
    'westlake-village': {
        type: 'City',
        name: 'Westlake Village',
        sameAs: 'https://en.wikipedia.org/wiki/Westlake_Village,_California',
    },
    'simi-valley': { type: 'City', name: 'Simi Valley', sameAs: 'https://en.wikipedia.org/wiki/Simi_Valley,_California' },
    'santa-clarita': {
        type: 'City',
        name: 'Santa Clarita',
        sameAs: 'https://en.wikipedia.org/wiki/Santa_Clarita,_California',
    },
    'conejo-valley': { type: 'Place', name: 'Conejo Valley', sameAs: 'https://en.wikipedia.org/wiki/Conejo_Valley' },
};

/** Order used for the organization-wide areaServed list. */
export const AREA_ORDER: AreaKey[] = [
    'los-angeles',
    'woodland-hills',
    'san-fernando-valley',
    'ventura-county',
    'thousand-oaks',
    'westlake-village',
    'simi-valley',
    'santa-clarita',
    'conejo-valley',
];

/* ------------------------------------------------------------------ */
/* Site tree                                                           */
/* ------------------------------------------------------------------ */

export const PAGES = {
    home: { path: '/', label: 'Home' },
    about: { path: '/about-us/', label: 'About Us' },
    contact: { path: '/contact-us/', label: 'Contact Us' },
    faq: { path: '/faq/', label: 'FAQ' },
    services: { path: '/services/', label: 'Services' },
    industries: { path: '/services/industries/', label: 'Industries' },
    serviceAreas: { path: '/service-area/', label: 'Service Areas' },
    blog: { path: '/blog/', label: 'Blog' },
} as const;

export interface ServiceEntry {
    path: string; // canonical path with trailing slash
    label: string; // short label for breadcrumbs (must match the visible breadcrumb)
    name: string; // Service.name
    serviceType: string; // generic service category
}

export interface ServiceHub extends ServiceEntry {
    children: ServiceEntry[];
}

export const SERVICE_HUBS: ServiceHub[] = [
    {
        path: '/services/managed-it-services/',
        label: 'Managed IT',
        name: 'Managed IT Services',
        serviceType: 'Managed IT services',
        children: [
            {
                path: '/services/managed-it-services/co-managed-it-services/',
                label: 'Co-Managed IT',
                name: 'Co-Managed IT Support',
                serviceType: 'Co-managed IT services',
            },
            {
                path: '/services/managed-it-services/it-consulting/',
                label: 'IT Consulting',
                name: 'IT Consulting & vCIO Services',
                serviceType: 'IT consulting',
            },
            {
                path: '/services/managed-it-services/helpdesk-and-it-support/',
                label: 'IT Support',
                name: 'IT Helpdesk & Support Services',
                serviceType: 'IT help desk support',
            },
            {
                path: '/services/managed-it-services/network-management/',
                label: 'Network Management',
                name: 'Network Monitoring & Management',
                serviceType: 'Network management',
            },
            {
                path: '/services/managed-it-services/remote-it-monitoring-management/',
                label: 'Remote IT Monitoring',
                name: 'Remote IT Monitoring & Management',
                serviceType: 'Remote monitoring and management',
            },
        ],
    },
    {
        path: '/services/cybersecurity-solutions/',
        label: 'Cybersecurity',
        name: 'Cybersecurity Services',
        serviceType: 'Cybersecurity services',
        children: [
            {
                path: '/services/cybersecurity-solutions/access-control/',
                label: 'Access Control',
                name: 'Identity & Access Management',
                serviceType: 'Identity and access management',
            },
            {
                path: '/services/cybersecurity-solutions/dark-web/',
                label: 'Dark Web Monitoring',
                name: 'Dark Web Monitoring Services',
                serviceType: 'Dark web monitoring',
            },
            {
                path: '/services/cybersecurity-solutions/email-security/',
                label: 'Email Security',
                name: 'Email Security Services',
                serviceType: 'Email security',
            },
            {
                path: '/services/cybersecurity-solutions/endpoint-security/',
                label: 'Endpoint Security',
                name: 'Endpoint Security Services',
                serviceType: 'Endpoint security',
            },
            {
                path: '/services/cybersecurity-solutions/pentest/',
                label: 'Penetration Testing',
                name: 'Penetration Testing Services',
                serviceType: 'Penetration testing',
            },
            {
                path: '/services/cybersecurity-solutions/security-training/',
                label: 'Security Training',
                name: 'Security Awareness Training',
                serviceType: 'Security awareness training',
            },
            {
                path: '/services/cybersecurity-solutions/threat-detection/',
                label: 'Threat Detection',
                name: 'Threat Detection & Response (MDR)',
                serviceType: 'Managed detection and response',
            },
        ],
    },
    {
        path: '/services/cloud-services-and-migration/',
        label: 'Cloud Services',
        name: 'Cloud Services & Migration',
        serviceType: 'Cloud services',
        children: [
            {
                path: '/services/cloud-services-and-migration/cloud-infrastructure/',
                label: 'Cloud Infrastructure',
                name: 'Cloud Infrastructure & IaaS Services',
                serviceType: 'Infrastructure as a service',
            },
            {
                path: '/services/cloud-services-and-migration/cloud-security/',
                label: 'Cloud Security',
                name: 'Cloud Security Services',
                serviceType: 'Cloud security',
            },
            {
                path: '/services/cloud-services-and-migration/hybrid-cloud/',
                label: 'Hybrid Cloud',
                name: 'Hybrid & Multi-Cloud Solutions',
                serviceType: 'Hybrid cloud',
            },
            {
                path: '/services/cloud-services-and-migration/managed-office-365-services/',
                label: 'Microsoft 365',
                name: 'Microsoft 365 Support',
                serviceType: 'Microsoft 365 management',
            },
            {
                path: '/services/cloud-services-and-migration/virtual-desktops/',
                label: 'Virtual Desktops',
                name: 'Virtual Desktops: VDI & DaaS Services',
                serviceType: 'Virtual desktop infrastructure',
            },
        ],
    },
    {
        path: '/services/data-backup-and-disaster-recovery/',
        label: 'Backup & Recovery',
        name: 'Backup & Disaster Recovery',
        serviceType: 'Data backup and disaster recovery',
        children: [
            {
                path: '/services/data-backup-and-disaster-recovery/24-7-it-services-for-business-continuity/',
                label: 'Business Continuity',
                name: 'Business Continuity IT Support',
                serviceType: 'Business continuity',
            },
            {
                path: '/services/data-backup-and-disaster-recovery/data-protection/',
                label: 'Data Protection',
                name: 'Data Loss Prevention (DLP) Services',
                serviceType: 'Data loss prevention',
            },
            {
                path: '/services/data-backup-and-disaster-recovery/disaster-recovery/',
                label: 'Disaster Recovery',
                name: 'Disaster Recovery as a Service (DRaaS)',
                serviceType: 'Disaster recovery as a service',
            },
        ],
    },
    {
        path: '/services/compliance-and-risk-management-services/',
        label: 'Compliance',
        name: 'Compliance & Risk Management',
        serviceType: 'IT compliance and risk management',
        children: [
            {
                path: '/services/compliance-and-risk-management-services/hipaa-compliance/',
                label: 'HIPAA Compliance',
                name: 'HIPAA Compliance Services',
                serviceType: 'HIPAA compliance',
            },
            {
                path: '/services/compliance-and-risk-management-services/pci-dss/',
                label: 'PCI DSS Compliance',
                name: 'PCI DSS Compliance Services',
                serviceType: 'PCI DSS compliance',
            },
        ],
    },
];

export interface IndustryEntry {
    path: string;
    label: string;
    name: string;
    audience: string;
}

export const INDUSTRIES: IndustryEntry[] = [
    {
        path: '/services/industries/construction/',
        label: 'Construction',
        name: 'IT & Cybersecurity for Construction',
        audience: 'Construction companies',
    },
    {
        path: '/services/industries/dental/',
        label: 'Dental',
        name: 'IT & Cybersecurity for Dental Practices',
        audience: 'Dental practices',
    },
    {
        path: '/services/industries/financial-services/',
        label: 'Financial Services',
        name: 'IT & Cybersecurity for Financial Firms',
        audience: 'Financial services firms',
    },
    {
        path: '/services/industries/it-and-cybersecurity-for-healthcare-practices/',
        label: 'Healthcare',
        name: 'IT & Cybersecurity for Healthcare Practices',
        audience: 'Healthcare practices',
    },
    {
        path: '/services/industries/legal/',
        label: 'Legal',
        name: 'IT & Cybersecurity for Law Firms',
        audience: 'Law firms',
    },
    {
        path: '/services/industries/manufacturing/',
        label: 'Manufacturing',
        name: 'IT & Cybersecurity for Manufacturers',
        audience: 'Manufacturers',
    },
    {
        path: '/services/industries/nonprofit/',
        label: 'Nonprofit',
        name: 'IT & Cybersecurity for Nonprofits',
        audience: 'Nonprofit organizations',
    },
];

export const INDUSTRY_SERVICE_TYPE = 'Managed IT and cybersecurity services';

export interface ServiceAreaEntry {
    path: string;
    label: string;
    name: string;
    area: AreaKey;
}

export const SERVICE_AREAS: ServiceAreaEntry[] = [
    {
        path: '/service-area/managed-it-services-los-angeles/',
        label: 'Los Angeles',
        name: 'Managed IT Support in Los Angeles',
        area: 'los-angeles',
    },
    {
        path: '/service-area/san-fernando-valley/',
        label: 'San Fernando Valley',
        name: 'IT Support in the San Fernando Valley',
        area: 'san-fernando-valley',
    },
    {
        path: '/service-area/ventura-county/',
        label: 'Ventura County',
        name: 'IT Support & Cybersecurity in Ventura County',
        area: 'ventura-county',
    },
    {
        path: '/service-area/thousand-oaks/',
        label: 'Thousand Oaks',
        name: 'Business IT Support in Thousand Oaks',
        area: 'thousand-oaks',
    },
    {
        path: '/service-area/westlake-village/',
        label: 'Westlake Village',
        name: 'IT Support & Security in Westlake Village',
        area: 'westlake-village',
    },
    {
        path: '/service-area/simi-valley/',
        label: 'Simi Valley',
        name: 'IT Support in Simi Valley',
        area: 'simi-valley',
    },
    {
        path: '/service-area/santa-clarita/',
        label: 'Santa Clarita',
        name: 'IT Support & Cybersecurity in Santa Clarita',
        area: 'santa-clarita',
    },
    {
        path: '/service-area/conejo-valley/',
        label: 'Conejo Valley',
        name: 'IT Support & Security in Conejo Valley',
        area: 'conejo-valley',
    },
];

export const AREA_SERVICE_TYPE = 'Managed IT services';

export interface BlogCategory {
    slug: string;
    name: string;
    path: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
    { slug: 'cloud-strategy', name: 'Cloud Strategy', path: '/blog/category/cloud-strategy/' },
    { slug: 'industry-insights', name: 'Industry Insights', path: '/blog/category/industry-insights/' },
    { slug: 'secure-hybrid', name: 'Secure Hybrid', path: '/blog/category/secure-hybrid/' },
    { slug: 'smart-workflows', name: 'Smart Workflows', path: '/blog/category/smart-workflows/' },
    { slug: 'tech-operations', name: 'Tech Operations', path: '/blog/category/tech-operations/' },
    { slug: 'threat-defense', name: 'Threat Defense', path: '/blog/category/threat-defense/' },
];