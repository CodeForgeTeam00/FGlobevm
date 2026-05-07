import { GlobalOptions } from "@/types/wp-options";

export function mapGlobalOptions(data: GlobalOptions | null) {
    if (!data) return null;

    return {
        hero: {
            primaryImage: data.hero_section_images.hero_primary_image,
            secondaryImage: data.hero_section_images.hero_secondary_image,
        },
        backgroundImage: data.background_image,
        sliderImage: data.slider_section_image,
        comments: data.comment_field.map((item) => ({
            description: item.description,
            author: item.the_author,
            job: item.author_job,
            stars: Number(item.the_star),
        })),
        faq: data.faq,
    };
}