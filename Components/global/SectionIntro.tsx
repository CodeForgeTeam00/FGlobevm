import React from "react";
import Text from "@/Components/global/text";

interface SectionIntroProps {
    badge?: string;
    title: string;
    description?: string;
    lgCenter?: boolean;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
                                                       badge,
                                                       title,
                                                       lgCenter,
                                                       description,
                                                   }) => {
    return (
        <div className={`flex flex-col items-center ${!lgCenter ? "lg:items-start" : "lg:max-w-[900] mx-auto"}`}>
            {badge && (
                <div
                    className=" px-3 py-1 mb-3  rounded-[30px] border border-primary-6">
                    <Text as={'span'} textColor={'primary'} variant={'label'} >
                        {badge}
                    </Text>
                </div>
            )}
            <Text
                as={'h3'}
                className={`text-center mb-2  ${!lgCenter ? "lg:text-start" : ""}`}
                variant={'heading-lg'}>
                {title}
            </Text>
            {description && (
                <Text textColor={'light'} className={`text-center ${!lgCenter ? "lg:text-start" : ""} `}>
                    {description}
                </Text>
            )}
        </div>
    );
};

export default SectionIntro;
