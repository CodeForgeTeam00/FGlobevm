import Image from "next/image";
import { Share2, MessageCircle, Calendar, Home, ChevronRight } from "lucide-react";
import Link from "next/link";

function extractCategorySlug(url: string): string | null {
    try {
        const segments = new URL(url).pathname.split('/').filter(Boolean)
        const idx = segments.indexOf('category')
        return idx !== -1 ? segments[idx + 1] ?? null : null
    } catch {
        return null
    }
}
export function Hero({ data }: { data: any }) {
    const isSubcategory = Boolean(data.subcategoryName)

    return (
        <div className="flex flex-col gap-8">
            <div className="text-sm text-gray-400 mb-2">
                <Link href="/blog" className="hover:text-primary-6">home</Link>
                <span className="mx-2">›</span>
                <Link href={`/blog/category/${extractCategorySlug(data.categoryUrl)}`} className="hover:text-primary-6">
                    {data.categoryName}
                </Link>
                {isSubcategory && (
                    <>
                        <span className="mx-2">›</span>
                        <Link
                            href={`/blog/category/${data.categoryName}/${data.subcategoryName}`}
                            className="hover:text-primary-6"
                        >
                            {data.subcategoryName}
                        </Link>
                    </>
                )}
            </div>
            <h1 className="blog-content title">
                {data.title}
            </h1>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mt-2">
                <div className="flex items-center gap-4">
                    <Image
                        src={data.author.avatar?.url || ""}
                        alt={data.author.avatar?.alt || data.author.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-gray-100"
                        unoptimized
                    />
                    <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-gray-900">By {data.author.name}</span>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(data.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 text-gray-500">
                    <button className="hover:text-[#00a0e9] transition-colors"><Share2 className="w-5 h-5" /></button>
                    <button className="hover:text-[#00a0e9] transition-colors"><MessageCircle className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="relative w-full aspect-[21/9] mt-2 rounded-[2rem] overflow-hidden shadow-sm">
                <Image
                    src={data.image?.url || ""}
                    alt={data.image?.alt || data.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
            </div>
        </div>
    );
}