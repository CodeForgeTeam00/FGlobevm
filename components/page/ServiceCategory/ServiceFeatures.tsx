import Container from "@/components/global/Sections/Container";

interface Feature {
    title: string;
    description: string;
}

const FEATURES: Feature[] = [
    {
        title: "Fast Response",
        description: "Quick handling of urgent IT issues with defined SLAs.",
    },
    {
        title: "Proactive Monitoring",
        description: "Detect and fix issues before they impact operations.",
    },
    {
        title: "Expert Escalation",
        description: "Tiered support ensures the right specialist handles each issue.",
    },
    {
        title: "Secure Support",
        description: "IT processes designed with strict security standards.",
    },
];

export function ServiceFeatures() {
    return (
        <section className="w-full py-6 lg:py-12">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                    {FEATURES.map((feature, i) => (
                        <div
                            key={i}
                            className={`
                                lg:px-6 first:pl-0 last:pr-0
                                ${i !== 0 ? "lg:border-l lg:border-gray-200" : ""}
                            `}
                        >
                            <h3 className="text-gray-900 font-bold text-base mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}