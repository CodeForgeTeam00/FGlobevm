
import React from 'react';
import { Phone } from 'lucide-react';
import Text from "@/Components/global/text";
import {Button} from "@/Components/Ui/button";

export const ContactCTA: React.FC = () => {
    return (
        <section className="">
            <div className="bg-[#f8fafc] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 ">
                <div>
                    <Text variant={'heading-md'} as={'strong'} textColor={'black'}>
                        Find Out Where Your IT and Security Stand
                    </Text>
                    <Text variant={"body-lg"} textColor={'light'}>
                        Schedule a free IT assessment today.
                    </Text>
                </div>
                <a href="/tel:(310)750-4939">
                    <Button size={'lg'} variant={'primary'}>
                        <div className={'flex gap-2'}>
                            <Phone className="w-5 h-5 fill-white/20" />
                            <Text
                                variant={"body-md"}
                                as={"span"}
                                textColor={"white"}
                            >
                                Contact US
                            </Text>
                        </div>
                    </Button>
                </a>

            </div>
        </section>
    );
};


