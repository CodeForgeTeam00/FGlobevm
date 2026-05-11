import { getBlogBySlug } from "@/services/wp-blog";
import { getPreviewById } from "@/lib/preview";
import { mapPost } from "@/mappers/blog-mapper";
import { Hero } from "@/Components/page/Single/Block/HeroBlock";
import ContentRenderer from "@/Components/page/Single/ContentRenderer";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { yoastToMetadata } from "@/lib/yoast-to-metadata";
import type { YoastSEO } from "@/types/yoast";
import CommentSection from "@/Components/page/Single/Block/CommentSection";
import PreviewBar from "@/Components/global/PreviewBar";

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

    return (
        <div className="min-h-screen bg-white">
            {isEnabled && <PreviewBar slug={slug} type="post" />}
            <main className="max-w-[1200px] mx-auto  py-10">
                <Hero data={data} />
                <div className="mt-16 ">
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
    );
}