import React from "react";
import Text from "@/Components/global/text";

interface SectionIntroProps {
    badge?: string;
    title: string;
    description?: string;
    lgCenter?: boolean;
    isLight?: boolean;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
                                                       badge,
                                                       title,
                                                       lgCenter,
                                                       description,
                                                       isLight
                                                   }) => {
    return (
        <div className={`flex flex-col items-center ${!lgCenter ? "lg:items-start" : "lg:max-w-[900] mx-auto"}`}>
            {badge && (
                <div
                    className={` px-3 py-1 mb-3  rounded-[30px] border ${isLight ? 'border-neutral-0':' border-primary-6'}`}>
                    <Text as={'span'} textColor={isLight ? 'white' : 'primary'} variant={'label'} >
                        {badge}
                    </Text>
                </div>
            )}
            <Text
                as={'h3'}
                className={`text-center mb-2  ${!lgCenter ? "lg:text-start" : ""}`}
                variant={'heading-lg'} textColor={isLight ? 'white' :"black"}>
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
