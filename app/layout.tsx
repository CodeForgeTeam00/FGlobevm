

import type { Metadata } from "next";
import "./globals.css";
import HeaderSwitcher from "@/Components/layout/HeaderSwitcher";
import { Footer } from "@/Components/layout/Footer";
import { getHeaderSettings } from "@/services/wp-options";

export const metadata: Metadata = {
    title: {
        default: "GlobeVM Digital Services | Managed IT & Cybersecurity",
        template: "%s | GlobeVM",
    },
    description:
        "GlobeVM Digital Services provides managed IT, cybersecurity, and cloud solutions for businesses in Los Angeles and beyond.",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const headerSettings = await getHeaderSettings();

    return (
        <html lang="en">
        <body className="antialiased max-w-[1920px] mx-auto">
            <HeaderSwitcher headerSettings={headerSettings} />
        {children}
        <Footer />
        </body>
        </html>
    );
}