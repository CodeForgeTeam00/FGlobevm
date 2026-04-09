import Logo from "@/Components/global/Logo";
import {useDictionary} from "@/lib/useDictionary";
import Link from "next/link";
import {Button} from "@/Components/Ui/button";
import {PhoneIcon} from "@/Components/global/Icons";
import MobileHeader from "@/Components/layout/MobileHeader"

export default function Header() {
    const dict = useDictionary()
    return (
        <header>
            <div className="desktop-header hidden px-4 2xl:px-0 lg:flex py-8 w-full justify-between items-center">
                <div className='header__right-side flex items-center 2xl:gap-10 gap-6'>
                    <div className="Header__logo">
                        <Logo className='2xl:text-[56px] text-[40px]'/>
                    </div>
                    <nav className="navigation header__right-side flex gap-4 2xl:gap-6">
                        {dict.layout.header.navbar.map((item) => (
                            <Link className={'2xl:text-lg text-sm'} key={item.name} href={item.href}>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='header__left-side'>
                    <Button variant={'primary'} size="lg">
                        <div className='flex gap-2 items-center text-white'>
                            <PhoneIcon className="2xl:w-6 w-5 h-5 2xl:h-6"/>
                            <span className={'2xl:text-base text-sm'}>{dict.layout.header.btn}</span>
                        </div>
                    </Button>
                </div>
            </div>
            <MobileHeader/>
        </header>

    );
}
