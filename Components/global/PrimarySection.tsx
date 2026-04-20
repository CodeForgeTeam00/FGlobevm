import Container from "@/Components/global/Sections/Container";
import Image from "next/image";
import mask from "@/public/assets/image/PrimaryPattern.svg";

export default function PrimarySection({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full gradient-primary py-6 lg:py-[128px] overflow-hidden">
            <Image
                className="absolute hidden top-0 w-full h-full lg:inline "
                src={mask}
                alt="layout"
            />
            <Container >
                {children}
            </Container>
        </div>
    );
}