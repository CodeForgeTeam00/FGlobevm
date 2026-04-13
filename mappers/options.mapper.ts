import { GlobalOptions } from "@/types/wp-options";

export function mapGlobalOptions(data: GlobalOptions | null) {
    if (!data) return null;

    const acf = data.acf;

    return {
        hero: {
            primaryImage: acf.hero_section_images.hero_primary_image,
            secondaryImage: acf.hero_section_images.hero_secondary_image,
        },
        backgroundImage: acf.background_image,
        sliderImage: acf.slider_section_image,
        comments: acf.comment_field.map((item) => ({
            description: item.description,
            author: item.the_author,
            job: item.author_job,
            stars: Number(item.the_star),
        })),
        faq: acf.faq,
    };
}