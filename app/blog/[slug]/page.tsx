import { getBlogBySlug } from "@/services/wp-blog";
import { getPreviewById } from "@/lib/preview";
import { mapPost } from "@/mappers/blog-mapper";
import { Hero } from "@/components/page/Single/Block/HeroBlock";
import ContentRenderer from "@/components/page/Single/ContentRenderer";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import CommentSection from "@/components/page/Single/Block/CommentSection";
import PreviewBar from "@/components/global/PreviewBar";
import JsonLd from "@/components/global/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string; id?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const raw = await getBlogBySlug(slug);
    if (!raw) return { title: "Post Not Found" };
    if (raw.yoast_head_json) {
        return yoastToMetadata(raw.yoast_head_json as YoastSEO, {
            canonicalOverride: `https://www.globevm.com/blog/${slug}`,
        });
    }
    const data = mapPost(raw);
    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://www.globevm.com/blog/${slug}`,
        },
    };
}

export default async function BlogPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { preview, id } = await searchParams;
    const { isEnabled } = await draftMode();

    let raw;

    if (isEnabled && preview === "true" && id) {
        raw = await getPreviewById(id);
    } else {
        raw = await getBlogBySlug(slug);
    }

    if (!raw) notFound();

    const data = mapPost(raw);

    const yoast = raw.yoast_head_json as YoastSEO | undefined;

    const headline = yoast?.title || data.title || "";
    const description = yoast?.description || data.description || "";
    const datePublished = yoast?.article_published_time || raw.date || "";
    const dateModified = yoast?.article_modified_time || raw.modified || datePublished;
    const image = yoast?.og_image?.[0]?.url || data.image?.url;

    const faqBlocks = (raw.components ?? []).filter(
        (block: any) => block.type === "acf/custom-faq"
    );

    const allFaqs = faqBlocks.flatMap((block: any) =>
        Array.isArray(block.data) ? block.data : []
    );

    const schemas: object[] = [
        webPageSchema({
            title: headline,
            url: `${SITE.url}/blog/${slug}/`,
            description,
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Blog", url: `${SITE.url}/blog/` },
            { name: data.title || "Post", url: `${SITE.url}/blog/${slug}/` },
        ]),
        articleSchema({
            headline,
            description,
            datePublished,
            dateModified,
            image,
        }),
    ];


        schemas.push(
            faqSchema(
                allFaqs.map((f: any) => ({
                    question: f.question,
                    answer: f.answer,
                }))
            )
        );
    return (
        <>
            <JsonLd data={schemas} />
            <div className="min-h-screen bg-white">
                {isEnabled && <PreviewBar slug={slug} type="post" />}
                <main className="max-w-[1200px] mx-auto py-10">
                    <Hero data={data} />
                    <div className="mt-16">
                        <ContentRenderer components={raw.components ?? []} />
                        {raw.comments_data && (
                            <CommentSection
                                data={raw.comments_data}
                                postId={raw.id}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}