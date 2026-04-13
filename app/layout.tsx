import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/layout/Header";
import { Footer } from "@/Components/layout/Footer";

export const metadata: Metadata = {
    title: {
        default: "GlobeVM Digital Services | Managed IT & Cybersecurity",
        template: "%s | GlobeVM",
    },
    description:
        "GlobeVM Digital Services provides managed IT, cybersecurity, and cloud solutions for businesses in Los Angeles and beyond.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="antialiased max-w-[1920px] mx-auto">
        <div className="container max-w-[1540px] mx-auto">
            <Header />
        </div>
        {children}
        <Footer />
        </body>
        </html>
    );
}