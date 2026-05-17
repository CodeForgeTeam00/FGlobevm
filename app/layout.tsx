import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderSwitcher from "@/Components/layout/HeaderSwitcher";
import Footer from "@/Components/layout/Footer";
import {
    getHeaderSettings,
    getServicePagesHeaderInfo,
    getServiceAreaPagesHeaderInfo,
} from "@/services/wp-options";
import { fetchWP } from "@/lib/api";

const dmSans = localFont({
    src: "../public/fonts/variable-font.ttf",
    variable: "--font-sans",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.globevm.com"),
    title: {
        default: "GlobeVM Digital Services | Managed IT & Cybersecurity",
        template: "%s | GlobeVM",
    },
    description:
        "GlobeVM Digital Services provides managed IT, cybersecurity, and cloud solutions for businesses in Los Angeles and beyond.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
};

interface WPCategoryRaw {
    id: number;
    parent: number;
    name: string;
    slug: string;
}

async function getTopLevelBlogCategories() {
    const all = await fetchWP<WPCategoryRaw[]>(
        "/wp/v2/categories?per_page=100",
        { strategy: { type: "isr", revalidate: 3600 }, tag: "blog-categories" }
    );
    if (!all) return [];
    return all
        .filter((c) => c.parent === 0 && c.slug !== "uncategorized")
        .map((c) => ({ name: c.name, slug: c.slug }));
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const [
        headerSettings,
        servicePages,
        serviceAreaPages,
        blogCategories,
    ] = await Promise.all([
        getHeaderSettings(),
        getServicePagesHeaderInfo(),
        getServiceAreaPagesHeaderInfo(),
        getTopLevelBlogCategories(),
    ]);

    return (
        <html lang="en" className={dmSans.variable}>
        <body className="antialiased mx-auto" suppressHydrationWarning>
        <HeaderSwitcher
            headerSettings={headerSettings}
            servicePages={servicePages}
            serviceAreaPages={serviceAreaPages}
            blogCategories={blogCategories}
        />
        {children}
        <Footer />
        </body>
        </html>
    );
}