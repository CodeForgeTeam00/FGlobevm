import BlogCard from "@/Components/global/Cards/BlogCard";
import { BlogPost } from "@/types/wp-blog";
import SectionIntro from "@/Components/global/SectionIntro";
export default function BlogSection({ data }: { data: BlogPost[] }) {
    return (
        <section className="py-20 flex flex-col gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8">
            <SectionIntro
                lgCenter={true}
                title={"  Insights & Updates"}
                description={"Stay informed with the latest tips, trends, and best practices in IT, virtualization, and cybersecurity."}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((blog, index) => (
                    <BlogCard key={index} data={blog} />
                ))}
            </div>
        </section>
    );
}
