const STATS = [
    { value: "99.9%", label: "Uptime Guarantee", highlight: true },
    { value: "15 Min", label: "Response Time", highlight: false },
    { value: "24/7", label: "System Monitoring", highlight: false },
    { value: "500+", label: "Endpoints Protected", highlight: false },
];

export function StatsBar() {
    return (
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 px-4 sm:px-6 lg:px-8 z-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row shadow-2xl shadow-black/10 rounded-2xl overflow-hidden">
                    <div className="flex-grow bg-white grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="p-6 sm:p-8 text-center flex flex-col justify-center"
                            >
                                <div className={`text-3xl sm:text-4xl font-serif mb-1 ${stat.highlight ? "text-[#1da1f2]" : "text-gray-900"}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-xs sm:text-sm font-medium ${stat.highlight ? "text-[#1da1f2]" : "text-gray-500"}`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#1da1f2] text-white p-8 lg:w-64 flex items-center justify-center text-center">
                        <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                            Why Choose <br /> GlobeVM
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}