
const LOGOS = [
    { name: 'Goodwell', icon: 'G' },
    { name: 'Shutterframe', icon: 'S' },
    { name: 'FocalPoint', icon: 'F' },
    { name: 'Segment', icon: 'S' },
    { name: 'Screentime', icon: 'S' },
    { name: 'Shutterframe', icon: 'S' },
];

export const TrustedBy = () => {
    return (
        <div className="w-full py-6 relative">
            <div className=" ">
                <p className="text-sky-500 font-bold text-sm mb-8">Trusted by:</p>
                <div className="flex flex-nowrap items-center overflow-auto justify-between gap-8 opacity-40">
                    {LOGOS.map((logo, index) => (
                        <div key={index} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default group">
                            <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center font-bold text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-500 transition-colors">
                                {logo.icon}
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
