export function RelatedPostsBlock({ posts }: { posts: any[] }) {
    return (
        <div className="my-12 p-8 border border-gray-200 rounded-3xl bg-white shadow-sm">
            <h3 className="text-[#00a0e9] font-semibold text-sm tracking-wider uppercase mb-6">Related Posts</h3>
            <ul className="flex flex-col gap-4">
                {posts.map((post: any, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-gray-900">
                        <div className="w-2 h-2 rounded-full bg-[#00a0e9] flex-shrink-0" />
                        <a href={`/blog/${post.slug}`} className="font-medium hover:text-[#00a0e9] transition-colors text-lg">
                            {post.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}