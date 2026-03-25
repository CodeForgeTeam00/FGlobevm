import { HeroSection } from "@/Components/page/Home/HeroSection/HeroSection";
import { TrustedBy } from "@/Components/page/Home/TrustedBy";
import Image from "next/image";
import mask from "@/public/assets/image/heroSectionLayout.svg";
import { AboutStability } from "@/Components/page/Home/AboutStability";
import { WhyChooseUs } from "@/Components/page/Home/WhyChooseUs";
import { ManagedServices } from "@/Components/page/Home/ManagedServices";
import { ClientFeedback } from "@/Components/page/Home/ClientFeedback";
import { FAQSection } from "@/Components/page/Home/FAQSection";
import { BlogSection } from "@/Components/page/Home/BlogSection";
import { ContactCTA } from "@/Components/page/Home/ContactCTA";
import Container from "@/Components/global/Sections/Container";
import { getAllServices } from "@/services/wp-services";
import {getGlobalOptions} from "@/services/wp-home";
import {CalendarIcon} from "@/Components/global/Icons";
import BlogCard from "@/Components/global/Cards/BlogCard";
 const blogCardMock = [
    {

        title: "10 Tips for Effective Remote Work",
        categoryName: "Productivity",
        categoryUrl: "/category/productivity",
        author: "Jane Doe",
        date: "March 24, 2026",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        className: "max-w-sm rounded-lg shadow-lg overflow-hidden"
    },
    {
        title: "Understanding React Hooks",
        categoryName: "Web Development",
        categoryUrl: "/category/web-development",
        author: "John Smith",
        date: "March 20, 2026",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        className: "max-w-sm rounded-lg shadow-lg overflow-hidden"
    },
     {
         title: "Understanding React Hooks",
         categoryName: "Web Development",
         categoryUrl: "/category/web-development",
         author: "John Smith",
         date: "March 20, 2026",
         imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
         className: "max-w-sm rounded-lg shadow-lg overflow-hidden"
     },
     {
         title: "Understanding React Hooks",
         categoryName: "Web Development",
         categoryUrl: "/category/web-development",
         author: "John Smith",
         date: "March 20, 2026",
         imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
         className: "max-w-sm rounded-lg shadow-lg overflow-hidden"
     }
];
export default async function Home() {

    return (
        <div className="relative ">
            <Container bemClass={"hero__section"}>
                <div className="flex gap-4 flex-col lg:flex-row  p-4">
                    {blogCardMock.map((item, index) => (
                        <BlogCard key={index} {...item} />
                    ))}
                </div>
            </Container>

        </div>
    );
}

