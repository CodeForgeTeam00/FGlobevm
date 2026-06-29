import Image from "next/image";
import { Check } from "lucide-react";
import { WPImage } from "@/types/wp-common";
import SectionIntro from "@/components/global/SectionIntro";
import React from "react";
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
        <section aria-label="OurStory "  className={'-mt-16 py-4 lg:py-24'}>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 justify-center  items-center">
                <div className=" flex flex-col items-center lg:items-start gap-14 ">
                    <SectionIntro
                        badge={'Our Story'}
                        title={"Managed IT and Cybersecurity That Scales With You"}
                        description="From infrastructure management and cloud environments to endpoint protection and network security, our services are designed to keep your systems running smoothly and your data protected. We provide proactive monitoring, fast response, and long-term stability."
                    />
                    <div className="flex flex-row gap-8 sm:gap-12 items-start sm:items-center lg:items-start">
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