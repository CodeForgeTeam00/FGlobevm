import Container from "@/Components/global/Sections/Container";
import BlogCard from "@/Components/global/Cards/BlogCard";
import CustomPagination from "@/Components/global/Pagination";
import { getBlogs, getSubCategories } from "@/services/wp-blog";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import Link from "next/link";
import type { Metadata } from "next";
interface Props {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ page?: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = slug[slug.length - 1];
    return {
        title: `${categoryName} Articles`,
        description: `Browse all articles in ${categoryName} category on GlobeVM blog.`,
    };
}
export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;

    const currentPage = Number(page) || 1;
    const categorySlug = slug[slug.length - 1];
    const isSubcategory = slug.length > 1;
    const parentSlug = isSubcategory ? slug[0] : categorySlug;

    const [rawBlog, subCategories] = await Promise.all([
        getBlogs({
            page: currentPage,
            per_page: 12,
            category_slug: categorySlug,
        }),
        getSubCategories(parentSlug),
    ]);

    const blog = mapBlogsResponse(rawBlog);

    return (
        <Container>
            <div className="py-10">
                <div className="text-sm text-gray-400 mb-4">
                    {isSubcategory && (
                        <>
                            <Link
                                href={`/blog/category/${parentSlug}`}
                                className="hover:text-[#00a0e9]"
                            >
                                {parentSlug}
                            </Link>
                            <span className="mx-2">›</span>
                        </>
                    )}
                </div>

                <h1 className="text-4xl font-serif font-bold mb-6 capitalize">
                    {categorySlug.replace(/-/g, " ")}
                </h1>

                {subCategories.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {subCategories.map((sub) => {
                            const subUrl = `/blog/category/${parentSlug}/${sub.slug}`;
                            const isActive = sub.slug === categorySlug;

                            return (
                                <Link
                                    key={sub.slug}
                                    href={subUrl}
                                    className={`px-4 py-2 rounded-full border text-sm transition ${
                                        isActive
                                            ? "bg-[#00a0e9] text-white border-[#00a0e9]"
                                            : "border-gray-200 text-gray-700 hover:border-[#00a0e9] hover:text-[#00a0e9]"
                                    }`}
                                >
                                    {sub.name}
                                </Link>
                            );
                        })}
                    </div>
                )}

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