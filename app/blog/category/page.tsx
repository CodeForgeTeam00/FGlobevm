"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/Components/global/Sections/Container";
import BlogCard from "@/Components/global/Cards/BlogCard";
import CustomPagination from "@/Components/global/Pagination";
import { getBlogs } from "@/services/wp-blog";

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("per_page") || 1);

    const [posts, setPosts] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            console.log("🔥 Fetching page:", currentPage);

            const Blog = await getBlogs({
                page: currentPage,
                per_page: 12,
            });

            console.log("🔥 New Data:", Blog.pagination);

            setPosts(Blog.posts);
            setPagination(Blog.pagination);

            setLoading(false);
        };

        fetchData();
    }, [currentPage]);

    return (
        <Container>
            {loading && <p>Loading...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                {posts.map((item) => (
                    <BlogCard hasAuthor key={item.id} data={item} />
                ))}
            </div>

            {pagination && (
                <CustomPagination
                    hasNext={pagination.hasNext}
                    hasPrev={pagination.hasPrev}
                    totalPages={pagination.totalPages}
                    currentPage={pagination.currentPage}
                />
            )}
        </Container>
    );
}