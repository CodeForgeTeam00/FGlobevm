import React from "react";
import {BusinessPartner} from "@/types/wp-options";
import Image from "next/image";
import Text from "@/components/global/text";

type TrustedByProps = {
    partners: BusinessPartner[];
};
export const TrustedBy: React.FC<TrustedByProps> = ({ partners }) => {
    return (
        <div className="w-full py-6 mb-6 lg:py-12 relative lg:mb-18">
            <Text  variant={'body-md'} textColor={"primary"} >
                Trusted by:
            </Text>
            <div className="flex flex-nowrap items-center overflow-x-auto  gap-20 mt-8  opacity-40">
                {partners.map((item, index) => (
                    <a key={index} target={'_blank'} rel={'nofollow'} href={item.url || ""}>
                        <Image
                            src={item.logo?.url || ""}
                            alt={item.logo?.alt || "logo"}
                            width={120}
                            height={60}
                            className={'min-w-[120px]'}

                        />
                    </a>
                ))}
            </div>
        </div>
    );
};