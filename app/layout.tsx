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

const dmSans = localFont({
    src: "../public/fonts/variable-font.ttf",
    variable: "--font-sans",
    display: "swap",
});

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
    const [headerSettings, servicePages, serviceAreaPages] = await Promise.all([
        getHeaderSettings(),
        getServicePagesHeaderInfo(),
        getServiceAreaPagesHeaderInfo(),
    ]);

    return (
        <html lang="en" className={dmSans.variable}>
        <body className="antialiased max-w-[1920px] mx-auto">
        <HeaderSwitcher
            headerSettings={headerSettings}
            servicePages={servicePages}
            serviceAreaPages={serviceAreaPages}
        />
        {children}
        <Footer />
        </body>
        </html>
    );
}