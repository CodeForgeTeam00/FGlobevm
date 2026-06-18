import { getCategoryService } from "@/services/wp-services";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/global/Sections/Container";
import PrimarySection from "@/components/global/PrimarySection";
import PreviewBar from "@/components/global/PreviewBar";
import JsonLd from "@/components/global/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { SITE } from "@/lib/seo/site-config";
import Testimonials from "@/components/page/SrvicesPage/Testimonials";
import { FAQAccordion } from "@/components/global/FAQAccordion";
import { ContactCTA } from "@/components/page/Home/ContactCTA";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const data = await getCategoryService(category);
    if (!data) return { title: "Service Category Not Found" };

    const hero = data.acf.hero_section;
    return {
        title: hero.title || data.name || "Services",
        description: hero.description || "",
        alternates: { canonical: `${SITE.url}/services/${category}` },
    };
}

export default async function ServiceCategoryPage({ params }: Props) {
    const { category } = await params;
    const { isEnabled } = await draftMode();
    const data = await getCategoryService(category);
    if (!data) notFound();

    const { acf } = data;
    const hero = acf.hero_section;
    const features = acf.features_section;
    const services = acf.services_section;
    const proc = acf.process_section;
    const industries = acf.industry_section;
    const testimonials = acf.testemonial_section;
    const faqs = acf.faq_section;
    const pageTitle = hero.title || data.name || "Services";

    const schemas: object[] = [
        webPageSchema({
            title: pageTitle,
            url: `${SITE.url}/services/${category}/`,
            description: hero.description || "",
        }),
        breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Services", url: `${SITE.url}/services/` },
            { name: pageTitle, url: `${SITE.url}/services/${category}/` },
        ]),
    ];

    const renderGrid = (
        label: string,
        title: string,
        desc: string,
        items: { title: string; description: string }[]
    ) => (
        <Container>
            <div className="py-12">
                {label && <p className="uppercase text-sm">{label}</p>}
                {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
                {desc && <p className="opacity-80 mb-6">{desc}</p>}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((it, i) => (
                        <div key={i} className="rounded-lg border p-6">
                            <h3 className="font-semibold mb-2">{it.title}</h3>
                            <p className="text-sm opacity-80">{it.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );

    return (
        <>
            <JsonLd data={schemas} />
            <div className="relative">
                {isEnabled && <PreviewBar slug={category} type="services" />}

                {/* hero موقتِ ساده، عکس گارد‌شده */}
                <Container>
                    <div className="py-12 grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            {hero.label && <p className="uppercase text-sm mb-2">{hero.label}</p>}
                            <h1 className="text-3xl font-bold mb-4">{hero.title}</h1>
                            {hero.description && <p className="opacity-80">{hero.description}</p>}
                        </div>
                        {hero.image?.url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={hero.image.url}
                                alt={hero.image.alt || hero.title}
                                className="rounded-lg w-full h-auto"
                            />
                        )}
                    </div>
                </Container>

                {features.length > 0 && renderGrid("", "", "", features)}

                {/* بچه‌ها: جای AllServices، چون icon تو دیتای تست null ـه */}
                {services.items.length > 0 && (
                    <PrimarySection>
                        <Container>
                            <div className="py-12">
                                {services.label && <p className="uppercase text-sm">{services.label}</p>}
                                {services.title && <h2 className="text-2xl font-semibold mb-2">{services.title}</h2>}
                                {services.description && <p className="opacity-80 mb-6">{services.description}</p>}
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {services.items.map((s, i) => {
                                        const card = (
                                            <div className="rounded-lg border p-6 h-full">
                                                {s.icon?.url && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={s.icon.url} alt={s.icon.alt || s.title} className="mb-4 w-12 h-12" />
                                                )}
                                                <h3 className="font-semibold mb-2">{s.title}</h3>
                                                <p className="text-sm opacity-80">{s.description}</p>
                                            </div>
                                        );
                                        return s.slug ? (
                                            <Link key={i} href={`/services/${category}/${s.slug}`} className="block">
                                                {card}
                                            </Link>
                                        ) : (
                                            <div key={i}>{card}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Container>
                    </PrimarySection>
                )}

                {proc.items.length > 0 &&
                    renderGrid(proc.label, proc.title, proc.description, proc.items)}

                {industries.items.length > 0 &&
                    renderGrid(industries.label, industries.title, industries.description, industries.items)}

                {testimonials.testemonial.length > 0 && (
                    <div className="max-w-[1920px] mx-auto">
                        <Testimonials
                            label={testimonials.label}
                            title={testimonials.title}
                            description={testimonials.description}
                            comments={testimonials.testemonial.map((t) => ({
                                ...t,
                                avatar: null,
                                job: "",
                            }))}
                        />
                    </div>
                )}

                <Container>
                    {faqs.length > 0 && <FAQAccordion items={faqs} variant="dark" />}
                    <ContactCTA />
                </Container>
            </div>
        </>
    );
}