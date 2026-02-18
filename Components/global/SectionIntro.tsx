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
        <div className={`flex flex-col items-center ${!lgCenter ? "lg:items-start" : "lg:max-w-[900px] mx-auto"}`}>
            {badge && (
                <div
                    className=" px-3 py-1 mb-3  rounded-[30px] text-primary-6 border-[1.5px]  leading-5 text-footnote   ">
                    {badge}
                </div>
            )}
            <h3 className={`
                            font-h1
                             text-center 
                             lg:text-[40px] 
                             font-black 
                           text-neutral-black 
                             leading-10 
                             mb-2
                              ${!lgCenter ? "lg:text-start" : ""} `    }>
                {title}{" "}
                {highlight && <span className="text-primary-6">{highlight}</span>}
            </h3>
            {description && (
                <p className={`
                             text-neutral-100 
                              text-center 
                              leading-8 ${!lgCenter ? "lg:text-start" : ""} `}>
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionIntro;
