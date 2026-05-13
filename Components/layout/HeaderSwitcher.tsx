"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import BlogHeader from "./BlogHeader";
import { HeaderSettings, CPTHeaderItem } from "@/types/wp-options";

interface BlogCategoryItem {
    name: string;
    slug: string;
}

interface Props {
    headerSettings: HeaderSettings | null;
    servicePages: CPTHeaderItem[] | null;
    serviceAreaPages: CPTHeaderItem[] | null;
    blogCategories: BlogCategoryItem[];
}

export default function HeaderSwitcher({
                                           headerSettings,
                                           servicePages,
                                           serviceAreaPages,
                                           blogCategories,
                                       }: Props) {
    const pathname = usePathname();
    const isBlog = pathname.startsWith("/blog");

    return isBlog ? (
        <BlogHeader categories={blogCategories} />
    ) : (
        <Header
            headerSettings={headerSettings}
            servicePages={servicePages}
            serviceAreaPages={serviceAreaPages}
        />
    );
}