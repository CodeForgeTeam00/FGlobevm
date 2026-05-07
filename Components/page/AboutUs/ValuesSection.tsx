import { Rocket } from 'lucide-react';

interface ValueCardProps {
    title: string;
    description: string;
    isActive?: boolean;
}

 function ValueCard({ title, description, isActive = false }: ValueCardProps) {
    return (
        <div
            className={`rounded-[1.5rem] p-8 sm:p-10 text-center transition-all duration-300 h-full flex flex-col items-center justify-center ${
                isActive
                    ? 'bg-[#1da1f2] text-white shadow-xl shadow-[#1da1f2]/20 scale-[1.02] sm:scale-105 z-10 relative'
                    : 'bg-white text-gray-900 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            }`}
        >
            <div className="mb-6">
                <Rocket
                    size={48}
                    strokeWidth={1.5}
                    className={isActive ? 'text-white' : 'text-[#1da1f2]'}
                />
            </div>

            <h4 className={`font-serif text-xl font-bold mb-4 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {title}
            </h4>

            <p className={`text-sm leading-relaxed ${isActive ? 'text-white/90' : 'text-gray-400'}`}>
                {description}
            </p>
        </div>
    );
}


const values = [
    {
        id: 1,
        title: "Title name",
        description: "From infrastructure management and cloud environments to endpoint protection and network security",
        isActive: true
    },
    {
        id: 2,
        title: "Title name",
        description: "From infrastructure management and cloud environments to endpoint protection and network security",
        isActive: false
    },
    {
        id: 3,
        title: "Title name",
        description: "From infrastructure management and cloud environments to endpoint protection and network security",
        isActive: false
    },
    {
        id: 4,
        title: "Title name",
        description: "From infrastructure management and cloud environments to endpoint protection and network security",
        isActive: false
    }
];

export default function ValuesSection() {
    return (
        <section className="py-24 ">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Content */}
                <div className="lg:col-span-5">
                    <div className="inline-flex items-center border border-[#1da1f2]/30 text-[#1da1f2] rounded-full px-5 py-1.5 text-xs font-semibold tracking-wide mb-8 bg-white shadow-sm">
                        Our Values
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-serif text-gray-900 mb-6 leading-[1.2]">
                        We Don't Say anything, We Just Do it
                    </h2>

                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        From infrastructure management and cloud environments to endpoint
                        protection and network security, our services are designed to keep your
                        systems running smoothly and your data protected. We provide proactive
                        monitoring, fast response, and long-term stability.
                    </p>
                </div>

                {/* Right Content - Cards Grid */}
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {values.map((value) => (
                            <ValueCard
                                key={value.id}
                                title={value.title}
                                description={value.description}
                                isActive={value.isActive}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
