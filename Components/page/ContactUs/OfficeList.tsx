import { MapPin } from "lucide-react";

const OFFICES = [
    {
        name: "Woodland Hills",
        address: "20501 Ventura Blvd # 114 Woodland Hills, CA 91364",
    },
    {
        name: "Encino",
        address: "16661 Ventura Blvd, #224B, Encino, CA 91436",
    },
    {
        name: "Los Angeles",
        address: "10880 W Pico Blvd, Suite #300B Los Angeles, CA 90064",
    },
];

export function OfficeList() {
    return (
        <div className="space-y-8">
            {OFFICES.map((office) => (
                <div key={office.name} className="flex items-start space-x-4">
                    <div className="bg-[#f0f8ff] p-3 rounded-full text-[#209cee] shrink-0 mt-1">
                        <MapPin size={20} className="fill-[#209cee]/20" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                            {office.name}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {office.address}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}