import React from "react";

interface SectionIntroProps {
    badge?: string;
    title: string;
    highlight?: string;
    description?: string;
    lgCenter?: boolean;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
                                                       badge,
                                                       title,
                                                       lgCenter,
                                                       highlight,
                                                       description,
                                                   }) => {
    return (
        <div className={`flex flex-col items-center ${!lgCenter ? "lg:items-start" : "lg:max-w-[900] mx-auto"}`}>
            {badge && (
                <div
                    className=" px-3 py-1 mb-3  rounded-[30px] border-primary-6 text-primary-6 border-[1.5px]  leading-5 font-caption   ">
                    {badge}
                </div>
            )}
            <h3 className={`
                            lg:font-heading lg:text-4xl lg:font-bold lg:leading-relaxed
                             font-heading text-2xl font-bold leading-10
                             text-center 
                             lg:text-[40px] 
                              text-neutral-black 
                             mb-2
                              ${!lgCenter ? "lg:text-start" : ""} `    }>
                {title}{" "}
                {highlight && <span className="text-primary-6">{highlight}</span>}
            </h3>
            {description && (
                <p className={`
                             text-neutral-100 
                              text-base
                              lg:text-lg lg:font-medium leading-8
                              text-center 
                               ${!lgCenter ? "lg:text-start" : ""} `}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionIntro;
