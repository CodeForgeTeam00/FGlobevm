import {SocialCard} from "@/components/global/Cards/SocialsCard";
import {WPImage} from "@/types/wp-common";

export interface SocialCardProps {
    youtube?: string,
    instagram?: string,
    facebook?: string,
    x?: string,
    linkedin?: string
}
interface SocialBannerProps {
    title?: string;
    subtitle?: string;
    socials: SocialCardProps;
    name: string;
    icon: WPImage;
}
export default function SocialBanner({
                                         title = "Globe VM in Socials",
                                         subtitle = "Business owners trust",
                                         socials,
                                         name,
                                         icon
                                     }: SocialBannerProps) {
    return (
        <section className="w-full ">
            <div className="bg-primary-6 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
                <div className="flex-shrink-0 text-center md:text-left md:w-1/3">
                    <h2 className="text-white text-2xl md:text-3xl font-bold font-serif mb-2 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base font-medium">
                        {subtitle}
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <SocialCard
                        link={socials.youtube ?? ""}
                        icon={icon}
                        name={name}
                    />
                </div>
            </div>
        </section>
    );
}
