import Image from "next/image";
import { HeroContent } from "@/Components/page/Home/HeroSection/HeroContent";
import image from "@/public/assets/image/service-heroSection.png";
import Container from "@/Components/global/Sections/Container";
import {CartToolIcon, DashboardIcon, NetworkIcon} from "@/Components/global/Icons";



    export default function ServicesHeroSection() {
        return (
            <section className="relative mt-6 overflow-hidden ">

                <div className={'lg:flex w-full justify-between'}>

                        <Container>
                            <div className={'min-w-[470px]'}>
                                <HeroContent/>
                            </div>
                        </Container>

                    <Image className={'relative  object-cover w-full lg:max-w-[600px] xl:max-w-[808px] lg:h-[840px] lg:top-0'} alt={"skksj"} src={image}></Image>
                </div>
                <div className={'bg-neutral-10  w-full py-18  lg:pe-[120px] lg:ps-[190px] lg:absolute lg:translate-y-[-100%] max-w-[1454px]'}>
                        <div className=" grid md:grid-cols-3 gap-20">
                            <div className="flex flex-col gap-6">
                                <DashboardIcon className={'w-16 text-primary-6'}/>
                                <div>
                                    <h3 className="font-semibold mb-2">Key Features</h3>
                                    <p className="text-gray-500 text-sm">
                                        Make your website user friendly and look more professional
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <NetworkIcon className={'w-16 text-primary-6'}/>
                                <div>
                                    <h3 className="font-semibold mb-2">Key Features</h3>
                                    <p className="text-gray-500 text-sm">
                                        Make your website user friendly and look more professional
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <CartToolIcon className={'w-16 text-primary-6'}/>
                                <div>
                                    <h3 className="font-semibold mb-2">Key Features</h3>
                                    <p className="text-gray-500 text-sm">
                                        Make your website user friendly and look more professional
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>


            </section>
        );
    }