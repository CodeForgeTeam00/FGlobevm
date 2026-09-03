export function TableBlock({ html }: { html: string }) {
    return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-neutral-30">
            <div
                className="table-block"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}