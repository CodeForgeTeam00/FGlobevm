export function ParagraphBlock({ html }: { html: string }) {
    return (
        <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:font-bold prose-strong:text-gray-900 my-6"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}