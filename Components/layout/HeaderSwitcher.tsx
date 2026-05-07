"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import BlogHeader from "./BlogHeader";
import { HeaderSettings, CPTHeaderItem } from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
}

export default function HeaderSwitcher({
                                           headerSettings,
                                           servicePages,
                                           serviceAreaPages,
                                       }: Props) {
    const pathname = usePathname();
    const isBlog = pathname.startsWith("/blog");

    return isBlog ? (
        <BlogHeader />
    ) : (
        <Header
            headerSettings={headerSettings}
            servicePages={servicePages}
            serviceAreaPages={serviceAreaPages}
        />
    );
}