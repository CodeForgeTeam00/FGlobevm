import React from "react";
import Text from "@/Components/global/text";
import Image from "next/image";

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
        <div className={`flex h-full flex-col group ${className}`}>
            <div className="relative p-6 border flex flex-col gap-2 bg-white border-neutral-30 hover:border-primary-6 hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)] rounded-3xl">
                <div className="flex items-start   gap-4 min-h-16">
                    <Image width={48} height={48} src={icon} alt={title}/>
                    <Text textColor={'black'} align={'left'} variant={'card-title-lg'}>{title}</Text>
                </div>
                <Text textColor={"light"} align={'left'} variant={"card-subtitle-lg"} className={'lg:line-clamp-3 line-clamp-2 min-h-[48px] lg:min-h-[96px]'}>
                    {description}
                </Text>
            </div>
            <div className={`mx-6 h-2 rounded-b-2xl ${lineColor}`} />
        </div>
    );
};

export default FeatureLineCard;