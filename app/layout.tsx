import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import HeaderSwitcher from "@/components/layout/HeaderSwitcher";
import Footer from "@/components/layout/Footer";
import {
    getHeaderSettings,
    getServicePagesHeaderInfo,
    getServiceAreaPagesHeaderInfo,
    getServiceNavigation,
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
        serviceNav,
        blogCategories,
    ] = await Promise.all([
        getHeaderSettings(),
        getServicePagesHeaderInfo(),
        getServiceAreaPagesHeaderInfo(),
        getServiceNavigation(),
        getTopLevelBlogCategories(),
    ]);
    return (
        <html lang="en" className={dmSans.variable}>
        <body className="antialiased mx-auto" suppressHydrationWarning>
        <HeaderSwitcher
            headerSettings={headerSettings}
            servicePages={servicePages}
            serviceAreaPages={serviceAreaPages}
            serviceNav={serviceNav}
            blogCategories={blogCategories}
        />
        {children}
        <Footer />

        {process.env.NODE_ENV === "production" && (
            <Script id="microsoft-clarity" strategy="afterInteractive">
                {`
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "vhfmq2ot6q");
                        `}
            </Script>
        )}
        </body>
        </html>
    );
}