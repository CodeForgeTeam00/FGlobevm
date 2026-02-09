import Logo from "@/Components/global/Logo";
import {useDictionary} from "@/lib/useDictionary";
import Link from "next/link";
import {Button} from "@/Components/Ui/button";
import {PhoneIcon} from "@/Components/global/Icons";

export default function Header() {
    const dict = useDictionary()
    return (
        <div className="Header flex py-8 w-full justify-between items-center">
            <div className='right-side flex items-center gap-10'>
                <div className="Header__logo">
                    <Logo/>
                </div>
                <nav className="navigation header__right-side flex gap-6">
                    {dict.layout.header.navbar.map((item) => (
                        <Link key={item.name} href={item.href}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className='header__left-side'>
                <Button variant="secondary" size="lg" >
                    <div className='flex gap-2 items-center text-white'>
                        <PhoneIcon className="w-6 h-6" />
                        {dict.layout.header.btn}
                    </div>
                </Button>
            </div>
        </div>
    );
}
