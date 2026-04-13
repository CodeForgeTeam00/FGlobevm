import Image from "next/image";

const TEAM_MEMBERS = [
    {
        name: "Behnam Jafari",
        role: "Design System Engineer",
        image: "https://picsum.photos/seed/behnam/600/800",
        themeColor: "blue" as const,
    },
    {
        name: "Sara Arjun",
        role: "Design System Engineer",
        image: "https://picsum.photos/seed/sara/600/800",
        themeColor: "green" as const,
    },
    {
        name: "Donya Reafaeel",
        role: "Design System Engineer",
        image: "https://picsum.photos/seed/donya/600/800",
        themeColor: "red" as const,
    },
    {
        name: "Abbass Fuad",
        role: "Design System Engineer",
        image: "https://picsum.photos/seed/abbass/600/800",
        themeColor: "orange" as const,
    },
];

const THEMES = {
    blue: {
        border: "border-[#0284c7]",
        text: "text-[#38bdf8]",
        gradient: "from-[#022c43] via-[#0284c7]/70 to-[#0284c7]/20",
    },
    green: {
        border: "border-[#4d7c0f]",
        text: "text-[#a3e635]",
        gradient: "from-[#1a3305] via-[#4d7c0f]/70 to-[#4d7c0f]/20",
    },
    red: {
        border: "border-[#be123c]",
        text: "text-[#fb7185]",
        gradient: "from-[#3f0614] via-[#be123c]/70 to-[#be123c]/20",
    },
    orange: {
        border: "border-[#c2410c]",
        text: "text-[#fb923c]",
        gradient: "from-[#421503] via-[#c2410c]/70 to-[#c2410c]/20",
    },
};

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    themeColor: keyof typeof THEMES;
}

function TeamCard({ name, role, image, themeColor }: TeamCardProps) {
    const theme = THEMES[themeColor];

    return (
        <div
            className={`bg-white rounded-[2rem] border-2 ${theme.border} p-1.5 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300`}
        >
            <div className="relative h-[380px] rounded-[1.5rem] overflow-hidden group bg-gray-900">
                <Image
                    src={image}
                    alt={`${name}, ${role} at GlobeVM`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} mix-blend-hard-light opacity-90`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-serif text-xl font-bold mb-1.5 tracking-wide">
                        {name}
                    </h4>
                    <p className={`text-sm font-semibold tracking-wide ${theme.text}`}>
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function TeamSection() {
    return (
        <section aria-label="Our Team" className="py-24 relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                <span className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-6 bg-white shadow-sm">
                    Our Team
                </span>

                <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-[1.2]">
                    Meet Our Team in{" "}
                    <span className="text-[#1da1f2]">GlobeVM</span>
                </h2>

                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    From infrastructure management and cloud environments to
                    endpoint protection and network security, our services are
                    designed to keep your systems running smoothly and your data
                    protected.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {TEAM_MEMBERS.map((member) => (
                    <TeamCard
                        key={member.name}
                        name={member.name}
                        role={member.role}
                        image={member.image}
                        themeColor={member.themeColor}
                    />
                ))}
            </div>
        </section>
    );
}