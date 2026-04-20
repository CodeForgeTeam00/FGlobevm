"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import BlogHeader from "./BlogHeader";
import { HeaderSettings } from "@/types/wp-options";

interface Props {
    headerSettings: HeaderSettings | null;
}

export default function HeaderSwitcher({ headerSettings }: Props) {
    const pathname = usePathname();
    const isBlog = pathname.startsWith("/blog");

    return isBlog ? <BlogHeader /> : <Header headerSettings={headerSettings} />;
}