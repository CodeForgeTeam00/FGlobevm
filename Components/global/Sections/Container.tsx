interface PropsType {
    bg?: 'primary' | 'white' | 'lightGray' | 'transparent';
    fullWidth?: boolean;
    bemClass?: string;
    children?: React.ReactNode;
}

const Container = ({
                      bg = 'transparent',
                      fullWidth = false,
                      bemClass = '',
                      children,
                  }: PropsType) => {

    const bgClasses = {
        primary: 'bg-gradient-to-r from-[#1485B9] to-[#0B5E83]',
        white: 'bg-neutral-0',
        lightGray: 'bg-gray-10',
        transparent: 'bg-transparent',
    };
    return (
        <section
            className={`
                        relative
                        overflow-hidden
                        ${bgClasses[bg]}
                        ${fullWidth ? 'w-full' : 'max-w-[1540] mx-auto px-4 lg:px-0'}
                        ${bemClass}
      `}
        >
            {children}
        </section>
    );
};

export default Container;