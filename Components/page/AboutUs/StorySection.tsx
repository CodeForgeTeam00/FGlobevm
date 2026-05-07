import Image from "next/image";
import { Check } from "lucide-react";
import { WPImage } from "@/types/wp-common";

const CHECKLIST = [
    "Creative Solutions",
    "Practical Expertise",
    "Detail-Oriented",
];

interface StorySectionProps {
    midSectionImage?: WPImage;
}

export default function StorySection({ midSectionImage }: StorySectionProps) {
    return (
        <section aria-label="Our Story" className="py-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                <div className="max-w-xl">
                    <span className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-8 bg-white shadow-sm">
                        Our Story
                    </span>

                    <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-[1.2]">
                        Managed IT and Cybersecurity That{" "}
                        <span className="text-[#1da1f2]">Scales</span> With You
                    </h2>

                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10">
                        From infrastructure management and cloud environments to
                        endpoint protection and network security, our services
                        are designed to keep your systems running smoothly and
                        your data protected. We provide proactive monitoring,
                        fast response, and long-term stability.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start sm:items-center">
                        <ul className="space-y-4">
                            {CHECKLIST.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-gray-700 font-medium text-sm"
                                >
                                    <Check
                                        size={18}
                                        className="text-emerald-500"
                                        strokeWidth={3}
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="hidden sm:block w-px h-24 bg-gray-200" />

                        <div className="flex flex-col">
                            <div className="flex items-baseline text-[#1da1f2] font-serif mb-1">
                                <span className="text-3xl font-bold">+</span>
                                <span className="text-6xl font-bold leading-none">
                                    8
                                </span>
                                <span className="text-lg font-medium text-gray-600 ml-1 font-sans">
                                    Years
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 max-w-[120px] leading-tight">
                                Building trust, project by project
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-emerald-50 rounded-[2.5rem] -z-10 transform rotate-2" />
                    <Image
                        src={midSectionImage?.url || "/assets/image/about-story.jpg"}
                        alt={midSectionImage?.alt || "GlobeVM team collaborating on IT infrastructure"}
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-[2rem] object-cover shadow-xl shadow-gray-200/50"
                    />
                </div>
            </div>
        </section>
    );
}