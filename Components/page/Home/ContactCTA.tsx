
import React from 'react';
import { Phone } from 'lucide-react';
import Text from "@/Components/global/text";
import {Button} from "@/Components/Ui/button";

export const ContactCTA: React.FC = () => {
    return (
        <section className="">
            <div className="bg-[#f8fafc] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 ">
                <div>
                    <Text variant={'heading-md'} textColor={'black'}>
                        Need help? Talk to our expert.
                    </Text>
                    <Text variant={"body-lg"} textColor={'light'}>
                        Talk to our experts or Browse through more properties.
                    </Text>
                </div>
                <Button size={'lg'} variant={'primary'}>
                    <div className={'flex gap-2'}>
                        <Phone className="w-5 h-5 fill-white/20" />
                        Contact US
                    </div>
                </Button>
            </div>
        </section>
    );
};


