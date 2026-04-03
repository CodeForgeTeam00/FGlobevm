import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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
    return (
        <Pagination className="mt-8">
            <PaginationContent>

                {/* Previous */}
                {hasPrev && (
                    <PaginationItem>
                        <PaginationPrevious href={`?page=${currentPage - 1}`} />
                    </PaginationItem>
                )}

                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`?page=${page}`}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next */}
                {hasNext && (
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                )}

            </PaginationContent>
        </Pagination>
    );
}