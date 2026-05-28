import Link from "next/link";

interface Props {
    slug: string;
    type: string;
}

export default function PreviewBar({ slug, type }: Props) {
    return (
        <div className="bg-yellow-400 text-black text-center py-2 text-sm font-medium sticky top-0 z-[60]">
            Preview Mode —{" "}
            <Link
                href={`/api/exit-preview?slug=${slug}&type=${type}`}
                className="underline font-bold"
            >
                Exit Preview
            </Link>
        </div>
    );
}