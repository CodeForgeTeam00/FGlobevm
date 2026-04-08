import { Network, Scale, Cloud } from 'lucide-react';

const features = [
    {
        icon: Network,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    },
    {
        icon: Scale,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    },
    {
        icon: Cloud,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    },
    {
        icon: Network,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    },
    {
        icon: Scale,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    },
    {
        icon: Cloud,
        title: '24/7 Availability',
        description: 'Bringing visuals to life through developing highly functional web solutions.'
    }
];

export default function Features() {
    return (
        <section className="py-20 px-6   bg-white font-sans">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-16">
                <div className="border border-sky-400 text-sky-500 rounded-full px-4 py-1 text-xs font-medium mb-8">
                    Why us
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 leading-tight">
                    Why Businesses Choose <br /> GlobeVM
                </h2>
                <p className="text-slate-500 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                    From infrastructure management and cloud environments to endpoint protection and network security,
                    our services are designed to keep your systems running smoothly and your data protected. We provide
                    proactive monitoring, fast response, and long-term stability.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-center gap-4 mb-4">
                            <feature.icon className="w-10 h-10 text-sky-500" strokeWidth={1.5} />
                            <h3 className="text-xl font-serif font-bold text-sky-500">{feature.title}</h3>
                        </div>
                        <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
