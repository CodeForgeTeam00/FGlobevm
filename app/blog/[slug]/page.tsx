import { getBlogBySlug } from "@/services/wp-blog";
import { mapPost } from "@/mappers/blog-mapper";
import { Hero } from "@/Components/page/Single/Block/HeroBlock";
import ContentRenderer from "@/Components/page/Single/ContentRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const raw = await getBlogBySlug(slug);
    if (!raw) return { title: "Post Not Found" };
    const data = mapPost(raw);
    return {
        title: data.title,
        description: data.description,
    };
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;
    const raw = await getBlogBySlug(slug);

    if (!raw) notFound();

    const data = mapPost(raw);
    console.log(data)
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-6xl mx-auto px-4 py-10">
                <Hero data={data} />
                <div className="mt-16 max-w-4xl mx-auto">
                    <ContentRenderer components={raw.components ?? []} />
                </div>
            </main>
        </div>
    );
}