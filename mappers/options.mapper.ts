import { WPOptions } from '@/types/wordperess';

export function mapGlobalOptions(data?: WPOptions) {
    if (!data) return {};

    const acf = data.acf; // <--- حتماً اینجا acf رو جدا کنیم

    return {
        hero: {
            primaryImage: acf?.hero_section_images?.hero_primary_image ?? null,
            secondaryImage: acf?.hero_section_images?.hero_secondary_image ?? null,
            backgroundImage: acf?.background_image ?? null,
        },

        sliderImage: acf?.slider_section_image ?? null,

        comments:
            acf?.comment_field?.map((item) => ({
                description: item.description ?? '',
                author: item.the_author ?? '',
                job: item.author_job ?? '',
                stars: Number(item.the_star ?? 0),
            })) ?? [],

        faq:
            acf?.faq?.map((item) => ({
                question: item.question ?? '',
                answer: item.answer ?? '',
            })) ?? [],
    };
}