import BlogCard from "@/Components/global/Cards/BlogCard";
import { BlogPost } from "@/types/wp-blog";

export default function BlogSection({ data }: { data: BlogPost[] }) {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-6">
                    Insights & Updates
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    Stay informed with the latest tips, trends, and best
                    practices in IT, virtualization, and cybersecurity.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((blog, index) => (
                    <BlogCard key={index} data={blog} />
                ))}
            </div>
        </section>
    );
}
