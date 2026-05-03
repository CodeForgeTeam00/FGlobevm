import Container from "@/Components/global/Sections/Container";

interface Offering {
    icon: { url: string; alt: string } | null;
    title: string;
    description: string;
}

interface Props {
    label: string;
    title: string;
    description: string;
    offerings: Offering[];
}


function FeatureCard({ title, description, icon }: Offering) {

    return (
        <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 h-full flex flex-col">
            <div className="mb-6">
                <img src={icon?.url} alt={icon?.alt}/>
            </div>
            <h4 className="text-[#1da1f2] font-bold text-lg mb-3 leading-tight">{title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

export default function WhyUsSection({ label, title, description, offerings }: Props) {
    return (
        <section className="py-12">
            <div className="bg-gradient-to-br from-[#1681b3] to-[#0d597f] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-blue-900/10">
                <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    <path d="M-100,-100 C200,100 300,400 200,600" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M-50,-100 C250,100 350,400 250,600" fill="none" stroke="white" strokeWidth="1" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-[40rem] h-[40rem] opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>

                <div className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-16">
                        <div>
                            <div className="inline-flex items-center border border-white/30 text-white rounded-full px-4 py-1.5 text-xs font-medium mb-6 backdrop-blur-sm">
                                {label}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-[1.2]">
                                {title}
                            </h2>
                        </div>
                        <div className="lg:pt-14">
                            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
                                {description}
                            </p>
                        </div>
                    </div>
                    <Container>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {offerings.map((item, index) => (
                                <FeatureCard key={index} title={item.title} description={item.description}  icon={item.icon} />
                            ))}
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
}