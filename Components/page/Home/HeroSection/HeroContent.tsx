import React from "react";
import SectionIntro from "@/Components/global/SectionIntro";
import { Button } from "@/Components/Ui/button";
import { CalendarIcon, PhoneIcon } from "@/Components/global/Icons";

export const HeroContent: React.FC = () => {
    return (
        <div className="hero__content 2xl:!max-w-[636] lg:max-w-[477]   w-full lg:pt-12 pt-5 flex flex-col gap-6">
            <SectionIntro
                badge="PROACTIVE IT"
                title="Proactive IT That Keeps Your Business"
                highlight="Secure"
                description="We manage, secure, and optimize your infrastructure so your team can focus on growth instead of downtime. From virtual environments to network protection, we keep your systems stable, fast, and protected."
            />

            <div className="hero__actions flex flex-col justify-center lg:justify-start sm:flex-row gap-2">
                <Button variant="primary" size="sm">
                    <CalendarIcon className="w-5 h-5" />
                    <p className="font-small">Book A Free Consulation</p>
                </Button>

                <Button variant="outline" size="sm">
                    <PhoneIcon className="w-5 h-5" />
                    <p className="font-small">Get A Free Penetration </p>
                </Button>
            </div>
        </div>
    );
};
