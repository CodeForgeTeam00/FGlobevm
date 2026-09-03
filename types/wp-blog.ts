    import { WPImage } from "./wp-common";
    import {YoastSEO} from "@/types/yoast";
    import {SeoBox} from "@/types/wp-options";


export interface BlogAuthor {
    name: string;
    avatar: WPImage;
}

export interface BlogPost {
    id?: number;
    slug?: string;
    title: string;
    description: string;
    categoryName: string;
    categoryUrl: string;
    date: string;
    author: BlogAuthor;
    image: WPImage;
}

export interface BlogPagination {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface BlogSortBy {
    currentSort: string;
}

export interface BlogsResponse {
    posts: BlogPost[];
    pagination: BlogPagination;
    sortBy: BlogSortBy;
}

export interface BlogCategory {
    name: string;
    url: string;
    postCount: number;
    image: WPImage;
}
export interface BlogPage {
    popular_categories:BlogCategory[];
    editor_choice:BlogPost;
    image: WPImage;
    yoast_head_json:YoastSEO;
    seo_box: SeoBox
}



export type BlogComponent =
    | { type: "core/paragraph"; html: string }
    | { type: "core/heading"; html: string }
    | { type: "core/table"; html: string }
    | { type: "core/list"; html: string }
    | { type: "acf/selected-posts"; data: any[] }
    | { type: "acf/single-related-post"; data: any[] }
    | { type: "acf/related-posts"; data: { id: string; title: string; slug: string }[] }
    | { type: "acf/custom-quote"; data: { text: string } }
    | { type: "acf/custom-image"; data: { url: string; alt: string } }
    | { type: "acf/custom-video"; data: any }
    | { type: "acf/custom-faq"; data: { question: string; answer: string }[] };

export interface BlogVideoData {
    videoUrl: string;
    posterVideo: {
        url: string;
        alt: string;
    };
    description: string;
}

export interface BlogSinglePost extends BlogPost {
    components: BlogComponent[];
}