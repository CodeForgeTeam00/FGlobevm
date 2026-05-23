import {fetchWP} from "@/lib/api";
import {ServiceAreaPageData} from "@/types/wp-service-area";

export interface ServiceAreaLanding {
    slug: string;
    landing_service_area: {
        region: string;
        title: string;
        service_number: string;
    } | null;
}

interface card{

        icon: { url: string; alt: string };
        title: string;
        description: string;

}
export interface services_options {
        description: string,
        title: string,
        label: string,
        cards: card[]
};
export interface ServiceAreaLandingPage {
    services_options :services_options
    faq_box: {
        title: string;
        description: string;
        faq_questions: {
            question: string;
            answer: string;
        }[];
    };
    services_tag: string;
    service_title: string;
    service_description: string;
    image: { url: string | false; alt: string } | null;
    yoast_head_json?: any;
}

export async function getServiceAreaPage(slug: string) {
    return fetchWP<ServiceAreaPageData[]>(
        `/gvm/v1/service_area_page/${slug}`,
        {strategy: {type: "isr", revalidate: 86400}, tag: "services"}
    );
}

export async function getServiceAreaLanding() {
    return fetchWP<ServiceAreaLanding[]>(
        "/gvm/v1/service_area_page?landing_service_area",
        {strategy: {type: "isr", revalidate: 86400}, tag: "services"}
    );
}

export async function getServiceAreaLandingPage() {
    return fetchWP<ServiceAreaLandingPage>(
        "/gvm/v1/pages/1974/acf-data",
        {strategy: {type: "isr", revalidate: 86400}, tag: "services"}
    );
}