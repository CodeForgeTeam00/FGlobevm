"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const OFFICES = [

    {
        name: "Los Angeles",
        address: "20005 Gypsy lane woodland hills ca 91364",
    },
];

export function OfficesWithMap() {
    const [active, setActive] = useState(OFFICES[0]);

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(active.address)}&output=embed`;

    return (
        <>
            <div className="space-y-3 mb-6">
                {OFFICES.map((office) => {
                    const isActive = active.name === office.name;
                    return (
                        <button
                            key={office.name}
                            type="button"
                            onClick={() => setActive(office)}
                            className={`w-full flex items-start gap-4 p-3 cursor-pointer rounded-2xl text-left transition ${
                                isActive
                                    ? "bg-primary-6/5"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    isActive ? "bg-primary-6" : "bg-primary-6/10"
                                }`}
                            >
                                <MapPin
                                    size={18}
                                    className={isActive ? "text-white" : "text-primary-6"}
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">
                                    {office.name}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {office.address}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-100">
                <iframe
                    key={active.name}
                    src={mapUrl}
                    width="100%"
                    height="320"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${active.name} office`}
                />

                {/* Address overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-6/10 flex items-center justify-center flex-shrink-0">
                            <MapPin size={14} className="text-primary-6" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">
                                Address
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                                {active.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}