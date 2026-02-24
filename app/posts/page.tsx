

type HeroButton = { text: string; link: string };
type HeroData = {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    buttons: HeroButton[];
};

// fetch داده از REST API وردپرس
async function getHero(): Promise<HeroData> {
    try {
        const res = await fetch("http://sitenmae.local/wp-json/custom/v1/hero", {
            next: { revalidate: 60 }, // ISR
        });
        if (!res.ok) throw new Error("Failed to fetch hero");
        return res.json();
    } catch (err) {
        console.warn("Hero API failed, using fallback");
        return {
            badge: "New",
            title: "Fallback Hero",
            highlight: "Best Services",
            description: "This is fallback data.",
            buttons: [
                { text: "Learn More", link: "/learn" },
                { text: "Contact", link: "/contact" },
            ],
        };
    }
}

// سکشن اول Homepage
export default async function HomePage() {
    const hero = await getHero();

    return (
        <div>
            <section className="p-8 bg-gray-100 text-gray-900">
                <span className="text-sm font-semibold uppercase text-purple-600">{hero.badge}</span>
                <h1 className="text-4xl font-bold mt-2">{hero.title}</h1>
                <strong className="text-2xl block mt-1">{hero.highlight}</strong>
                <p className="mt-4 text-lg">{hero.description}</p>
                <div className="mt-6 flex gap-4">
                    {hero.buttons.map((btn, i) => (
                        <a
                            key={i}
                            href={btn.link || undefined}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                        >
                            {btn.text}
                        </a>
                    ))}
                </div>
            </section>

            {/* سکشن‌های بعدی Home را اینجا اضافه کن */}
            <section className="p-8">
                <h2>Other sections here...</h2>
            </section>
        </div>
    );
}
