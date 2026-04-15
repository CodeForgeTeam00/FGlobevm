"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/Ui/pagination";
import { usePathname } from "next/navigation";

type Props = {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export default function CustomPagination({
                                             currentPage,
                                             totalPages,
                                             hasNext,
                                             hasPrev,
                                         }: Props) {
    const pathname = usePathname();
    const getPageUrl = (page: number) =>
        page === 1 ? pathname : `${pathname}?page=${page}`;
    return (
        <Pagination className="mt-8">
            <PaginationContent>
                {hasPrev && (
                    <PaginationItem>
                        <PaginationPrevious href={getPageUrl(currentPage - 1)} />
                    </PaginationItem>
                )}

                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                href={getPageUrl(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {hasNext && (
                    <PaginationItem>
                        <PaginationNext href={getPageUrl(currentPage + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}