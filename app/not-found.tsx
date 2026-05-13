import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Text from "@/Components/global/text";

export const metadata: Metadata = {
    title: "Page Not Found | GlobeVM",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-xl">
                {/* Title */}
                <Text variant="heading-lg" textColor="black" className="font-serif mb-4">
                    Oops...
                </Text>
                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] mb-12">
                    Looks like something was wrong, we&apos;re working on it
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-12" />

                {/* Robot illustration */}
                <div className="mb-10">
                    <Image
                        src="/images/404-robot.svg"
                        alt=""
                        width={340}
                        height={340}
                        className="mx-auto w-64 sm:w-80"
                        priority
                    />
                </div>

                {/* 404 */}
                <Text variant="heading-lg" textColor="black" className="text-5xl sm:text-6xl mb-2">
                    404
                </Text>
                <p className="text-gray-500 text-sm mb-10">
                    Page not found
                </p>

                {/* CTA */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary-6 hover:bg-primary-6/90 text-white px-7 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-6/20"
                >
                    Back to home
                    <Home size={16} strokeWidth={2.5} />
                </Link>
            </div>
        </section>
    );
}