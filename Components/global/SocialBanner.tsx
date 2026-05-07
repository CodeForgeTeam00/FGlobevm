import {LucideIcon} from "lucide-react";
import {SocialCard} from "@/Components/global/Cards/SocialsCard";

export interface SocialCardProps {
    name: string;
    prefix?: string;
    icon: LucideIcon;
}
interface SocialBannerProps {
    title?: string;
    subtitle?: string;
    socials: SocialCardProps[];
}


export default function SocialBanner({
                                         title = "Globe VM in Socials",
                                         subtitle = "Business owners trust",
                                         socials
                                     }: SocialBannerProps) {
    return (
        <section className="w-full ">
            <div className="bg-[#1CA0D8] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                <div className="flex-shrink-0 text-center md:text-left md:w-1/3">
                    <h2 className="text-white text-2xl md:text-3xl font-bold font-serif mb-2 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base font-medium">
                        {subtitle}
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {socials.map((social, index) => (
                        <div key={index} className="snap-start shrink-0">
                            <SocialCard
                                name={social.name}
                                icon={social.icon}
                                prefix={social.prefix}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
