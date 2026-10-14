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
import { JsonLd } from "@/components/JsonLd";
import { blogPostSchema } from "@/lib/schema/builders";
import ViewTracker from "@/components/global/ViewTracker";

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
    const data = raw;
    return {
        title: data.yoast_head_json.title,
        description: data.yoast_head_json.description,
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

    const headline = data.title || yoast?.title || "";
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

    const schema = blogPostSchema({
        path: `/blog/${slug}/`,
        meta: {
            title: headline,
            description,
        },
        headline,
        image: data.image?.url
            ? {
                url: data.image.url,
                width: yoast?.og_image?.[0]?.width || 1200,
                height: yoast?.og_image?.[0]?.height || 630,
                alt: data.image.alt,
            }
            : null,
        publishedGmt: raw.date_gmt || raw.date || "",
        modifiedGmt: raw.modified_gmt || raw.modified || "",
        author: "nazy-rafaeil",
        categorySlug: raw.categories?.[0]?.slug || raw.category?.slug || "",
        faqs: allFaqs.length > 0
            ? allFaqs.map((f: { question: string; answer: string }) => ({
                question: f.question,
                answer: f.answer,
            }))
            : undefined,
    });


    return (
        <>
            <JsonLd data={schema} />
            {!isEnabled && <ViewTracker postId={raw.id} />}
            <div className="min-h-screen bg-white">
                {isEnabled && <PreviewBar slug={slug} type="post" />}
                <main className="max-w-[1200px] mx-auto py-10">
                    <Hero data={data} />
                    <div className="mt-4 lg:mt-16 px-6 xl:px-0">
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