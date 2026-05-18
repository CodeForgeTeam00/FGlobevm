import { Phone } from "lucide-react";
import EstimateForm from "./EstimateForm";
import Container from "@/Components/global/Sections/Container";
import SectionIntro from "@/Components/global/SectionIntro";
import React from "react";
import {Button} from "@/Components/Ui/button";
import Text from "@/Components/global/text";
import {PhoneIcon} from "@/Components/global/Icons";

interface Props {
    label: string;
    title: string;
    description: string;
}

export default function EstimateSection({ label, title, description }: Props) {
    return (
        <>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:pt-20">
                    <div className={'flex flex-col lg:gap-14 items-start'}>
                        <SectionIntro
                            badge={label}
                            title={title}
                            as={'h2'}
                            description={description}
                        />
                        <Button variant={'primary'} size={'lg'}>
                            <div className={'flex gap-2 items-center'}>
                                <PhoneIcon className="text-neutral-0 w-6 h-6" />
                                <Text textColor={'white'}>
                                    Call (310) 750-4939
                                </Text>
                            </div>
                        </Button>
                    </div>

                    <div className="w-full">
                        <EstimateForm />
                    </div>
                </div>
            </Container>
        </>
    );
}