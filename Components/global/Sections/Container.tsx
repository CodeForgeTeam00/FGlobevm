interface PropsType {
    bg?: 'primary' | 'white' | 'lightGray';
    fullWidth?: boolean;
    bemClass?: string;
    children?: React.ReactNode;
}

const Container = ({
                      bg = 'white',
                      fullWidth = false,
                      bemClass = '',
                      children,
                  }: PropsType) => {

    const bgClasses = {
        primary: 'bg-gradient-to-r from-[#1485B9] to-[#0B5E83]',
        white: 'bg-neutral-0',
        lightGray: 'bg-gray-10',
    };

    return (
        <section
            className={`
                        ${bgClasses[bg]}
                        ${fullWidth ? 'w-full' : 'max-w-[1540] mx-auto'}
                        ${bemClass}
      `}
        >
            {children}
        </section>
    );
};

export default Container;