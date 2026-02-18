import React from 'react';
import SectionIntro from "@/Components/global/SectionIntro";
import {Button} from "@/Components/Ui/button";
import {CalendarIcon, HomeIcon, PhoneIcon} from "@/Components/global/Icons";
import Image from "next/image";

import heroSectionV from "@/public/assets/image/heroSectionV.jpg";
export const S: React.FC = () => {
    return (
        <section className="relative w-full px-4 flex items-center  overflow-hidden">
            <div className=" grid grid-cols-1 pt-4 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <SectionIntro
                        badge="PROACTIVE IT"
                        title={`Proactive IT That Keeps Your Business`}
                        highlight="Secure"
                        description="We manage, secure, and optimize your infrastructure so your team can focus on growth instead of downtime. From virtual environments to network protection, we keep your systems stable, fast, and protected."
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant='primary' size='sm'>
                            <CalendarIcon className="w-5 h-5" />
                            <p className='text-small'>Book A Free Consulation</p>
                        </Button>
                        <Button variant='outline' size='sm'>
                            <PhoneIcon className="w-5 h-5" />
                            <p className='text-small'>Get A Free Penetration Test</p>
                        </Button>
                    </div>
                </div>
                <div className="lg:col-span-7 grid md:grid-cols-2 gap-6 relative">
                    <div className="flex flex-col gap-6 ">
                        <div className="bg-neutral-10 rounded-3xl relative p-8">
                            <div className="w-10 h-10 bg-black rounded-full absolute top-[-20px] flex items-center justify-center ">
                                <HomeIcon className={'h-5 w-5'} />
                            </div>
                            <div className='mb-6'>
                                <span className="text-caption text-neutral-100">25%</span>
                                <h3 className="text-small  text-neutral-black leading-[2] mt-3 tracking-tight">
                                    Stay informed with the latest tips, trends, and best practices in IT, virtualization
                                </h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-footnote text-neutral-100">
                                    <span>+ 23 Performance</span>
                                </div>
                                <div className="w-full h-[6px] bg-[#f1f5f9] rounded-full">
                                    <div className="bg-[#4f46e5] h-full w-[65%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-neutral-black text-neutral-30 py-3 px-4 rounded-2xl  gap-4 flex items-center">
                            <div className="w-16 h-16 rounded-full text-neutral-0 bg-primary-6 flex items-center justify-center text-caption">
                                99
                            </div>
                            <div className="flex flex-col text-caption ">
                                <span className="text-neutral-0">Title</span>
                                <span className="text-neutral-30">Description</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex  lg:flex-col gap-4">
                        <div className="w-full overflow-hidden ">
                            <Image src={heroSectionV} className={'rounded-xl'} alt={'heroSection'}/>
                        </div>
                        <div className="relative w-full  h-[180px] bg-amber-100 ">
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
