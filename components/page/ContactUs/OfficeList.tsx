import { MapPin } from "lucide-react";

const OFFICES = [
    {
        name: "Los Angeles",
        address: "20005 Gypsy lane woodland hills ca 91364",
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