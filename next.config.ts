import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wordpress-1592566-6232100.cloudwaysapps.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "secure.gravatar.com",
            },
        ],
    },

    /**
     * Redirect rules.
     *
     * Convention:
     *  - `source` is written WITHOUT a trailing slash.
     *    Next.js with `trailingSlash: true` matches both forms automatically.
     *  - `destination` is written WITH a trailing slash, so the user lands on
     *    the canonical URL in a single redirect (no extra hop).
     *  - All redirects are 308 permanent (`permanent: true`) for SEO.
     */
    async redirects() {
        return [
            // =========================
            // SERVICE AREA REDIRECTS
            // =========================
            { source: "/locations", destination: "/service-area/", permanent: true },

            { source: "/san-fernando-valley", destination: "/service-area/san-fernando-valley/", permanent: true },

            { source: "/sylmar", destination: "/service-area/sylmar/", permanent: true }, //step -1
            { source: "/service-area/sylmar/", destination: "/service-area/san-fernando-valley/", permanent: true }, // step -2
            { source: "/service-area/reseda/", destination: "/service-area/san-fernando-valley/", permanent: true },// step -2

            { source: "/westlake-village", destination: "/service-area/westlake-village/", permanent: true },
            { source: "/santa-clarita", destination: "/service-area/santa-clarita/", permanent: true },
            { source: "/reseda", destination: "/service-area/reseda/", permanent: true },

            { source: "/sherman-oaks", destination: "/service-area/sherman-oaks/", permanent: true }, //step-1
            { source: "/service-area/sherman-oaks/", destination: "/service-area/san-fernando-valley/", permanent: true }, //step-2
            { source: "/service-area/woodland-hills-managed-it-services/", destination: "/service-area/san-fernando-valley/", permanent: true }, //step-2
            { source: "/service-area/encino-network-security-audits/", destination: "/service-area/san-fernando-valley/", permanent: true }, //step-2

            { source: "/ventura-county", destination: "/service-area/ventura-county/", permanent: true },
            { source: "/thousand-oaks", destination: "/service-area/thousand-oaks/", permanent: true },
            { source: "/simi-valley", destination: "/service-area/simi-valley/", permanent: true },

            // Encino
            { source: "/encino-network-security-audits", destination: "/service-area/encino/", permanent: true },

            // Woodland Hills
            { source: "/woodland-hills-managed-it-services", destination: "/service-area/woodland-hills-managed-it-services/", permanent: true },
            { source: "/woodland-hills-cybersecurity-solution", destination: "/service-area/woodland-hills-managed-it-services/", permanent: true },
            { source: "/woodland-hills-risk-management", destination: "/service-area/woodland-hills-managed-it-services/", permanent: true },

            // Industry / location pages
            { source: "/law-firms", destination: "/service-area/law-firms/", permanent: true },

            // =========================
            // SERVICES REDIRECTS
            // =========================
            { source: "/managed-it-services", destination: "/services/managed-it-services/", permanent: true },
            { source: "/business-network-setup-support", destination: "/services/managed-it-services/", permanent: true },

            { source: "/co-managed-it-services", destination: "/services/co-managed-it-services/", permanent: true },
            { source: "/helpdesk-and-it-support", destination: "/services/helpdesk-and-it-support/", permanent: true },
            { source: "/managed-office-365-services", destination: "/services/managed-office-365-services/", permanent: true },
            { source: "/data-backup-and-disaster-recovery", destination: "/services/data-backup-and-disaster-recovery/", permanent: true },
            { source: "/24-7-it-support-business-continuity", destination: "/services/24-7-it-services-for-business-continuity/", permanent: true },
            { source: "/remote-it-monitoring-management", destination: "/services/remote-it-monitoring-management/", permanent: true },
            { source: "/business-virtualization-services", destination: "/services/cloud-services-and-migration/", permanent: true },
            { source: "/cloud-services-and-migration", destination: "/services/cloud-services-and-migration/", permanent: true },
            { source: "/cybersecurity-solutions", destination: "/services/cybersecurity-solutions/", permanent: true },
            { source: "/cybersecurity-services", destination: "/services/cybersecurity-solutions/", permanent: true },

            // =========================
            // PENTEST
            // =========================
            { source: "/pentest", destination: "/services/pentest/", permanent: true },
            { source: "/network-computers-assessment-test", destination: "/services/pentest/", permanent: true },

            // =========================
            // INDUSTRY PAGES
            // =========================
            { source: "/medical-offices", destination: "/services/medical-offices/", permanent: true },
            { source: "/manufacturing", destination: "/services/managed-it-services/", permanent: true },
            { source: "/financial-services", destination: "/services/financial-services/", permanent: true },

            // =========================
            // COMPLIANCE
            // =========================
            {
                source: "/compliance-and-risk-management-services",
                destination: "/services/compliance-and-risk-management-services/",
                permanent: true,
            },

            // =========================
            // CONTACT / THANK YOU / MISC
            // =========================
            { source: "/initial-consultation-thank-you", destination: "/contact-us/", permanent: true },
            { source: "/referral-program", destination: "/contact-us/", permanent: true },
            { source: "/shop__trashed", destination: "/", permanent: true },
            { source: "/cyber-security-tip-of-the-week", destination: "/blog/", permanent: true },

            // =========================
            // ABOUT US
            // =========================
            { source: "/why-choose-us", destination: "/about-us/", permanent: true },
            { source: "/george-mansoor", destination: "/about-us/", permanent: true },
        ];
    },

    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;