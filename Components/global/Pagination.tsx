"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}  from "@/Components/Ui/pagination";
import { useRouter, usePathname } from "next/navigation";

type Props = {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export default function CustomPagination({ currentPage, totalPages, hasNext, hasPrev }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const goToPage = (page: number) => {
        const url = `${pathname}?per_page=${page}`;
        console.log("🚀 Navigate to:", url);

        router.push(url);
    };

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {/* Previous */}
                {hasPrev && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => goToPage(currentPage - 1)}
                        />
                    </PaginationItem>
                )}

                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next */}
                {hasNext && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => goToPage(currentPage + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}