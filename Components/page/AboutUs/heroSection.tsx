import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import Container from "@/Components/global/Sections/Container";
import { StatsBar } from "./StatsBar";

interface HeroSectionProps {
    featuredImage?: string;
}

export default function HeroSection({ featuredImage }: HeroSectionProps) {
    return (
        <section
            aria-label="About GlobeVM"
            className="relative bg-black pt-20 pb-32 sm:pt-28 sm:pb-40 px-4 sm:px-6 lg:px-8 mb-20"
        >
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-60 lg:opacity-100">
                <Image
                    src={featuredImage || "/assets/image/about-hero.jpg"}
                    alt="GlobeVM IT security professional"
                    fill
                    className="object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_30%)] lg:[mask-image:linear-gradient(to_right,transparent,black_20%)]"
                    priority
                />
            </div>

            <Container>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center border border-[#1da1f2]/40 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-medium tracking-wide mb-8 bg-black/50 backdrop-blur-sm">
                            About us
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-[1.15]">
                            Proactive IT That Keeps Your Business{" "}
                            <span className="text-[#1da1f2]">Secure</span>
                        </h1>

                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
                            We manage, secure, and optimize your infrastructure
                            so your team can focus on growth instead of
                            downtime.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact-us"
                                className="bg-[#1da1f2] hover:bg-[#1a91da] text-white rounded-xl px-6 py-3.5 font-medium flex items-center gap-2.5 transition-colors shadow-lg shadow-[#1da1f2]/20"
                            >
                                <Calendar size={18} />
                                Book A Free Consultation
                            </Link>
                            <a
                                href="tel:3107504939"
                                className="bg-white hover:bg-gray-50 text-gray-900 rounded-xl px-6 py-3.5 font-medium flex items-center gap-2.5 transition-colors"
                            >
                                <Phone size={18} className="text-gray-500" />
                                Get A Free Penetration Test
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

            <StatsBar />
        </section>
    );
}
