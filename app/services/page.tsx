import ServicesHeroSection from "@/Components/page/SrvicesPage/HeroSection";
import WayChooseUsSection from "@/Components/page/SrvicesPage/WayChooseUsSection";
import Features from "@/Components/page/SrvicesPage/WayChooseUsSection";
import Container from "@/Components/global/Sections/Container";
import AllServices from "@/Components/page/SrvicesPage/AllService";
import Testimonials from "@/Components/page/SrvicesPage/Testimonials";
import QBox from "@/Components/page/SrvicesPage/QBox";
import {getBlogSeoBox} from "@/services/wp-blog-seo";
import {getBlogs} from "@/services/wp-blog";
import {getBlogEditorChoice} from "@/services/wp-blog-editor-choice";
import {getBlogCategoryPopular} from "@/services/wp-blog-category-popular";
import BlogSection from "@/Components/page/SrvicesPage/PostSection";
import {ContactCTA} from "@/Components/page/Home/ContactCTA";


export default async function Services() {
    const [Blog ] = await Promise.all([

        getBlogs({per_page: 4 }),

    ]);
    return (
        <div className="relative ">
            <ServicesHeroSection/>
            <Container>
                <Features/>
            </Container>
            <AllServices/>
            <Testimonials/>
            <Container>
                <QBox/>
                <BlogSection data={Blog.posts}/>
                <ContactCTA/>
            </Container>


        </div>
    );
}

