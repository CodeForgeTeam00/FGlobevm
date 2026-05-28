import Container from "@/components/global/Sections/Container";
import BlogCard from "@/components/global/Cards/BlogCard";
import CustomPagination from "@/components/global/Pagination";
import { getBlogs, getSubCategories, getCategorySeoBox } from "@/services/wp-blog";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import Link from "next/link";
import SeoBoxSection from "@/components/global/SeoBoxSection";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

interface Props {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ page?: string; sort?: string }>;
}

async function fetchCategoryWithYoast(slug: string) {
    const base = process.env.WORDPRESS_API_URL;
    if (!base) return null;

    const url = `${base}/wp/v2/categories?slug=${encodeURIComponent(slug)}&per_page=1`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.[0] ?? null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const categorySlug = slug[slug.length - 1];

    const category = await fetchCategoryWithYoast(categorySlug);

    if (category?.yoast_head_json) {
        return yoastToMetadata(category.yoast_head_json as YoastSEO, {
            canonicalOverride: `https://www.globevm.com/blog/category/${slug.join("/")}`,
        });
    }

    const categoryName = slug[slug.length - 1];
    return {
        title: `${categoryName} Articles`,
        description: `Browse all articles in ${categoryName} category on GlobeVM blog.`,
        alternates: {
            canonical: `https://www.globevm.com/blog/category/${slug.join("/")}`,
        },
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

    const [rawBlog, subCategories, seoBox, category] = await Promise.all([
        getBlogs({
            page: currentPage,
            per_page: 12,
            category_slug: categorySlug,
            sort: currentSort,
        }),
        isSubcategory ? Promise.resolve([]) : getSubCategories(parentSlug),
        getCategorySeoBox(categorySlug),
        fetchCategoryWithYoast(categorySlug),
    ]);

    const blog = mapBlogsResponse(rawBlog);
    const basePath = `/blog/category/${slug.join("/")}`;

    function buildSortUrl(sortValue: string) {
        const params = new URLSearchParams();
        params.set("sort", sortValue);
        return `${basePath}?${params.toString()}`;
    }

    const yoast = category?.yoast_head_json as YoastSEO | undefined;
    const categoryName = category?.name || categorySlug.replace(/-/g, " ");

    const breadcrumbItems: Array<{ name: string; url: string }> = [
        { name: "Home", url: `${SITE.url}/` },
        { name: "Blog", url: `${SITE.url}/blog/` },
    ];

    if (isSubcategory) {
        breadcrumbItems.push({
            name: parentSlug.replace(/-/g, " "),
            url: `${SITE.url}/blog/category/${parentSlug}/`,
        });
    }

    breadcrumbItems.push({
        name: categoryName,
        url: `${SITE.url}/blog/category/${slug.join("/")}/`,
    });

    const schemas: object[] = [
        webPageSchema({
            title: yoast?.title || `${categoryName} Articles`,
            url: `${SITE.url}/blog/category/${slug.join("/")}/`,
            description: yoast?.description || `Browse all articles in ${categoryName} category on GlobeVM blog.`,
        }),
        breadcrumbSchema(breadcrumbItems),
    ];
    return (
        <>
            <JsonLd data={schemas} />
            <Container>
                <div className="py-10">
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
        </>
    );
}