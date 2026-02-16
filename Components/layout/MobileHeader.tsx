import Logo from "@/Components/global/Logo";
import {MenuIcon, SearchIcon} from "@/Components/global/Icons";
export default function Header() {
    return (
        <div className="
                    mobile-header
                    flex
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
                    <Logo size={40} iconOnly={true}/>
                </div>
                <div>
                    <SearchIcon className='w-6'/>
                </div>
        </div>
    );
}
