import Logo from "@/Components/global/Logo";
import {MenuIcon, SearchIcon} from "@/Components/global/Icons";
export default function Header() {
    return (
        <div className="
                    mobile-header
                    flex lg:hidden
                    py-1
                    px-4
                    h-12
                    w-full
                    justify-between
                    items-center
                    border-b
                    border-neutral-30
                    ">
                <div>
                    <MenuIcon className='w-5'/>
                </div>
                <div className="Header__logo">
                    <Logo className={'text-[40px] hidden sm:flex'} />
                    <Logo className={'text-[40px] flex sm:hidden'} iconOnly={true}/>
                </div>
                <div>
                    <SearchIcon className='w-6'/>
                </div>
        </div>
    );
}
