type LogoProps = {
    children: React.ReactNode;
};
export default function SocialItem({ children}: LogoProps) {
    return (
        <div className="socialItem w-10 h-10 flex justify-center items-center group rounded-full p-2 bg-neutral-20 hover:bg-primary-1">
            {children}
        </div>
    );
}
