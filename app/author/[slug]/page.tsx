import Container from "@/components/global/Sections/Container";
import BlogCard from "@/components/global/Cards/BlogCard";
import CustomPagination from "@/components/global/Pagination";
import { getBlogs, getAuthorBySlug } from "@/services/wp-blog";
import { mapBlogsResponse } from "@/mappers/blog-mapper";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Text from "@/components/global/text";
import type { Metadata } from "next";
import AskAuthorButton from "@/components/page/Author/AskAuthorButton";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string; sort?: string }>;
}

const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Trends", value: "trends" },
];

const SOCIAL_ICONS: Record<string, (cls: string) => React.ReactNode> = {
    instagram: (cls) => (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
    ),
    x: (cls) => (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    facebook: (cls) => (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    ),
    linkedin: (cls) => (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    youtube: (cls) => (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        return { title: "Author Not Found" };
    }

    return {
        title: `${author.name} - Author at GlobeVM`,
        description: author.description || `Articles written by ${author.name} on GlobeVM blog.`,
    };
}

export default async function AuthorPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page, sort } = await searchParams;

    const currentPage = Number(page) || 1;
    const currentSort = sort || "newest";

    const [author, rawBlog] = await Promise.all([
        getAuthorBySlug(slug),
        getBlogs({
            page: currentPage,
            per_page: 12,
            sort: currentSort,
            author_slug: slug,
        }),
    ]);

    if (!author) notFound();

    const blog = mapBlogsResponse(rawBlog);
    const basePath = `/blog/author/${slug}`;

    const socials = Object.entries(author.socials || {}).filter(
        ([, url]) => url && url.trim() !== ""
    );

    const expertise = author.areas_expertise;
    const credentials = author.credentials;
    const linkedinUrl = author.socials?.linkedin || "";

    function buildSortUrl(sortValue: string) {
        const params = new URLSearchParams();
        params.set("sort", sortValue);
        return `${basePath}?${params.toString()}`;
    }

    return (
        <div>
            {/* ========= HERO ========= */}
            <div className="relative bg-primary-7 overflow-hidden lg:h-[410px]">
                <Image
                    src="/assets/image/author.png"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <Container>
                    <div className="relative py-12 lg:py-16">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="size-24  lg:size-52 rounded-full overflow-hidden border-4 border-white/20">
                                    <Image
                                        src={author.avatar?.url || ""}
                                        alt={author.avatar?.alt || author.name}
                                        width={160}
                                        height={160}
                                        className="object-cover w-full h-full"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-grow text-center lg:text-left">
                                <Text variant="heading-md" as="h1" textColor="white" className="mb-1">
                                    {author.name}
                                </Text>
                                {author.job && (
                                    <Text variant="body-md" textColor="white" className=" mb-4">
                                        {author.job}
                                    </Text>
                                )}
                                {/* Badges from expertise items */}
                                {expertise && expertise.items && expertise.items.length > 0 && (
                                    <div className="flex flex-wrap justify-center items-center  lg:justify-start gap-2 mb-6 lg:mb-10">
                                        {expertise.items.slice(0, 4).map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full flex items-center  h-8 bg-[#696e72]  text-white text-xs font-medium  "
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {/* Buttons */}
                                <div className=" grid sm:grid-cols-2 grid-cols-1 gap-3 lg:flex">
                                    {linkedinUrl && (
                                        <a
                                            href={linkedinUrl}
                                            target="_blank"
                                            rel="nofollow noopener"
                                            className="px-5 py-2.5 bg-primary-6 hover:bg-primary-6/90   text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Connect on LinkedIn
                                        </a>
                                    )}
                                    <AskAuthorButton authorName={author.name} authorSlug={author.slug} />
                                </div>
                            </div>

                            {/* Social Icons */}
                            {socials.length > 0 && (
                                <div className="flex lg:flex-row gap-3 flex-shrink-0">
                                    {socials.map(([name, url]) => {
                                        const iconFn = SOCIAL_ICONS[name];
                                        if (!iconFn) return null;
                                        return (
                                            <a
                                                key={name}
                                                href={url}
                                                target="_blank"
                                                rel="nofollow noopener"
                                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20"
                                            >
                                                {iconFn("w-4 h-4")}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* ========= ABOUT + EXPERTISE ========= */}
            {(author.description || (expertise && expertise.items && expertise.items.length > 0)) && (
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-12">
                        {/* About */}
                        {author.description && (
                            <div className="bg-white rounded-2xl border border-neutral-30 p-8">
                                <Text variant="heading-sm" as="h2" className="mb-4">
                                    About The Author
                                </Text>
                                <Text variant="body-sm" textColor="mid" className="leading-relaxed">
                                    {author.description}
                                </Text>
                            </div>
                        )}

                        {/* Areas of Expertise */}
                        {expertise && expertise.items && expertise.items.length > 0 && (
                            <div className="bg-white rounded-2xl border border-neutral-30 p-8">
                                <Text variant="heading-sm" as="h2" className="mb-2">
                                    Areas of Expertise
                                </Text>
                                {expertise.description && (
                                    <Text variant="body-sm" textColor="muted" className="mb-6">
                                        {expertise.description}
                                    </Text>
                                )}
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {expertise.items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-3 rounded-2xl bg-neutral-20 text-neutral-100 text-nowrap flex justify-center flex-1 cursor-pointer transition-all hover:bg-primary-1 hover:text-primary-6 "
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            )}

            {/* ========= CREDENTIALS ========= */}
            {credentials && credentials.length > 0 && (
                <Container>
                    <div className="pb-12">
                        <Text variant="heading-sm" as="h2" className="mb-8">
                            Credentials
                        </Text>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {credentials.map((cred, index) => (
                                <div
                                    key={index}
                                    className="flex gap-5 items-start bg-white rounded-2xl border border-neutral-30 p-6"
                                >
                                    {cred.image?.url && (
                                        <div className="flex-shrink-0 w-24 h-24 lg:w-32 lg:h-24 rounded-xl overflow-hidden border border-neutral-30">
                                            <Image
                                                src={cred.image.url}
                                                alt={cred.image.alt || cred.title}
                                                width={128}
                                                height={96}
                                                className="object-cover w-full h-full"
                                                unoptimized
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <Text variant="card-title-md" className="mb-1">
                                            {cred.title}
                                        </Text>
                                        <Text variant="body-sm" textColor="muted">
                                            {cred.description}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            )}
            {/* ========= POSTS ========= */}
            <Container>
                <div className="py-10">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {blog!.posts.map((item) => (
                                    <BlogCard  key={item.id} data={item} />
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
                            No articles found by this author.
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}