import {
    ArrowDownIcon,
    BuildingInfoIcon,
    BuildingLockIcon, Calendar2Icon,
    CalendarIcon, InstagramIcon, LinkedInIcon, LocationIcon,
    MagicEditIcon, MailIcon,
    PhoneIcon, PlayCircleIcon,
    QuoteIcon, SendIcon
} from "@/Components/global/Icons";
import {Button} from "@/Components/Ui/button";
export default function Home() {
    return (
        <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <div className={'flex gap-4'}>
                <PhoneIcon className={'w-6 h-6 text-amber-500'}/>
                <CalendarIcon className={'w-6 h-6 text-amber-500'} />
                <BuildingInfoIcon className={'w-6 h-6 text-amber-500'}/>
                <MagicEditIcon className={'w-6 h-6 text-amber-500'}/>
                <BuildingLockIcon className={'w-6 h-6 text-amber-500'}/>
                <QuoteIcon className={'w-6 h-6 text-amber-500'}/>
                <Calendar2Icon className={'w-6 h-6 text-amber-500'}/>
                <ArrowDownIcon className={'w-6 h-6 text-amber-500'}/>
                <MailIcon className={'w-6 h-6 text-amber-500'}/>
                <LocationIcon className={'w-6 h-6 text-amber-500'}/>
                <SendIcon className={'w-6 h-6 text-amber-500'}/>
                <InstagramIcon className={'w-6 h-6 text-amber-500'}/>
                <LinkedInIcon className={'w-6 h-6 text-amber-500'}/>
                <PlayCircleIcon className={'w-6 h-6 text-amber-500'}/>
            </div>

            <div>
                <Button>ثبت نام</Button>
                <Button variant="outline">ورود</Button>
                <Button variant="link">فراموشی رمز عبور</Button>
            </div>
        </div>
    );
}
