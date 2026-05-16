import Image from "next/image";
import { TeamMember } from "@/types/wp-about";
import SectionIntro from "@/Components/global/SectionIntro";

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

const THEME_ORDER: (keyof typeof THEMES)[] = ["blue", "green", "red", "orange"];

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    imageAlt: string;
    themeColor: keyof typeof THEMES;
}

function TeamCard({ name, role, image, imageAlt, themeColor }: TeamCardProps) {
    const theme = THEMES[themeColor];

    return (
        <div
            className={`bg-white rounded-[2rem] border-2 ${theme.border} p-1.5 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300`}
        >
            <div className="relative h-[380px] rounded-[1.5rem] overflow-hidden group bg-gray-900">
                <Image
                    src={image}
                    alt={imageAlt || `${name}, ${role} at GlobeVM`}
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

interface TeamSectionProps {
    members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
    return (
        <section aria-label="Our Team" className="py-24 relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                <SectionIntro
                    badge=" Our Team"
                    title="GlobeVMe"
                    lgCenter
                    description="              From infrastructure management and cloud environments to
                    endpoint protection and network security, our services are
                    designed to keep your systems running smoothly and your data
                    protected."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {members.map((member, index) => (
                    <TeamCard
                        key={member.team_member_name}
                        name={member.team_member_name}
                        role={member.team_members_job}
                        image={member.team_member_image.url}
                        imageAlt={member.team_member_image.alt}
                        themeColor={THEME_ORDER[index % THEME_ORDER.length]}
                    />
                ))}
            </div>
        </section>
    );
}