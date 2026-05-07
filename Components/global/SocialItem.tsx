type LogoProps = {
    children: React.ReactNode;
};
export default function SocialItem({ children}: LogoProps) {
    return (
        <div className="socialItem w-10 h-10 flex justify-center items-center rounded-full p-2 bg-primary-1">
            {children}
        </div>
    );
}
