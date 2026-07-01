import React from "react";
import Link from "next/link";
import {ArrowRightIcon, BuildingLockIcon} from "@/components/global/Icons";
import {ServiceCategoryCard} from "@/types/wp-services";
import Text from "@/components/global/text";
interface ServicesCardProps {
    service: ServiceCategoryCard;
};

const ServicesCard: React.FC<ServicesCardProps> = ({service,}) => {
    return (
        <Link href={`services/${service.slug}/`}>
            <div className='group'>
                <div
                    className='p-6 border flex items-start flex-col lg:gap-4 gap-2
                                rounded-3xl transition-colors duration-300
                                group-hover:shadow-[0_0_2px_2px_rgba(25,154,213,0.25)] group-hover:border-primary-6'>
                    <div className='p-4 bg-neutral-30 rounded-full'>
                            <BuildingLockIcon className={'w-10 h-10 text-primary-6'}/>
                    </div>
                    <div>
                        <Text variant={'card-title-lg'} className={' line-clamp-2 min-h-[64px]'}>
                            {service.name}
                        </Text>
                        <Text variant={'card-subtitle-lg'} className={' lg:line-clamp-3 line-clamp-2 min-h-[48px] lg:min-h-[96px]'} textColor={'light'}>
                            {service.description}
                        </Text>
                    </div>
                    <div>
                        <button className="flex items-center gap-1">
                            <ArrowRightIcon className='w-4 h-4'/>
                            <Text variant={'body-md'} textColor={'primary'}>
                            Show More
                         </Text>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServicesCard;
