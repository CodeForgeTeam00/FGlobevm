import { FaqBlock } from "./Block/FaqBlock";
import { SelectedPostsBlock } from "./Block/SelectedPostsBlock";
import { RelatedPostsBlock } from "./Block/RelatedPostsBlock";
import { SingleRelatedPostBlock } from "./Block/SingleRelatedPostBlock";
import { QuoteBlock } from "./Block/QuoteBlock";
import { VideoBlock } from "./Block/VideoBlock";
import { ImageBlock } from "./Block/ImageBlock";
import { BlogComponent } from "@/types/wp-blog";

function HtmlBlock({ html }: { html: string }) {
    return (
        <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:font-bold prose-strong:text-gray-900 my-6"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function mapRawPost(raw: any) {
    if (!raw) return null;
    return {
        title: raw.title,
        description: raw.description,
        categoryName: raw.category_name ?? raw.categoryName,
        categoryUrl: raw.category_url ?? raw.categoryUrl,
        date: raw.date,
        author: {
            name: raw.author?.name,
            avatar: typeof raw.author?.avatar === "string"
                ? { url: raw.author.avatar, alt: raw.author.name }
                : raw.author?.avatar ?? { url: "", alt: "" },
        },
        image: typeof raw.image === "string"
            ? { url: raw.image, alt: "" }
            : raw.image ?? { url: "", alt: "" },
        slug: raw.slug,
        id: raw.id,
    };
}

export default function ContentRenderer({ components }: { components: BlogComponent[] }) {
    return (
        <div className="flex flex-col gap-4">
            {components.map((block, index) => {
                switch (block.type) {
                    case "core/paragraph":
                    case "core/heading":
                    case "core/list":
                        return <HtmlBlock key={index} html={block.html} />;

                    case "acf/custom-image":
                        return <ImageBlock key={index} data={block.data} />;

                    case "acf/custom-video":
                        return <VideoBlock key={index} data={block.data} />;

                    case "acf/custom-quote":
                        return <QuoteBlock key={index} text={block.data.text} />;

                    case "acf/custom-faq":
                        return <FaqBlock key={index} faqs={block.data} />;

                    case "acf/selected-posts":
                        return (
                            <SelectedPostsBlock
                                key={index}
                                posts={block.data.map(mapRawPost).filter(Boolean)}
                            />
                        );

                    case "acf/single-related-post": {
                        const post = mapRawPost(block.data?.[0]);
                        return post ? <SingleRelatedPostBlock key={index} post={post} /> : null;
                    }

                    case "acf/related-posts":
                        return <RelatedPostsBlock key={index} posts={block.data} />;

                    default:
                        return null;
                }
            })}
        </div>
    );
}