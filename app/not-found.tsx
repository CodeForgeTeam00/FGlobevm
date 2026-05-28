import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import Text from "@/components/global/text";

export const metadata: Metadata = {
    title: "Page Not Found | GlobeVM",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="text-center ">
                <Text variant="heading-lg" textColor="black" className="font-serif mb-4">
                    Oops...
                </Text>
                <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] mb-12">
                    LOOKS LIKE SOMETHINGWASWRONG WE’REWORKING ON IT
                </p>
                <div className="mb-10 w-[100dvw]    flex relative xl:after:content-[''] after:block after:absolute overflow-hidden  after:w-screen after:h-[2px] after:bg-neutral-40 after:mt-4">
                    <Image
                        src="/assets/image/404.svg"
                        alt=""
                        width={340}
                        height={340}
                        className="w-full lg:w-[1320px] mx-auto "
                        priority
                    />
                </div>
                <Text variant="heading-lg" textColor="black" className="text-5xl sm:text-6xl mb-2">
                    404
                </Text>
                <p className="text-gray-500 text-sm mb-10">
                    Page not found
                </p>
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