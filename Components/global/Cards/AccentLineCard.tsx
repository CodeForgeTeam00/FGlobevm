import React from "react";

type FeatureLineCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
    lineColor?: string;
};

const FeatureLineCard: React.FC<FeatureLineCardProps> = ({
                                                             icon,
                                                             title,
                                                             description,
                                                             className = "",
                                                             lineColor = "bg-primary-6",
                                                         }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="relative p-6 border flex flex-col gap-2 bg-white border-neutral-30 rounded-3xl">
                <div className="flex items-center gap-4">
                    {icon}
                    <h3 className="font-bold text-lg lg:text-xl">{title}</h3>
                </div>
                <p className="text-start text-small lg:text-base leading-[28px] text-neutral-100">
                    {description}
                </p>
            </div>
            <div className={`mx-6 h-2 rounded-b-2xl ${lineColor}`} />
        </div>
    );
};

export default FeatureLineCard;