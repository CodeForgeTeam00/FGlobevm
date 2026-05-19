import Image from "next/image";
import {TeamMember} from "@/types/wp-about";
import SectionIntro from "@/Components/global/SectionIntro";
import Text from "@/Components/global/text";
import dots from "@/public/assets/image/Dots.svg";
import React from "react";
import Container from "@/Components/global/Sections/Container";

const THEMES = {
    blue: {
        border: "border-primary-6",
        text: "text-primary-6",
        gradient: "bg-primary-6",
    },
    green: {
        border: "border-[#73D13D]",
        text: "text-[#a3e635]",
        gradient: "bg-[#73D13D]",
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

function TeamCard({name, role, image, imageAlt, themeColor}: TeamCardProps) {
    const theme = THEMES[themeColor];

    return (
        <div
            className={`bg-white rounded-[2rem] border-2 ${theme.border} p-1.5    transition-transform duration-300`}
        >
            <div className="relative  rounded-[1.5rem] overflow-hidden group ">
                <Image
                    src={image}
                    alt={imageAlt || `${name}, ${role} at GlobeVM`}
                    width={343}
                    height={429}
                    className=" w-full group-hover:scale-105 relative z-2 transition-transform duration-700"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} mix-blend-hard-light `}
                />

                <div className={'bg-[linear-gradient(180deg,rgba(0,0,0,0)_29.17%,rgba(0,0,0,0.68)_100%)] z-3 w-full top-0 h-full absolute'}/>
                <div
                    className="absolute bottom-0 left-0 w-full p-6 z-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Text variant={'heading-sm'} textColor={'white'}>
                        {name}
                    </Text>
                    <Text variant={'card-title-md'} className={theme.text}>
                        {role}
                    </Text>
                </div>
            </div>
        </div>
    );
}

interface TeamSectionProps {
    members: TeamMember[];
}

export default function TeamSection({members}: TeamSectionProps) {
    return (
        <section aria-label="Our Team" className=" max-w-[1920px] py-20 relative overflow-hidden">
            <div className="absolute hidden lg:block inset-0 pointer-events-none">
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -top-[25vw] -left-[45vw]
                        4xl:top-[-500px] 4xl:left-[-900px]
                        rounded-full
                        gradient-circle-light-gray
                       "
                />

                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -top-[25vw] -left-[43vw]
                         4xl:top-[-500px] 4xl:left-[-830px]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -bottom-[72vw] -right-[37vw] 4xl:bottom-[-1365px] 4xl:right-[-765px]
                        rotate-[-45deg]
                        rounded-full
                        gradient-circle-light-gray
                    "
                />
                <div
                    className="
                        absolute
                        w-[85vw] aspect-square
                        max-w-[1632]
                        -bottom-[69vw] -right-[36vw] 4xl:bottom-[-1274px] 4xl:right-[-700px]
                        rounded-full
                        border border-neutral-30
                    "
                />
                <Image src={dots} alt="dots"  className={'absolute right-[90] top-[155px]'}/>
            </div>
            <Container>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 lg:gap-8">
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
            </Container>
        </section>
    );
}