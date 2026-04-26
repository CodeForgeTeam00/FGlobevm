export interface ServiceAreaPageData {
    id: number;
    title: string;
    slug: string;
    acf: {
        hero_section: {
            label: string;
            title: string;
            description: string;
        };
        second_section: {
            label: string;
            title: string;
            description: string;
            services: {
                icon: { url: string; alt: string } | null;
                title: string;
                description: string;
            }[];
        };
        offering_section: {
            label: string;
            title: string;
            description: string;
            offerings: {
                icon: { url: string; alt: string } | null;
                title: string;
                description: string;
            }[];
        };
        client_feedback: {
            label: string;
            title: string;
            description: string;
            comments: {
                avatar: { url: string; alt: string } | null;
                name: string;
                job: string;
                description: string;
            }[];
        };
        faq_box: {
            title: string;
            description: string;
            faq: {
                question: string;
                answer: string;
            }[];
        };
    };
}