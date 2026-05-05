import Container from "@/Components/global/Sections/Container";
import BlogCard from "@/Components/global/Cards/BlogCard";
import CustomPagination from "@/Components/global/Pagination";
import { getBlogs, getSubCategories, getCategorySeoBox } from "@/services/wp-blog";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import Link from "next/link";
import SeoBoxSection from "@/Components/global/SeoBoxSection";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ page?: string; sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categoryName = slug[slug.length - 1];
    return {
        title: `${categoryName} Articles`,
        description: `Browse all articles in ${categoryName} category on GlobeVM blog.`,
    };
}

const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Trends", value: "trends" },
];

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page, sort } = await searchParams;

    const currentPage = Number(page) || 1;
    const currentSort = sort || "newest";
    const categorySlug = slug[slug.length - 1];
    const isSubcategory = slug.length > 1;
    const parentSlug = isSubcategory ? slug[0] : categorySlug;

    const [rawBlog, subCategories, seoBox] = await Promise.all([
        getBlogs({
            page: currentPage,
            per_page: 12,
            category_slug: categorySlug,
            sort: currentSort,
        }),
        isSubcategory ? Promise.resolve([]) : getSubCategories(parentSlug),
        getCategorySeoBox(categorySlug),
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const basePath = `/blog/category/${slug.join("/")}`;

    function buildSortUrl(sortValue: string) {
        const params = new URLSearchParams();
        params.set("sort", sortValue);
        return `${basePath}?${params.toString()}`;
    }

    return (
        <Container>
            <div className="py-10">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-2">
                    <Link href="/" className="hover:text-primary-6">home</Link>
                    <span className="mx-2">›</span>
                    <Link href={`/blog/category/${parentSlug}`} className="hover:text-primary-6">
                        {parentSlug}
                    </Link>
                    {isSubcategory && <span className="mx-2">›</span>}
                </div>

                <h1 className="text-4xl font-serif font-bold mb-6 capitalize">
                    {categorySlug.replace(/-/g, " ")}
                </h1>

                {/* Subcategory Chips */}
                {!isSubcategory && subCategories.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {subCategories.map((sub) => (
                            <Link
                                key={sub.slug}
                                href={`/blog/category/${parentSlug}/${sub.slug}`}
                                className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-primary-6 hover:text-primary-6 transition"
                            >
                                {sub.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Sort Bar */}
                <div className="flex items-center gap-4 border border-gray-200 rounded-full px-6 py-3 mb-8">
                    <span className="text-sm text-gray-500">Sort By:</span>
                    {SORT_OPTIONS.map((option) => (
                        <Link
                            key={option.value}
                            href={buildSortUrl(option.value)}
                            className={`text-sm transition ${
                                currentSort === option.value
                                    ? "text-primary-6 font-medium"
                                    : "text-gray-500 hover:text-primary-6"
                            }`}
                        >
                            {option.label}
                        </Link>
                    ))}
                </div>

                {/* Posts Grid */}
                {(blog?.posts ?? []).length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0">
                            {blog!.posts.map((item) => (
                                <BlogCard layout="vertical" key={item.id} data={item} />

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


                {seoBox && (
                    <SeoBoxSection content={seoBox} title="All About The GlobeVM" />
                )}
            </div>
        </Container>
    );
}