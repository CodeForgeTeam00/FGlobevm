import Image from "next/image";
import logo from "@/public/assets/image/logo.png";

export default function Logo() {
    return (
        <div className="logo">
            <Image
                src={logo}
                alt="logoGlobVme"
                width={229}
                height={64}
                className="logo__image"
                priority
            />
        </div>
    );
}
