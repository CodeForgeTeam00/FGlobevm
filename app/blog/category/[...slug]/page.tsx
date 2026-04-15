import Container from "@/Components/global/Sections/Container";
import BlogCard from "@/Components/global/Cards/BlogCard";
import CustomPagination from "@/Components/global/Pagination";
import { getBlogs } from "@/services/wp-blog";

interface Props {
    searchParams: Promise<{ page?: string }>;
}
export const dynamic = "force-dynamic";
import { mapBlogsResponse } from "@/mappers/blog-mapper";

export default async function CategoryPage({ searchParams }: Props) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    const rawBlog = await getBlogs({
        page: currentPage,
        per_page: 12,
    });

    const blog = mapBlogsResponse(rawBlog);

    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                {(blog?.posts ?? []).map((item) => (
                    <BlogCard hasAuthor key={item.id} data={item} />
                ))}
            </div>

            {blog?.pagination && (
                <CustomPagination
                    hasNext={blog.pagination.hasNext}
                    hasPrev={blog.pagination.hasPrev}
                    totalPages={blog.pagination.totalPages}
                    currentPage={blog.pagination.currentPage}
                />
            )}
        </Container>
    );
}