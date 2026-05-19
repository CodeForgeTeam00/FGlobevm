import {Rocket} from 'lucide-react';
import SectionIntro from "@/Components/global/SectionIntro";
import {WPImage} from "@/types/wp-common";
import Image from "next/image";
import Text from "@/Components/global/text";

interface ValueCardProps {
    title: string;
    description: string;
    icon: WPImage;
}

interface ValueCardState {
    data: ValueCardProps [];
}

function ValueCard({title, description, icon}: ValueCardProps) {
    return (
        <div
            className={'py-10 px-6 flex flex-col items-center border border-neutral-30 rounded-3xl hover:border-primary-6 '}
        >
            <div className="mb-6  ">
                <Image
                    src={icon.url}
                    alt={icon.alt || title}
                    width={80}
                    height={80}

                />
            </div>
            <Text variant={'card-title-lg'}>{title}</Text>
            <Text  textColor={'light'} align={'center'}  variant={'card-subtitle-lg'}>{description}</Text>
        </div>
    );
}


export default function ValuesSection({data}: ValueCardState) {
    return (
        <section className="lg:py-24 py-4 ">
            <div className="grid lg:grid-cols-12  gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5">
                    <SectionIntro
                        badge=" Our Values"
                        title="We Don't Say anything, We Just Do it"
                        description=" From infrastructure management and cloud environments to endpoint
                        protection and network security, our services are designed to keep your
                        systems running smoothly and your data protected. We provide proactive
                        monitoring, fast response, and long-term stability."
                    />
                </div>
                <div className="xl:col-span-6 lg:col-span-7 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {data.map((value, index) => (
                            <ValueCard
                                key={index}
                                title={value.title}
                                description={value.description}
                                icon={value.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
