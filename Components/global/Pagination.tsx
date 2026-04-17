"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, "ellipsis", total];
    }

    if (current >= total - 2) {
        return [1, "ellipsis", total - 2, total - 1, total];
    }

    return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export default function CustomPagination({
                                             currentPage,
                                             totalPages,
                                             hasNext,
                                             hasPrev,
                                         }: Props) {
    const pathname = usePathname();
    const getPageUrl = (page: number) =>
        page === 1 ? pathname : `${pathname}?page=${page}`;

    const pages = getPageNumbers(currentPage, totalPages);

    return (
        <nav aria-label="pagination" className="mt-8 flex items-center gap-6">
            <div className="inline-flex items-center gap-1 border border-neutral-30 rounded-full p-2 px-4">
                {hasPrev && (
                    <Link
                        href={getPageUrl(currentPage - 1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-50 transition"
                        aria-label="Previous page"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </Link>
                )}

                {pages.map((p, i) =>
                    p === "ellipsis" ? (
                        <span
                            key={i}
                            className="flex items-center justify-center w-10 h-10 text-gray-400"
                        >
                            ...
                        </span>
                    ) : (
                        <Link
                            key={i}
                            href={getPageUrl(p)}
                            className={`flex items-center justify-center w-7 h-7 rounded-sm text-sm font-medium transition ${
                                p === currentPage
                                    ? "bg-primary-6 text-white"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                            aria-current={p === currentPage ? "page" : undefined}
                        >
                            {p}
                        </Link>
                    )
                )}
                {hasNext && (
                    <Link
                        href={getPageUrl(currentPage + 1)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#00a0e9] transition"
                    >
                        Next Page
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>


        </nav>
    );
}