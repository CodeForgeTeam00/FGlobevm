// mappers/options.mapper.ts
import { HomeACF } from '@/types/wordperess';

export function mapGlobalOptions(data?: HomeACF) {
    if (!data) return {}; // return empty object if no data

    const acf = data;

    return {
        hero: {
            primaryImage: acf.hero_primary_image ?? null,
            secondaryImage: acf.hero_secondary_image ?? null,
            backgroundImage: acf.background_image ?? null,
        },

        sliderImage: acf.slider_section_image ?? null,

        comments: acf.comment_field?.map((item) => ({
            description: item.description ?? '',
            author: item.the_author ?? '',
            job: item.author_job ?? '',
            stars: Number(item.the_star ?? 0),
        })) ?? [],

        faq: acf.faq?.map((item) => ({
            question: item.question ?? '',
            answer: item.answer ?? '',
        })) ?? [],
    };
}