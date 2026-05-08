import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    async redirects() {
        return [
            // ========== SERVICE AREAS (شهرها) ==========
            { source: "/san-fernando-valley", destination: "/service-area/san-fernando-valley", permanent: true },
            { source: "/sylmar", destination: "/service-area/sylmar", permanent: true },
            { source: "/westlake-village", destination: "/service-area/westlake-village", permanent: true },
            { source: "/santa-clarita", destination: "/service-area/santa-clarita", permanent: true },
            { source: "/reseda", destination: "/service-area/reseda", permanent: true },
            { source: "/sherman-oaks", destination: "/service-area/sherman-oaks", permanent: true },
            { source: "/ventura-county", destination: "/service-area/ventura-county", permanent: true },
            { source: "/thousand-oaks", destination: "/service-area/thousand-oaks", permanent: true },
            { source: "/simi-valley", destination: "/service-area/simi-valley", permanent: true },
            { source: "/locations", destination: "/", permanent: true },

            // ========== URL های ترکیبی (شهر + سرویس) — ⚠️ مرور لازم ==========
            // این‌ها نیاز به تصمیم داره: می‌رن به shr یا service؟
            { source: "/encino-network-security-audits", destination: "/service-area/encino", permanent: true },
            { source: "/woodland-hills-managed-it-services", destination: "/service-area/woodland-hills", permanent: true },
            { source: "/woodland-hills-risk-management", destination: "/service-area/woodland-hills", permanent: true },
            { source: "/managed-it-services-los-angeles", destination: "/services/managed-it-services", permanent: true },

            // ========== IT SERVICES ==========
            { source: "/managed-it-services", destination: "/services/managed-it-services", permanent: true },
            { source: "/co-managed-it-services", destination: "/services/co-managed-it-services", permanent: true },
            { source: "/helpdesk-and-it-support", destination: "/services/helpdesk-and-it-support", permanent: true },
            { source: "/managed-office-365-services", destination: "/services/managed-office-365-services", permanent: true },
            { source: "/data-backup-and-disaster-recovery", destination: "/services/data-backup-and-disaster-recovery", permanent: true },
            { source: "/24-7-it-services-for-business-continuity", destination: "/services/24-7-it-services-for-business-continuity", permanent: true },
            { source: "/remote-it-monitoring-management", destination: "/services/remote-it-monitoring-management", permanent: true },
            { source: "/cloud-services-and-migration", destination: "/services/cloud-services-and-migration", permanent: true },

            // ========== CYBERSECURITY ==========
            { source: "/cybersecurity-solutions", destination: "/services/cybersecurity-solutions", permanent: true },
            { source: "/pentest", destination: "/services/pentest", permanent: true },
            { source: "/compliance-and-risk-management-services", destination: "/services/compliance-and-risk-management-services", permanent: true },

            // ========== INDUSTRIES — ⚠️ به نازی بپرس ==========
            // این چهارتا تو سایت جدید کجا میرن؟ صفحه جدا دارن؟
            { source: "/medical-offices", destination: "/services/medical-offices", permanent: true },
            { source: "/law-firms", destination: "/services/law-firms", permanent: true },
            { source: "/manufacturing", destination: "/services/manufacturing", permanent: true },
            { source: "/financial-services", destination: "/services/financial-services", permanent: true },

            // ========== ABOUT / MARKETING ==========
            { source: "/why-choose-us", destination: "/about-us", permanent: true },
            { source: "/george-mansoor", destination: "/about-us", permanent: true },

            // ========== LEAD / CTA PAGES ==========
            { source: "/referral-program", destination: "/contact-us", permanent: true },
            { source: "/initial-consultation", destination: "/contact-us", permanent: true },
            { source: "/initial-consultation-thank-you", destination: "/contact-us", permanent: true },
            { source: "/discoverycall", destination: "/contact-us", permanent: true },
        ];
    },
    typescript: {
        ignoreBuildErrors: false,
    },

    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;