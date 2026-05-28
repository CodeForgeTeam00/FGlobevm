import Container from "@/components/global/Sections/Container";
import Text from "@/components/global/text";

const STATS = [
    {value: "99.9%", label: "Uptime Guarantee", highlight: true},
    {value: "15 Min", label: "Response Time", highlight: false},
    {value: "24/7", label: "System Monitoring", highlight: false},
    {value: "500+", label: "Endpoints Protected", highlight: false},
];

export function StatsBar() {
    return (
        <div className=" w-full -translate-y-1/3 lg:-translate-y-1/2    z-20">
            <Container>
                <div className="flex  flex-row-reverse lg:flex-row ">
                    <div
                        className=" flex-grow bg-white grid rounded-2xl border overflow-hidden border-neutral-30
                        grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-neutral-30">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className=" p-4 sm:p-6 sm:p-8 text-center group flex flex-col justify-center"
                            >
                                <Text className={'group-hover:text-primary-6'} variant={'card-title-lg'}>
                                    {stat.value}
                                </Text>
                                <Text className={'group-hover:text-primary-6'} variant={'card-title-lg'}>
                                    {stat.label}
                                </Text>
                            </div>
                        ))}
                    </div>
                    <div className="bg-primary-6 text-neutral-0 rounded-2xl  p-8 lg:w-64 flex items-center justify-center text-center">
                        <Text variant={'card-title-lg'}>
                            Why Choose <br/> GlobeVM
                        </Text>
                    </div>
                </div>
            </Container>
        </div>
    );
}