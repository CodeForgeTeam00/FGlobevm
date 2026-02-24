import React from "react";
import Link from "next/link";
import {ArrowRightIcon, BuildingLockIcon} from "@/Components/global/Icons";

interface dataType {
    href: string;
    title: string;
    description: string;
}

interface ServicesCardProps {
    data: dataType;
};

const ServicesCard: React.FC<ServicesCardProps> = ({data,}) => {
    return (
        <div className='group'>
            <div
                className='p-6 border flex flex-col gap-4 items-start bg-neutral-0 border-neutral-30
                rounded-3xl transition-colors duration-300
                group-hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)] group-hover:border-primary-6'>
                <div className='p-4 bg-neutral-10 rounded-full'>
                    <BuildingLockIcon className={'w-10 h-10 text-primary-6'}/>
                </div>
                <div>
                    <h3 className="font-bold text-lg lg:text-xl">
                        {data.title}
                    </h3>
                    <p className="text-start text-small lg:text-base leading-[28px] text-neutral-100">
                        {data.description}
                    </p>
                </div>
                <div>
                    <Link href={data.href} className='flex items-center gap-1'>
                        <span className='text-primary-6'>
                            Show More
                         </span>
                        <ArrowRightIcon className='w-4 h-4'/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCard;
