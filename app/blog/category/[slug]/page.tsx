import Container from "@/Components/global/Sections/Container";
import BlogCard from "@/Components/global/Cards/BlogCard";
import CustomPagination from "@/Components/global/Pagination";
import { getBlogs } from "@/services/wp-blog";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug} Articles`,
        description: `Browse all articles in ${slug} category on GlobeVM blog.`,
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;

    console.log("CATEGORY PAGE HIT:", slug);

    const currentPage = Number(page) || 1;

    const rawBlog = await getBlogs({
        page: currentPage,
        per_page: 12,
        category_slug: slug,
    });

    const blog = mapBlogsResponse(rawBlog);

    return (
        <Container>
            <div className="py-10">
                <h1 className="text-3xl font-serif font-bold mb-8 capitalize">
                    {slug.replace(/-/g, " ")}
                </h1>

                {(blog?.posts ?? []).length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                            {blog!.posts.map((item) => (
                                <BlogCard hasAuthor key={item.id} data={item} />
                            ))}
                        </div>

                        {blog?.pagination && blog.pagination.totalPages > 1 && (
                            <div className="mt-10">
                                <CustomPagination
                                    hasNext={blog.pagination.hasNext}
                                    hasPrev={blog.pagination.hasPrev}
                                    totalPages={blog.pagination.totalPages}
                                    currentPage={blog.pagination.currentPage}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center py-20 text-gray-400">
                        No articles found in this category.
                    </p>
                )}
            </div>
        </Container>
    );
}